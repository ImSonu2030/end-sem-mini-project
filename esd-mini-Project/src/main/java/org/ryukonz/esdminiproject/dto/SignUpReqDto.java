package org.ryukonz.esdminiproject.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SignUpReqDto {
    @NotNull
    private String username;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String password;
}
