package com.smartplant.app.repository;

import com.smartplant.app.domain.Sensor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Sensor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SensorRepository extends JpaRepository<Sensor, Long> {

    @Query("select sensor from Sensor sensor where sensor.user.login = ?#{principal.username}")
    List<Sensor> findByUserIsCurrentUser();
}
