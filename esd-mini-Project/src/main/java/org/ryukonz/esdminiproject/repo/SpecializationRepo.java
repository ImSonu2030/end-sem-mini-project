package org.ryukonz.esdminiproject.repo;

import org.ryukonz.esdminiproject.model.Specializations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecializationRepo extends JpaRepository<Specializations,Integer> {
}
