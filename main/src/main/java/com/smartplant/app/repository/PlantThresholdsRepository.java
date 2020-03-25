package com.smartplant.app.repository;

import com.smartplant.app.domain.PlantThresholds;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PlantThresholds entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlantThresholdsRepository extends JpaRepository<PlantThresholds, Long> {
}
