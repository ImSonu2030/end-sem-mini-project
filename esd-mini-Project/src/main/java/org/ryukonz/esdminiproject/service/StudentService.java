package org.ryukonz.esdminiproject.service;

import jakarta.transaction.Transactional;
import org.ryukonz.esdminiproject.dto.StudentDetailResponseDto;
import org.ryukonz.esdminiproject.dto.StudentReqDto;
import org.ryukonz.esdminiproject.dto.StudentResponseDto;
import org.ryukonz.esdminiproject.model.Domains;
import org.ryukonz.esdminiproject.model.Specializations;
import org.ryukonz.esdminiproject.model.Students;
import org.ryukonz.esdminiproject.repo.DomainsRepo;
import org.ryukonz.esdminiproject.repo.SpecializationRepo;
import org.ryukonz.esdminiproject.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepository;

    @Autowired
    private DomainsRepo domainRepository;

    @Autowired
    private SpecializationRepo specializationRepository;


    public List<StudentResponseDto> getAllStudents() {
        return studentRepository.findAllStudentDetails();
    }

    public StudentDetailResponseDto getStudentDetails(String rollNumber) {
        Students student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found with roll number: " + rollNumber));

        Domains domain = student.getDomain();
        Specializations specialization = student.getSpecialization();

        return new StudentDetailResponseDto(
                student.getFirstName(),
                student.getLastName(),
                student.getRollNumber(),
                student.getEmail(),
                student.getCgpa(),
                student.getImageName(),
                student.getImageType(),
                student.getImageData(),
                student.getTotalCredits(),
                student.getGraduationYear(),
                domain != null ? domain.getProgram() : "",
                domain != null ? domain.getBatch() : "",
                domain != null ? domain.getQualification() : "",
                domain != null ? domain.getCapacity() : 0,
                specialization != null ? specialization.getSpecialization_code() : "",
                specialization != null ? specialization.getSpecialization_name() : "",
                specialization != null ? specialization.getSpecialization_description() : "",
                specialization != null ? specialization.getSpecialization_year() : 0,
                specialization != null ? specialization.getCredit_required() : 0
        );
    }

    @Transactional
    public Students saveStudent(StudentReqDto dto, MultipartFile imageFile) throws IOException {
        Domains domain = domainRepository.findByProgramAndBatch(dto.getDomainName(), dto.getGraduationYear())
                .orElseThrow(() -> new RuntimeException("Invalid Domain Name or Year: "
                        + dto.getDomainName() + ", " + dto.getGraduationYear()));

        Specializations specialization = specializationRepository.findById(dto.getSpecializationId())
                .orElseThrow(() -> new RuntimeException("Invalid Specialization ID: " + dto.getSpecializationId()));

        String programCode = getProgramCode(domain.getProgram());
        long uniqueId = System.currentTimeMillis();
        String rollNumber = programCode + dto.getGraduationYear() + String.format("%04d", uniqueId % 10000);

        if (studentRepository.findByRollNumber(rollNumber).isPresent()) {
            throw new RuntimeException("Duplicate roll number: " + rollNumber);
        }

        Students student = new Students();
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setCgpa(dto.getCgpa());
        student.setTotalCredits(dto.getTotalCredits());
        student.setGraduationYear(dto.getGraduationYear());
        student.setDomain(domain);
        student.setSpecialization(specialization);
        student.setRollNumber(rollNumber);

        student.setImageName(imageFile.getOriginalFilename());
        student.setImageType(imageFile.getContentType());
        student.setImageData(imageFile.getBytes());

        return studentRepository.save(student);
    }

    private String getProgramCode(String program) {
        if (program.contains("IMTech")) {
            return "IMT";
        } else if (program.contains("MTech")) {
            return "MT";
        } else if (program.contains("BT")) {
            return "BT";
        } else {
            throw new RuntimeException("Unknown program: " + program);
        }
    }
}
