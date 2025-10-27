package com.clalix.smart_gas.service.interfaces;


import com.clalix.smart_gas.dto.SensorReadingDto;

import java.util.List;

public interface SensorService {
    SensorReadingDto getLatestReading(String deviceId);

    List<SensorReadingDto> getReadingHistory(String deviceId);

    List<SensorReadingDto> getAllReadings();

}
