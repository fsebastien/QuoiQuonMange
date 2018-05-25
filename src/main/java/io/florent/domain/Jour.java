package io.florent.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Jour.
 */
@Entity
@Table(name = "jour")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Jour implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Recette petitDejeuner;

    @ManyToOne
    private Recette recetteEntreeMidi;

    @ManyToOne
    private Recette recettePlatMidi;

    @ManyToOne
    private Recette recetteEntreeSoir;

    @ManyToOne
    private Recette recettePlatSoir;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Recette getPetitDejeuner() {
        return petitDejeuner;
    }

    public Jour petitDejeuner(Recette recette) {
        this.petitDejeuner = recette;
        return this;
    }

    public void setPetitDejeuner(Recette recette) {
        this.petitDejeuner = recette;
    }

    public Recette getRecetteEntreeMidi() {
        return recetteEntreeMidi;
    }

    public Jour recetteEntreeMidi(Recette recette) {
        this.recetteEntreeMidi = recette;
        return this;
    }

    public void setRecetteEntreeMidi(Recette recette) {
        this.recetteEntreeMidi = recette;
    }

    public Recette getRecettePlatMidi() {
        return recettePlatMidi;
    }

    public Jour recettePlatMidi(Recette recette) {
        this.recettePlatMidi = recette;
        return this;
    }

    public void setRecettePlatMidi(Recette recette) {
        this.recettePlatMidi = recette;
    }

    public Recette getRecetteEntreeSoir() {
        return recetteEntreeSoir;
    }

    public Jour recetteEntreeSoir(Recette recette) {
        this.recetteEntreeSoir = recette;
        return this;
    }

    public void setRecetteEntreeSoir(Recette recette) {
        this.recetteEntreeSoir = recette;
    }

    public Recette getRecettePlatSoir() {
        return recettePlatSoir;
    }

    public Jour recettePlatSoir(Recette recette) {
        this.recettePlatSoir = recette;
        return this;
    }

    public void setRecettePlatSoir(Recette recette) {
        this.recettePlatSoir = recette;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Jour jour = (Jour) o;
        if (jour.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jour.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Jour{" +
            "id=" + getId() +
            "}";
    }
}
