package com.clalix.smart_gas.dto;

import lombok.Data;

@Data
public class LocationDto {
    private Long id;
    private double latitude;
    private double longitude;
    private String address;
}

