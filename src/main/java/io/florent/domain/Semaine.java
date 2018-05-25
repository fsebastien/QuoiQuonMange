package io.florent.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Semaine.
 */
@Entity
@Table(name = "semaine")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Semaine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Jour lundi;

    @OneToOne
    @JoinColumn(unique = true)
    private Jour mardi;

    @OneToOne
    @JoinColumn(unique = true)
    private Jour mercredi;

    @OneToOne
    @JoinColumn(unique = true)
    private Jour jeudi;

    @OneToOne
    @JoinColumn(unique = true)
    private Jour vendredi;

    @OneToOne
    @JoinColumn(unique = true)
    private Jour samedi;

    @OneToOne
    @JoinColumn(unique = true)
    private Jour dimanche;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Jour getLundi() {
        return lundi;
    }

    public Semaine lundi(Jour jour) {
        this.lundi = jour;
        return this;
    }

    public void setLundi(Jour jour) {
        this.lundi = jour;
    }

    public Jour getMardi() {
        return mardi;
    }

    public Semaine mardi(Jour jour) {
        this.mardi = jour;
        return this;
    }

    public void setMardi(Jour jour) {
        this.mardi = jour;
    }

    public Jour getMercredi() {
        return mercredi;
    }

    public Semaine mercredi(Jour jour) {
        this.mercredi = jour;
        return this;
    }

    public void setMercredi(Jour jour) {
        this.mercredi = jour;
    }

    public Jour getJeudi() {
        return jeudi;
    }

    public Semaine jeudi(Jour jour) {
        this.jeudi = jour;
        return this;
    }

    public void setJeudi(Jour jour) {
        this.jeudi = jour;
    }

    public Jour getVendredi() {
        return vendredi;
    }

    public Semaine vendredi(Jour jour) {
        this.vendredi = jour;
        return this;
    }

    public void setVendredi(Jour jour) {
        this.vendredi = jour;
    }

    public Jour getSamedi() {
        return samedi;
    }

    public Semaine samedi(Jour jour) {
        this.samedi = jour;
        return this;
    }

    public void setSamedi(Jour jour) {
        this.samedi = jour;
    }

    public Jour getDimanche() {
        return dimanche;
    }

    public Semaine dimanche(Jour jour) {
        this.dimanche = jour;
        return this;
    }

    public void setDimanche(Jour jour) {
        this.dimanche = jour;
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
        Semaine semaine = (Semaine) o;
        if (semaine.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), semaine.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Semaine{" +
            "id=" + getId() +
            "}";
    }
}
