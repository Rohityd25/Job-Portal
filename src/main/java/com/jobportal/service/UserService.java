package com.jobportal.service;

import com.jobportal.dto.RegisterRequest;
import com.jobportal.model.User;

public interface UserService {
    User register(RegisterRequest request);

    User findByEmail(String email);
}
