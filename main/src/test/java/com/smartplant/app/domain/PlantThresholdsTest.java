package com.smartplant.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.smartplant.app.web.rest.TestUtil;

public class PlantThresholdsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlantThresholds.class);
        PlantThresholds plantThresholds1 = new PlantThresholds();
        plantThresholds1.setId(1L);
        PlantThresholds plantThresholds2 = new PlantThresholds();
        plantThresholds2.setId(plantThresholds1.getId());
        assertThat(plantThresholds1).isEqualTo(plantThresholds2);
        plantThresholds2.setId(2L);
        assertThat(plantThresholds1).isNotEqualTo(plantThresholds2);
        plantThresholds1.setId(null);
        assertThat(plantThresholds1).isNotEqualTo(plantThresholds2);
    }
}
