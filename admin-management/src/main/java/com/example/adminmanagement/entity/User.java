// src/main/java/com/example/adminmanagement/entity/User.java

package com.example.adminmanagement.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 10)
    private String status; // ACTIVE hoặc INACTIVE

    @Column(name = "time_reg", nullable = false, updatable = false)
    private Timestamp timeReg;

    // Constructors
    public User() {}

    public User(String username, String password, String status, Timestamp timeReg) {
        this.username = username;
        this.password = password;
        this.status = status;
        this.timeReg = timeReg;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    // Không có setter cho id vì nó được sinh tự động

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getTimeReg() {
        return timeReg;
    }

    public void setTimeReg(Timestamp timeReg) {
        this.timeReg = timeReg;
    }
}
