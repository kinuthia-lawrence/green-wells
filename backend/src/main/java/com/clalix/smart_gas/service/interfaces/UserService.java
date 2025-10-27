package com.clalix.smart_gas.service.interfaces;

import com.clalix.smart_gas.dto.UserDto;
import java.util.List;

public interface UserService {
    UserDto create(UserDto userDto);
    UserDto getById(Long id);
    List<UserDto> getAll();
    UserDto update(Long id, UserDto userDto);
    void delete(Long id);
}

