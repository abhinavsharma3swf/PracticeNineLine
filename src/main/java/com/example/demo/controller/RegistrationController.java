package com.example.demo.controller;

import com.example.demo.entity.UserInfo;
import com.example.demo.service.UserInfoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

@RequestMapping("/api/registration")

public class RegistrationController {

    private final UserInfoService userInfoService;

    public RegistrationController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    @PostMapping
    public ResponseEntity<UserInfo> createNewUser(@RequestBody UserInfo userInfo){
        return new ResponseEntity<>(userInfoService.createNewUser(userInfo), HttpStatus.CREATED);
    }
}
