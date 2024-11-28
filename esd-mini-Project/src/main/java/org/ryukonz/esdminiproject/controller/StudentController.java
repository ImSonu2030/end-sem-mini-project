package org.ryukonz.esdminiproject.controller;

import jakarta.validation.Valid;
import org.ryukonz.esdminiproject.dto.StudentDetailResponseDto;
import org.ryukonz.esdminiproject.dto.StudentReqDto;
import org.ryukonz.esdminiproject.dto.StudentResponseDto;
import org.ryukonz.esdminiproject.model.Students;
import org.ryukonz.esdminiproject.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/students")
    public ResponseEntity<List<StudentResponseDto>> getAllStudents() {
        List<StudentResponseDto> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }
    @GetMapping("/student/{rollNumber}")
    public ResponseEntity<StudentDetailResponseDto> getStudentDetail(@PathVariable String rollNumber) {
        try {
            StudentDetailResponseDto studentDetail = studentService.getStudentDetails(rollNumber);
            return ResponseEntity.ok(studentDetail);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Students> registerStudent(
            @RequestPart("student") @Valid StudentReqDto studentRequestDTO,
            @RequestPart("image") MultipartFile imageFile) throws IOException {
        System.out.println(studentRequestDTO);
        System.out.println(imageFile);
        Students student = studentService.saveStudent(studentRequestDTO, imageFile);
        return ResponseEntity.ok(student);
    }
}
