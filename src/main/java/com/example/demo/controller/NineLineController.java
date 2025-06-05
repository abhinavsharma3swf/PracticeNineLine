package com.example.demo.controller;

import com.example.demo.entity.NineLine;
import com.example.demo.service.NineLineService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/nineline")
public class NineLineController {

    private final NineLineService nineLineService;


    public NineLineController(NineLineService nineLineService) {
        this.nineLineService = nineLineService;
    }

    @PostMapping
    public ResponseEntity<NineLine> createNineLineReq(@RequestBody NineLine nineLine){
        Long userId = nineLine.getUserInfo().getId();
        return new ResponseEntity<>(nineLineService.createNewNineLineReq(userId, nineLine), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<NineLine>> fetchAllNineLineRequests(){
        return new ResponseEntity<>(nineLineService.fetchAllNineLineRequests(),HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Optional<NineLine>> softDelete(@PathVariable Long id) {
        return new ResponseEntity<>(nineLineService.softDeleteNineLine(id), HttpStatus.OK);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Optional<NineLine>> updateNineLine(@RequestBody NineLine updatedNineLine){
        return new ResponseEntity<>(nineLineService.updateNineLine(updatedNineLine), HttpStatus.OK);
    }
}
