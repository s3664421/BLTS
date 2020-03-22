package com.smartplant.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.smartplant.app.web.rest.TestUtil;

public class PlantCaseTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlantCase.class);
        PlantCase plantCase1 = new PlantCase();
        plantCase1.setId(1L);
        PlantCase plantCase2 = new PlantCase();
        plantCase2.setId(plantCase1.getId());
        assertThat(plantCase1).isEqualTo(plantCase2);
        plantCase2.setId(2L);
        assertThat(plantCase1).isNotEqualTo(plantCase2);
        plantCase1.setId(null);
        assertThat(plantCase1).isNotEqualTo(plantCase2);
    }
}
