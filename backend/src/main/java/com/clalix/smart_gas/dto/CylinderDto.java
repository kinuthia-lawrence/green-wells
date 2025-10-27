package com.clalix.smart_gas.dto;

import lombok.Data;

@Data
public class CylinderDto {
    private Long id;
    private String serialNumber;
    private Double capacity;
    private String status;
    private Long ownerId;
}

