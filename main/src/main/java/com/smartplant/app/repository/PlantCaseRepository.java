package com.smartplant.app.repository;

import com.smartplant.app.domain.PlantCase;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import com.smartplant.app.domain.enumeration.AttentionItem;
import com.smartplant.app.domain.enumeration.CaseStatus;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the PlantCase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlantCaseRepository extends JpaRepository<PlantCase, Long> {

    List<PlantCase> findByUserIdIsNull();
    List<PlantCase> findByStatus(CaseStatus status);
    @Query("select plantCase from PlantCase plantCase where plantCase.user.login = ?#{principal.username}")
    List<PlantCase> findByUserIsCurrentUser();
    List<PlantCase> findByUserIdAndStatus(Long id, CaseStatus status);
    
    @Query("SELECT pc FROM PlantCase pc WHERE pc.status = ?1 AND pc.plant.id = ?2 AND pc.needsAttention = ?3")
    Optional<List<PlantCase>> findByStatusAndPlantAndNeedsAttention(CaseStatus status, Long plantID, AttentionItem needsAttention);

}
