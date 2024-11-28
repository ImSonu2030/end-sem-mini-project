package org.ryukonz.esdminiproject.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StudentReqDto {
    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @Email
    @NotNull
    private String email;

    private double cgpa;

    private int totalCredits;

    private String graduationYear;

    @NotNull
    private String domainName;

    @NotNull
    private int specializationId;
}
