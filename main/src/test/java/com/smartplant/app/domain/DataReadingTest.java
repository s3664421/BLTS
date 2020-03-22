package com.smartplant.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.smartplant.app.web.rest.TestUtil;

public class DataReadingTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataReading.class);
        DataReading dataReading1 = new DataReading();
        dataReading1.setId(1L);
        DataReading dataReading2 = new DataReading();
        dataReading2.setId(dataReading1.getId());
        assertThat(dataReading1).isEqualTo(dataReading2);
        dataReading2.setId(2L);
        assertThat(dataReading1).isNotEqualTo(dataReading2);
        dataReading1.setId(null);
        assertThat(dataReading1).isNotEqualTo(dataReading2);
    }
}
