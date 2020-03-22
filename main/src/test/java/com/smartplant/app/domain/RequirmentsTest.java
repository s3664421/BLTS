package com.smartplant.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.smartplant.app.web.rest.TestUtil;

public class RequirmentsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Requirments.class);
        Requirments requirments1 = new Requirments();
        requirments1.setId(1L);
        Requirments requirments2 = new Requirments();
        requirments2.setId(requirments1.getId());
        assertThat(requirments1).isEqualTo(requirments2);
        requirments2.setId(2L);
        assertThat(requirments1).isNotEqualTo(requirments2);
        requirments1.setId(null);
        assertThat(requirments1).isNotEqualTo(requirments2);
    }
}
