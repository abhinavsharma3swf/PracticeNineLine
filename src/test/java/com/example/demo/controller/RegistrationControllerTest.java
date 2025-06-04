package com.example.demo.controller;

import com.example.demo.entity.UserInfo;
import com.example.demo.service.UserInfoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RegistrationController.class)
public class RegistrationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserInfoService userInfoService;

    UserInfo userInfo;

    @Autowired
    private ObjectMapper objectMapper;

    @Captor
    ArgumentCaptor<UserInfo> captor = ArgumentCaptor.forClass(UserInfo.class);


    @BeforeEach
    void setup() {
        userInfo = new UserInfo("name", "call-sign", "unit", "role");
        userInfo.setId(1L);
        Mockito.when(userInfoService.createNewUser(Mockito.any(UserInfo.class))).thenReturn(userInfo);
    }

    @Test
    void shouldAcceptRequestToCreateNewUser() throws Exception{
        String userInfoJson = objectMapper.writeValueAsString(userInfo);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/registration")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userInfoJson))
                .andExpect(status().is2xxSuccessful());
    }
}
