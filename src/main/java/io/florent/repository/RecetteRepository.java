package io.florent.repository;

import io.florent.domain.Recette;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Recette entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecetteRepository extends JpaRepository<Recette, Long> {

}
