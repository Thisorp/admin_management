// src/main/java/com/example/adminmanagement/repository/UserLogRepository.java

package com.example.adminmanagement.repository;

import com.example.adminmanagement.entity.UserLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserLogRepository extends JpaRepository<UserLog, Long> {
    List<UserLog> findByUsername(String username);
}
