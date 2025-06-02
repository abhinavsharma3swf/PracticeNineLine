package com.example.demo.service;

import com.example.demo.entity.NineLine;
import com.example.demo.repository.NineLineRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class NineLineServiceTest {

    @Mock
    NineLineRepo nineLineRepo;

    @InjectMocks
    NineLineService nineLineService;
    NineLine nineLineReq;
    NineLine nineLineReq2;

    List<NineLine> requests;

    @BeforeEach
    void setUp(){
        nineLineReq = new NineLine("location", "radioFreq/Call-Sign", "No.ofPatientsByP", "SpecEqp", "PatByType");
        nineLineReq2 = new NineLine("location1", "radioFreq/Call-Sign1", "No.ofPatientsByP1", "SpecEqp1", "PatByType1");
        nineLineReq2.setId(2L);
        nineLineReq.setId(1L);
        nineLineReq.setSoftDelete(false);
        requests = new ArrayList<>(List.of(nineLineReq,nineLineReq2));

        MockitoAnnotations.openMocks(this);  //Initializes @Mock and @InjectMocks

    }

    @Test
    void shouldCreateANewNineLineRequest(){
        when(nineLineRepo.save(nineLineReq)).thenReturn(nineLineReq);
        NineLine actualReq = nineLineService.createNewNineLineReq(nineLineReq);
        verify(nineLineRepo,times(1)).save((any(NineLine.class)));
        assertThat(actualReq).isEqualTo(nineLineReq);
    }

    @Test
    void shouldFetchAllNineLineRequests(){
        when(nineLineRepo.findAll()).thenReturn(requests);
        List<NineLine> requestList = nineLineService.fetchAllNineLineRequests();
        verify(nineLineRepo,times(1)).findAll();
        assertThat(requestList).isEqualTo(requests);
    }

    @Test
    void shouldSoftDelete(){
        when(nineLineRepo.existsById(1L)).thenReturn(true);
        when(nineLineRepo.findById(1L)).thenReturn(Optional.of(nineLineReq));
        when(nineLineRepo.save(any(NineLine.class))).thenReturn(nineLineReq);
        Optional<NineLine> deletedItem = nineLineService.softDeleteNineLine(1L);
        assertThat(deletedItem).isPresent();
        assertThat(deletedItem.get().getSoftDelete()).isTrue();
    }
}
