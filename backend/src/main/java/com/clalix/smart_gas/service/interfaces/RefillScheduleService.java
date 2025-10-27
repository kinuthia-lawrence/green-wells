package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.dto.RefillScheduleDto;
import java.util.List;

public interface RefillScheduleService {
    RefillScheduleDto create(RefillScheduleDto refillScheduleDto);
    RefillScheduleDto getById(Long id);
    List<RefillScheduleDto> getAll();
    RefillScheduleDto update(Long id, RefillScheduleDto refillScheduleDto);
    void delete(Long id);
}

