// src/main/java/com/example/adminmanagement/controller/UserController.java

package com.example.adminmanagement.controller;

import com.example.adminmanagement.entity.User;
import com.example.adminmanagement.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // DTO cho đổi mật khẩu
    public static class ChangePasswordRequest {
        private String oldPassword;
        private String newPassword;

        public ChangePasswordRequest() {}

        public String getOldPassword() {
            return oldPassword;
        }

        public void setOldPassword(String oldPassword) {
            this.oldPassword = oldPassword;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }

    // DTO cho thêm hoặc cập nhật user
    public static class UserRequest {
        private String username;
        private String password;

        public UserRequest() {}

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

    // Lấy tất cả người dùng
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userRepository.findAll());
    }

    // Đổi mật khẩu cho người dùng đang đăng nhập
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, 
                                            @AuthenticationPrincipal UserDetails userDetails){
        Optional<User> optionalUser = userRepository.findByUsername(userDetails.getUsername());
        if(optionalUser.isEmpty()){
            return ResponseEntity.badRequest().body("User not found");
        }
        User user = optionalUser.get();

        if(!passwordEncoder.matches(request.getOldPassword(), user.getPassword())){
            return ResponseEntity.badRequest().body("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("Password changed successfully");
    }

    // Thêm người dùng mới
    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody UserRequest request){
        Optional<User> existingUser = userRepository.findByUsername(request.getUsername());
        if(existingUser.isPresent()){
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus("ACTIVE");
        userRepository.save(user);
        return ResponseEntity.ok("User added successfully");
    }

    // Xóa người dùng
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isEmpty()){
            return ResponseEntity.badRequest().body("User not found");
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
