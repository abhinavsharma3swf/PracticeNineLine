package com.example.demo.controller;
import com.example.demo.entity.NineLine;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.NineLineService;
import com.example.demo.service.UserInfoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.http.MediaType;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(NineLineController.class)
public class NineLineControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private NineLineService nineLineService;

    NineLine nineLineReq, nineLineReq1, updatedNineLine;

    private UserInfo userinfo;

    @Autowired
    private ObjectMapper objectMapper;

    @Captor
    ArgumentCaptor<NineLine> captor = ArgumentCaptor.forClass(NineLine.class);

//  @Autowired
//  private UserInfoService userInfoService;

    @BeforeEach
    void setUp(){
        userinfo = new UserInfo("name", "callSign", "unit", "role");
        userinfo.setId(1L);
        nineLineReq = new NineLine("location", "radioFreq/Call-Sign", "No.ofPatientsByP", "SpecEqp", "PatByType", userinfo );
        nineLineReq.setId(1L);
        nineLineReq.setSoftDelete(false);
        Mockito.when(nineLineService.createNewNineLineReq(Mockito.any(Long.class), Mockito.any(NineLine.class))).thenReturn(nineLineReq);
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
                .andExpect(jsonPath("$.line5").value("PatByType"))
                .andExpect(jsonPath("$.softDelete").value("false"))
                .andExpect(jsonPath("$.userInfo.id").value(1L));

        ArgumentCaptor<Long> id = ArgumentCaptor.forClass(Long.class);
        verify(nineLineService).createNewNineLineReq(id.capture(), captor.capture());
        assertEquals("location", captor.getValue().getLine1());
    }

    @Test
    void shouldAcceptRequestTFetchAllNineLineRequests() throws Exception {
        nineLineReq1 = new NineLine("location1", "radioFreq/Call-Sign1", "No.ofPatientsByP1", "SpecEqp1", "PatByType1", userinfo);
        nineLineReq1.setId(2L);
        List<NineLine> request = new ArrayList<>(List.of(nineLineReq, nineLineReq1));
        Mockito.when(nineLineService.fetchAllNineLineRequests()).thenReturn(request);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/nineline"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldAcceptRequestToSoftDeleteTheNineLineCard() throws Exception {
        nineLineReq = new NineLine("location1", "radioFreq/Call-Sign1", "No.ofPatientsByP1", "SpecEqp1", "PatByType1", userinfo);
        nineLineReq.setId(1L);
        nineLineReq.setSoftDelete(false);
        Mockito.when(nineLineService.softDeleteNineLine(nineLineReq.getId())).thenReturn(Optional.of(nineLineReq));
        mockMvc.perform(MockMvcRequestBuilders.patch("/api/nineline/1"))
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.softDelete").value(false))
                        .andDo(print()); //print
//
//        We can not test this due to limitation with captor only testing the input mock data rather than the returned data.
//        ArgumentCaptor <Long> idCaptor = ArgumentCaptor.forClass(Long.class);
//        verify(nineLineService).softDeleteNineLine(idCaptor.capture());
//        assertEquals(false, captor.getValue().getSoftDelete());
    }

    @Test
    void shouldAcceptRequestToUpdateTheUpdatedNineLineRequest() throws Exception {
        updatedNineLine = new NineLine("Update1", "Update2", "Update3", "Update4", "Update5", userinfo);
        updatedNineLine.setId(1L);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/nineline/edit/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedNineLine)))
                .andExpect(status().is2xxSuccessful());

        verify(nineLineService).updateNineLine(captor.capture());
        assertEquals("Update2", captor.getValue().getLine2());
    }
}
