package com.example.demo.service;

import com.example.demo.entity.NineLine;
import com.example.demo.repository.NineLineRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class NineLineServiceTest {

    @Mock
    NineLineRepo nineLineRepo;

    @InjectMocks
    NineLineService nineLineService;
    NineLine nineLineReq;

    @BeforeEach
    void setUp(){
        nineLineReq = new NineLine("location", "radioFreq/Call-Sign", "No.ofPatientsByP", "SpecEqp", "PatByType");
        nineLineReq.setId(1L);
        MockitoAnnotations.openMocks(this);  //Initializes @Mock and @InjectMocks
    }

    @Test
    void shouldCreateANewNineLineRequest(){
        when(nineLineRepo.save(nineLineReq)).thenReturn(nineLineReq);
        NineLine actualReq = nineLineService.createNewNineLineReq(nineLineReq);
        verify(nineLineRepo,times(1)).save((any(NineLine.class)));
        assertThat(actualReq).isEqualTo(nineLineReq);
    }
}
