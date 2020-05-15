#include <Wire.h>
#include <Adafruit_ADS1015.h>

#include <Adafruit_Sensor.h>

#include <DHT.h>
#include <DHT_U.h>
#include <math.h>
#include <ESP8266HTTPClient.h>

#include <FS.h> //this needs to be first, or it all crashes and burns...
#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>          // https://github.com/tzapu/WiFiManager
#include <ArduinoJson.h>          // https://github.com/bblanchon/ArduinoJson

#define SERVER_IP "http://35.244.105.79:8080/api/data-readings"
#define ENDPOINT_TEST "http://en5w25n1fhvcv.x.pipedream.net/"
#define DHTPIN 2
#define DHTTYPE    DHT11

String header;
WiFiClient client;

DHT dht(DHTPIN, DHTTYPE);
Adafruit_ADS1115 ads(0x49);

//This variable holds the sensor ID
char output[20] = "xxxxx";

float tempReading = 23.4;
float lightReading = 0.0;
float humidtyReading = 23.2;
float moistureReading = 0.0;

//flag for saving data
bool shouldSaveConfig = false;

//callback notifying us of the need to save config
void saveConfigCallback () {
  Serial.println("Should save config");
  shouldSaveConfig = true;
}

void setup() {
  Serial.begin(115200);
  if (SPIFFS.begin()) {
    if (SPIFFS.exists("/config.json")) {
      File configFile = SPIFFS.open("/config.json", "r");
      if (configFile) {
        Serial.println("opened config file");
        size_t size = configFile.size();
        std::unique_ptr<char[]> buf(new char[size]);
        configFile.readBytes(buf.get(), size);
        DynamicJsonBuffer jsonBuffer;
        JsonObject& json = jsonBuffer.parseObject(buf.get());
        json.printTo(Serial);
        if (json.success()) {
          Serial.println("\nparsed json");
          strcpy(output, json["output"]);
        } else {
          Serial.println("failed to load json config");
        }
      }
    }
  } else {
    Serial.println("Failed to load sensorID stored data");
  }
  //end read

  
  WiFiManagerParameter custom_output("SmartPlant Username", "SmartPlant Username", output, 20);
  WiFiManagerParameter custom_text("<p>Enter your SmartPlant username you would like to register this sensor to</p>");

  WiFiManager wifiManager;
  wifiManager.addParameter(&custom_text);

  wifiManager.setSaveConfigCallback(saveConfigCallback);
  wifiManager.addParameter(&custom_output);
  wifiManager.autoConnect("SmartPlantConnect");
  
  Serial.println("Succesfully Connected.");
  
  strcpy(output, custom_output.getValue());

  if (shouldSaveConfig) {
    Serial.println("saving config");
    DynamicJsonBuffer jsonBuffer;
    JsonObject& json = jsonBuffer.createObject();
    json["output"] = output;
    File configFile = SPIFFS.open("/config.json", "w");
    if (!configFile) {
      Serial.println("failed to open config file for writing");
    }

    json.printTo(Serial);
    json.printTo(configFile);
    configFile.close();
  }

  dht.begin();
  ads.begin();

}

void readTempHumidty()
{
  float tempGet = dht.readTemperature();
  float humidityGet = dht.readHumidity();

  if(isnan(tempGet)){
    Serial.println("Failed to read Tempreature");
  }else{
    tempReading = tempGet;
  }

  if(isnan(humidityGet)){
    Serial.println("Failed to read Humidity");
  }else
  {
    humidtyReading = humidityGet;
  }
}

void readMoisture()
{
  int16_t adc0;  // we read from the ADC, we have a sixteen bit integer as a result

  adc0 = ads.readADC_SingleEnded(0);
  moistureReading = map(adc0, 17480, 5700, 0, 100);

 Serial.print("ADC0: "); 
  Serial.println(adc0);
  
  Serial.print("Moisture reading: "); 
  Serial.println(moistureReading);
}

void readLux()
{
  
  int16_t rawData = ads.readADC_SingleEnded(1);

  float resistorVoltage = (float)rawData / 32786.0 * 3.30;

  float ldrVoltage = 3.3 - resistorVoltage;

  float ldrResistance = ldrVoltage/resistorVoltage * 6800;  // REF_RESISTANCE is 5 kohm

  float ldrLux = 32518931 * pow(ldrResistance, -1.205);
  lightReading = ldrLux;

  Serial.print("LUX LEVEL: ");
  Serial.print(ldrLux);
}

void loop(){

  
  delay (60 * 60 * 1000);
  readTempHumidty();
  readMoisture();
  readLux();
  Serial.print("Trying to send data");
  HTTPClient htclient;
  if(WiFi.isConnected())
  {
   
    WiFiClient client;

    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    if (int beginResult = http.begin(client, ENDPOINT_TEST)) {  // HTTP


      Serial.print("[HTTP] POST...\n");

      StaticJsonBuffer<300> JSONbuffer;   //Declaring static JSON buffer
      JsonObject& JSONencoder = JSONbuffer.createObject();

      JSONencoder["sensorID"] = output;
      JSONencoder["temp"] = tempReading;
      JSONencoder["humidity"] = humidtyReading;
      JSONencoder["light"] = lightReading;
      JSONencoder["moisture"] = moistureReading;  
     
      char JSONmessageBuffer[300];
      JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));

 
       http.addHeader("Content-Type", "application/json");  //Specify content-type header
       int httpCode = http.POST(JSONmessageBuffer);   //Send the request
       String response = http.getString();
  
      Serial.print("beginResult: ");
      Serial.print(beginResult);
      Serial.println();
      
      Serial.print("http: ");
      Serial.print(httpCode);
      Serial.println();
      
      Serial.print("response: ");
      Serial.println(response);
      Serial.println();
      

      http.end();
      
    } else {
      Serial.printf("[HTTP} Unable to connect\n");
    }
  
  }else
  {
   Serial.println("didn't work");
  }

}
