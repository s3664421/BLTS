package com.smartplant.app.repository;

import com.smartplant.app.domain.Requirments;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Requirments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequirmentsRepository extends JpaRepository<Requirments, Long> {
}
