package com.clalix.smart_gas.entities;

import com.clalix.smart_gas.enums.CylinderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cylinders")
public class Cylinder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String serialNumber;
    private Double capacity;
    private  String deviceId;
    private CylinderStatus status;
    @ManyToOne
    private User owner;
}

