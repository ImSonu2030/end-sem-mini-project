package org.ryukonz.esdminiproject.repo;

import org.ryukonz.esdminiproject.model.Domains;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DomainsRepo extends JpaRepository<Domains, Integer> {

    @Query("SELECT d FROM Domains d WHERE d.program = :program AND d.batch = :batch")
    Optional<Domains> findByProgramAndBatch(@Param("program") String program, @Param("batch") String batch);
}
