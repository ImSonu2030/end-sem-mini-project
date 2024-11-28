package org.ryukonz.esdminiproject.service;

import org.ryukonz.esdminiproject.config.JwtUtil;
import org.ryukonz.esdminiproject.dto.LoginRequestDto;
import org.ryukonz.esdminiproject.dto.LoginResponseDto;
import org.ryukonz.esdminiproject.dto.SignUpReqDto;
import org.ryukonz.esdminiproject.dto.SignUpResponseDto;
import org.ryukonz.esdminiproject.model.Users;
import org.ryukonz.esdminiproject.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    @Autowired
    private UserRepo usersRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private JwtUtil jwtUtil;

    public SignUpResponseDto registerUser(SignUpReqDto dto) {
        if (usersRepo.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use: " + dto.getEmail());
        }
        if (usersRepo.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already in use: " + dto.getUsername());
        }

        String encryptedPassword = passwordEncoder.encode(dto.getPassword());

        Users user = new Users();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(encryptedPassword);
        user.setRole("USER");

        Users savedUser = usersRepo.save(user);

        return new SignUpResponseDto(savedUser.getUsername(), savedUser.getEmail(), savedUser.getRole());
    }


    public LoginResponseDto login(LoginRequestDto dto) {
        Users user = usersRepo.findByUsername(dto.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return new LoginResponseDto(token, user.getUsername(), user.getEmail());
    }
}
