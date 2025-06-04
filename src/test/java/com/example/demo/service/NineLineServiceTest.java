package com.example.demo.service;

import com.example.demo.entity.NineLine;
import com.example.demo.entity.UserInfo;
import com.example.demo.repository.NineLineRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
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

    private UserInfo userinfo;

    List<NineLine> requests;

    @BeforeEach
    void setUp(){

        userinfo = new UserInfo("name", "callSign", "Unit", "role");
        nineLineReq = new NineLine("location", "radioFreq/Call-Sign", "No.ofPatientsByP", "SpecEqp", "PatByType", userinfo);
        nineLineReq2 = new NineLine("location1", "radioFreq/Call-Sign1", "No.ofPatientsByP1", "SpecEqp1", "PatByType1", userinfo);
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

    @Test
    void shouldEditTheNineLine(){
        NineLine updateNineLine = new NineLine("update1", "update2", "update3", "update4", "update5", userinfo);
        updateNineLine.setId(1L);

        //Mocking repository behavior
        Mockito.when(nineLineRepo.existsById(1L)).thenReturn(true);
        Mockito.when(nineLineRepo.findById(1L)).thenReturn(Optional.of(nineLineReq));
        Mockito.when(nineLineRepo.save(any(NineLine.class))).thenReturn(updateNineLine);

        //Act-Calling the method under test
        Optional<NineLine> result = nineLineService.updateNineLine(updateNineLine);

        //Assert-more detailed validation
        assertThat(result).isPresent();
        NineLine update = result.get();

        assertThat(update.getLine1()).isEqualTo("update1");
        assertThat(update.getLine2()).isEqualTo("update2");
        assertThat(update.getLine3()).isEqualTo("update3");
        assertThat(update.getLine4()).isEqualTo("update4");
        assertThat(update.getLine5()).isEqualTo("update5");

        //verifying
        verify(nineLineRepo, times(1)).save(any(NineLine.class));
    }
}
