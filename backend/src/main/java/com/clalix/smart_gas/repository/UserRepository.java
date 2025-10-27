package com.clalix.smart_gas.repository;

import com.clalix.smart_gas.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select u from User u where u.username = :identifier or u.email = :identifier")
    Optional<User> findByUsernameOrEmail(@Param("identifier") String identifier);
}

