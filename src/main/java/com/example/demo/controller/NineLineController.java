package com.example.demo.controller;

import com.example.demo.entity.NineLine;
import com.example.demo.service.NineLineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nineLine")
public class NineLineController {

    private final NineLineService nineLineService;


    public NineLineController(NineLineService nineLineService) {
        this.nineLineService = nineLineService;
    }

    @PostMapping
    public ResponseEntity<NineLine> createNineLineReq(@RequestBody NineLine nineLine){
        return new ResponseEntity<>(nineLineService.createNewNineLineReq(nineLine), HttpStatus.CREATED);
    }
}
