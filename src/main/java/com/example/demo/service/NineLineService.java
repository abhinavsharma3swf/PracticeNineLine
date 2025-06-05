package com.example.demo.service;
import com.example.demo.entity.NineLine;
import com.example.demo.entity.UserInfo;
import com.example.demo.repository.NineLineRepo;
import com.example.demo.repository.UserInfoRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NineLineService {

    private final NineLineRepo nineLineRepo;
    private final UserInfoRepo userInfoRepo;

    public NineLineService(NineLineRepo nineLineRepo, UserInfoRepo userInfoRepo) {
        this.nineLineRepo = nineLineRepo;
        this.userInfoRepo = userInfoRepo;
    }

    public NineLine createNewNineLineReq(Long id, NineLine nineLine){
        UserInfo userInfo = userInfoRepo.findById(id)
                .orElseThrow(()-> new RuntimeException("user not found"));
        nineLine.setUserInfo(userInfo);
        return nineLineRepo.save(nineLine);
    }

    public List<NineLine> fetchAllNineLineRequests() {
        return nineLineRepo.findAll();
    }

    public Optional<NineLine> softDeleteNineLine(Long id) {
            NineLine tempRequest = nineLineRepo.findById(id).orElseThrow();
            tempRequest.setSoftDelete(true);
            return Optional.of(nineLineRepo.save(tempRequest));
    }

    public Optional<NineLine> updateNineLine(NineLine updateNineLine) {

//            NineLine tempNineLine = nineLineRepo.findById(id).orElseThrow();
            return Optional.of(nineLineRepo.save(updateNineLine));
    }
}
