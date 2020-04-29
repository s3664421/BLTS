package com.smartplant.app.repository;

import com.smartplant.app.domain.Customer;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query
    Customer findByUserId(Long id);
}
