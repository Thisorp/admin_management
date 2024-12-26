// src/main/java/com/example/adminmanagement/controller/StatusController.java

package com.example.adminmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/api/status")
    public String checkDatabaseConnection() {
        try {
            // Thực hiện một truy vấn đơn giản để kiểm tra kết nối
            jdbcTemplate.execute("SELECT 1");
            return "Connected to the database successfully!";
        } catch (Exception e) {
            return "Failed to connect to the database: " + e.getMessage();
        }
    }
}
