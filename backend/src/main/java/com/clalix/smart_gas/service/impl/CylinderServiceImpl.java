package com.clalix.smart_gas.service.impl;

import com.clalix.smart_gas.dto.CylinderDto;
import com.clalix.smart_gas.entities.Cylinder;
import com.clalix.smart_gas.entities.User;
import com.clalix.smart_gas.repository.CylinderRepository;
import com.clalix.smart_gas.repository.UserRepository;
import com.clalix.smart_gas.service.interfaces.CylinderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CylinderServiceImpl implements CylinderService {
    @Autowired
    private CylinderRepository cylinderRepository;
    @Autowired
    private UserRepository userRepository;

    private CylinderDto toDto(Cylinder cylinder) {
        CylinderDto dto = new CylinderDto();
        dto.setId(cylinder.getId());
        dto.setSerialNumber(cylinder.getSerialNumber());
        dto.setCapacity(cylinder.getCapacity());
        dto.setStatus(cylinder.getStatus());
        if (cylinder.getOwner() != null) dto.setOwnerId(cylinder.getOwner().getId());
        return dto;
    }

    private Cylinder toEntity(CylinderDto dto) {
        Cylinder cylinder = new Cylinder();
        cylinder.setId(dto.getId());
        cylinder.setSerialNumber(dto.getSerialNumber());
        cylinder.setCapacity(dto.getCapacity());
        cylinder.setStatus(dto.getStatus());
        if (dto.getOwnerId() != null) {
            Optional<User> user = userRepository.findById(dto.getOwnerId());
            user.ifPresent(cylinder::setOwner);
        }
        return cylinder;
    }

    @Override
    public CylinderDto create(CylinderDto cylinderDto) {
        Cylinder cylinder = toEntity(cylinderDto);
        return toDto(cylinderRepository.save(cylinder));
    }

    @Override
    public CylinderDto getById(Long id) {
        return cylinderRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    public List<CylinderDto> getAll() {
        return cylinderRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public CylinderDto update(Long id, CylinderDto cylinderDto) {
        if (!cylinderRepository.existsById(id)) return null;
        cylinderDto.setId(id);
        Cylinder cylinder = toEntity(cylinderDto);
        return toDto(cylinderRepository.save(cylinder));
    }

    @Override
    public void delete(Long id) {
        cylinderRepository.deleteById(id);
    }
}

