package com.clalix.smart_gas.controller;

import com.clalix.smart_gas.responses.ApiResponse;
import com.clalix.smart_gas.dto.SensorReadingDto;
import com.clalix.smart_gas.service.interfaces.SensorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sensor")
@Tag(name = "Sensor", description = "Sensor API's")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @GetMapping("/latest")
    public ResponseEntity<ApiResponse<SensorReadingDto>> getLatestReading(@RequestParam String deviceId) {
        SensorReadingDto reading = sensorService.getLatestReading(deviceId);
        return ResponseEntity.ok(ApiResponse.success("Latest reading retrieved", reading));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<SensorReadingDto>>> getReadingHistory(@RequestParam String deviceId) {
        List<SensorReadingDto> history = sensorService.getReadingHistory(deviceId);
        return ResponseEntity.ok(ApiResponse.success("Reading history retrieved", history));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<SensorReadingDto>>> getAllReadings() {
        List<SensorReadingDto> readings = sensorService.getAllReadings();
        return ResponseEntity.ok(ApiResponse.success("All readings retrieved", readings));
    }
}