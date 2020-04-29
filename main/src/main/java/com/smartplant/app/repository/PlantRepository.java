package com.smartplant.app.repository;

import com.smartplant.app.domain.Plant;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Plant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {

	Optional<Plant> findBySensorID(String sensorID);
	@Query(value="SELECT * FROM plant p WHERE p.customer_id = ?1", nativeQuery=true)
	Optional<List<Plant>> findByCustomerID(Long customerID);
}
