// src/main/java/com/example/adminmanagement/controller/AuthController.java

package com.example.adminmanagement.controller;

import com.example.adminmanagement.entity.User;
import com.example.adminmanagement.repository.UserRepository;
import com.example.adminmanagement.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // DTO cho login
    public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest() {}

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    // DTO cho phản hồi
    public static class LoginResponse {
        private String token;

        public LoginResponse(String token){
            this.token = token;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        try{
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            String token = jwtUtil.generateToken(request.getUsername());
            return ResponseEntity.ok(new LoginResponse(token));
        } catch(BadCredentialsException e){
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    // Endpoint để đăng ký user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request){
        Optional<User> existingUser = userRepository.findByUsername(request.getUsername());
        if(existingUser.isPresent()){
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus("ACTIVE");
        user.setTimeReg(new Timestamp(System.currentTimeMillis()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
}
