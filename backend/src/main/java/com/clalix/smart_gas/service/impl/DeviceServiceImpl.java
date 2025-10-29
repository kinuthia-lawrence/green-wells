package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.entities.Device;
import com.clalix.smart_gas.repository.DeviceRepository;
import com.clalix.smart_gas.service.interfaces.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceServiceImpl implements DeviceService {
    @Autowired
    private DeviceRepository deviceRepository;

    @Override
    public Device findById(Long id) {
        return deviceRepository.findById(id).orElse(null);
    }

    @Override
    public Device findByDeviceId(String deviceId) {
        return deviceRepository.findByDeviceId(deviceId).orElse(null);
    }

    @Override
    public List<Device> findAll() {
        return deviceRepository.findAll();
    }
}
