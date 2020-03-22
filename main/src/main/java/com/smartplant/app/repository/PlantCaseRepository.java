package com.smartplant.app.repository;

import com.smartplant.app.domain.PlantCase;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PlantCase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlantCaseRepository extends JpaRepository<PlantCase, Long> {
}
