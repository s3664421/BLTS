package com.smartplant.app.repository;

import com.smartplant.app.domain.PlantCase;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the PlantCase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlantCaseRepository extends JpaRepository<PlantCase, Long> {

    @Query("select plantCase from PlantCase plantCase where plantCase.user.login = ?#{principal.username}")
    List<PlantCase> findByUserIsCurrentUser();
}