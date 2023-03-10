package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.TintaPortada;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TintaPortada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TintaPortadaRepository extends JpaRepository<TintaPortada, Long>, JpaSpecificationExecutor<TintaPortada> {

}
