package com.smartplant.app.repository;

import com.smartplant.app.domain.DataReading;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DataReading entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DataReadingRepository extends JpaRepository<DataReading, Long> {
}
