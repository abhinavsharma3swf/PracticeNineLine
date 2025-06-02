package com.example.demo.controller;

import com.example.demo.entity.NineLine;
import com.example.demo.service.NineLineService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(NineLineController.class)
public class NineLineControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private NineLineService nineLineService;

    NineLine nineLineReq;
    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp(){
        nineLineReq = new NineLine("location", "radioFreq/Call-Sign", "No.ofPatientsByP", "SpecEqp", "PatByType");
        nineLineReq.setId(1L);
        Mockito.when(nineLineService.createNewNineLineReq(Mockito.any(NineLine.class))).thenReturn(nineLineReq);
    }

    @Test
    void shouldAcceptRequestToCreateNineLineReq()  throws Exception{
        String nineLineReqJson = objectMapper.writeValueAsString(nineLineReq);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/nineline")
                .contentType(MediaType.APPLICATION_JSON)
                .content(nineLineReqJson))
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.line1").value("location"))
                .andExpect(jsonPath("$.line2").value("radioFreq/Call-Sign"))
                .andExpect(jsonPath("$.line3").value("No.ofPatientsByP"))
                .andExpect(jsonPath("$.line4").value("SpecEqp"))
                .andExpect(jsonPath("$.line5").value("PatByType"));
    }
}
