package com.clalix.smart_gas.dto;

import com.clalix.smart_gas.enums.CylinderStatus;
import lombok.Data;

@Data
public class CylinderDto {
    private Long id;
    private String serialNumber;
    private Double capacity;
    private CylinderStatus status;
    private Long ownerId;
}

