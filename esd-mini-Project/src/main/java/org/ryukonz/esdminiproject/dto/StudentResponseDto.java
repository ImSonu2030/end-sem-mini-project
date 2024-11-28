package org.ryukonz.esdminiproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponseDto {
    private String firstName;
    private String lastName;
    private String rollNumber;
    private String imageName;
    private String imageType;
    private byte[] imageData;
    private String graduationYear;
    private String domainName;
}

