package com.clalix.smart_gas.repository;

import com.clalix.smart_gas.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}

