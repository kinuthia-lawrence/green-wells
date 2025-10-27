package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.dto.CylinderDto;
import java.util.List;

public interface CylinderService {
    CylinderDto create(CylinderDto cylinderDto);
    CylinderDto getById(Long id);
    List<CylinderDto> getAll();
    CylinderDto update(Long id, CylinderDto cylinderDto);
    void delete(Long id);
}

