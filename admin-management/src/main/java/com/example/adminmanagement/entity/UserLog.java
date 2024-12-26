// src/main/java/com/example/adminmanagement/entity/UserLog.java

package com.example.adminmanagement.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "user_logs")
public class UserLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String username;

    @Column(name = "time_login", nullable = false)
    private Timestamp timeLogin;

    @Column(name = "time_logout")
    private Timestamp timeLogout;

    // Constructors
    public UserLog() {}

    public UserLog(String username, Timestamp timeLogin, Timestamp timeLogout) {
        this.username = username;
        this.timeLogin = timeLogin;
        this.timeLogout = timeLogout;
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

    public Timestamp getTimeLogin() {
        return timeLogin;
    }

    public void setTimeLogin(Timestamp timeLogin) {
        this.timeLogin = timeLogin;
    }

    public Timestamp getTimeLogout() {
        return timeLogout;
    }

    public void setTimeLogout(Timestamp timeLogout) {
        this.timeLogout = timeLogout;
    }
}
