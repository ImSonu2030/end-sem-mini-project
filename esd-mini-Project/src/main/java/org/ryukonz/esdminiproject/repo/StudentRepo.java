package org.ryukonz.esdminiproject.repo;

import org.ryukonz.esdminiproject.dto.StudentResponseDto;
import org.ryukonz.esdminiproject.model.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepo extends JpaRepository<Students, Integer> {

    @Query("SELECT COUNT(s) FROM Students s WHERE s.domain.program = :program AND s.graduationYear = :year")
    long countByDomainAndGraduationYear(@Param("program") String program, @Param("year") String graduationYear);


    @Query("SELECT new org.ryukonz.esdminiproject.dto.StudentResponseDto(s.firstName, s.lastName, s.rollNumber, s.imageName, s.imageType, s.imageData, s.graduationYear, d.program) " +
            "FROM Students s JOIN s.domain d")
    List<StudentResponseDto> findAllStudentDetails();
    Optional<Students> findByRollNumber(String rollNumber);
}
