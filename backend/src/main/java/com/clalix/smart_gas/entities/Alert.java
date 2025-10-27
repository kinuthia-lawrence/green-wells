package com.clalix.smart_gas.entities;

import com.clalix.smart_gas.enums.AlertSeverity;
import com.clalix.smart_gas.enums.AlertType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private AlertType type;
    private AlertSeverity severity;
    private boolean isActive;
    private LocalDateTime timestamp;
    private LocalDateTime resolvedAt;
    @Column(name = "user_id", insertable = false, updatable = false)
    private Long userId;
    @Column(name="device_id")
    private String deviceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cylinder_id")
    private Cylinder cylinder;
}