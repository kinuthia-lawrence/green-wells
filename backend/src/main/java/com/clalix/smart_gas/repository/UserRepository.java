package com.clalix.smart_gas.repository;

import com.clalix.smart_gas.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

