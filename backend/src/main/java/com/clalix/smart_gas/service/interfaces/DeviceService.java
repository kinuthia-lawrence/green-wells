package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.entities.Device;

public interface DeviceService {
    Device findById(Long id);

    Device findByDeviceId(String deviceId);
}
