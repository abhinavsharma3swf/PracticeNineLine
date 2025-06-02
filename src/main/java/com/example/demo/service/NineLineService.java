package com.example.demo.service;
import com.example.demo.entity.NineLine;
import com.example.demo.repository.NineLineRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NineLineService {

    private final NineLineRepo nineLineRepo;

    public NineLineService(NineLineRepo nineLineRepo) {
        this.nineLineRepo = nineLineRepo;
    }

    public NineLine createNewNineLineReq(NineLine nineLine){
        return nineLineRepo.save(nineLine);
    }

    public List<NineLine> fetchAllNineLineRequests() {return nineLineRepo.findAll();
    }
}
