package com.smartplant.app.repository;

import com.smartplant.app.domain.Plant;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Plant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {

	Optional<Plant> findBySensorId(String sensorID);
}
