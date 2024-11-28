package org.ryukonz.esdminiproject.controller;

import jakarta.validation.Valid;
import org.ryukonz.esdminiproject.dto.LoginRequestDto;
import org.ryukonz.esdminiproject.dto.LoginResponseDto;
import org.ryukonz.esdminiproject.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto dto) {
        System.out.println(dto);
        LoginResponseDto response = usersService.login(dto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

