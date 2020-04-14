package com.smartplant.app.repository;

import com.smartplant.app.domain.DataReading;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DataReading entity.
 */
@SuppressWarnings("unused")
@Repository

public interface DataReadingRepository extends JpaRepository<DataReading, Long> {

	@Query(value="SELECT * FROM data_reading dr WHERE dr.plant_id = ?1 ORDER BY dr.time ASC", nativeQuery=true)
    Optional<List<DataReading>> findAllByPlantID(Long PlantID);
}
