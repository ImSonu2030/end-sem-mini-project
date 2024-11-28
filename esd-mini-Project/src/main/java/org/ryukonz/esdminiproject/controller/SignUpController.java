package org.ryukonz.esdminiproject.controller;

import jakarta.validation.Valid;
import org.ryukonz.esdminiproject.dto.SignUpReqDto;
import org.ryukonz.esdminiproject.dto.SignUpResponseDto;
import org.ryukonz.esdminiproject.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SignUpController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponseDto> signup(@RequestBody @Valid SignUpReqDto dto) {
        SignUpResponseDto response = usersService.registerUser(dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
