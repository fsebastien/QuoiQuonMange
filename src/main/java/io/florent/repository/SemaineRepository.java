package io.florent.repository;

import io.florent.domain.Semaine;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Semaine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SemaineRepository extends JpaRepository<Semaine, Long> {

}
