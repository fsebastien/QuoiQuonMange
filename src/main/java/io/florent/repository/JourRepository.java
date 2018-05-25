package io.florent.repository;

import io.florent.domain.Jour;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Jour entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JourRepository extends JpaRepository<Jour, Long> {

}
