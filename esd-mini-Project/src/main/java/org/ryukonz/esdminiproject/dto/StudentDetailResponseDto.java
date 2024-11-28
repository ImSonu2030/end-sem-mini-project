package org.ryukonz.esdminiproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentDetailResponseDto {
    private String firstName;
    private String lastName;
    private String rollNumber;
    private String email;
    private double cgpa;
    private String imageName;
    private String imageType;
    private byte[] imageData;
    private int totalCredits;
    private String graduationYear;

    private String domainProgram;
    private String domainBatch;
    private String domainQualification;
    private int domainCapacity;

    private String specializationCode;
    private String specializationName;
    private String specializationDescription;
    private int specializationYear;
    private int specializationCreditRequired;
}
