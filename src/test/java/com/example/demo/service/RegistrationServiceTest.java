package com.example.demo.service;
import com.example.demo.entity.UserInfo;
import com.example.demo.repository.UserInfoRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.openMocks;

public class RegistrationServiceTest {

    @Mock
    UserInfoRepo userInfoRepo;

    @InjectMocks
    UserInfoService userInfoService;

    UserInfo userInfo;

    @BeforeEach
    void setUp(){
        userInfo = new UserInfo("john", "alpha", "asf", "dispatcher");
        userInfo.setId(1L);
        openMocks(this);
    }

    @Test
    void shouldCreateANewUser(){
        when(userInfoRepo.save(userInfo)).thenReturn(userInfo);
        UserInfo actualUser = userInfoService.createNewUser(userInfo);
        verify(userInfoRepo, times(1)).save((any(UserInfo.class)));
        assertThat(actualUser).isEqualTo(userInfo);
    }
}
