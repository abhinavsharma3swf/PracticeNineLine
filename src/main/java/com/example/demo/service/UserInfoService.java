package com.example.demo.service;

import com.example.demo.entity.UserInfo;
import com.example.demo.repository.UserInfoRepo;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {

    private final UserInfoRepo userInfoRepo;

    public UserInfoService(UserInfoRepo userInfoRepo) {
        this.userInfoRepo = userInfoRepo;
    }

    public UserInfo createNewUser(UserInfo userInfo){
        return userInfoRepo.save(userInfo);
    }
}
