package com.scb.PolicyManagementSystem.controller;


import com.scb.PolicyManagementSystem.model.CountryData;

import com.scb.PolicyManagementSystem.service.DataService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/data")
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {
    @Autowired
    DataService dataService;

    @GetMapping("/{userId}")
    public List<CountryData> getAllPolices(@PathVariable  String  userId){
        System.out.println("starting the fetching");
        return dataService.fetch(userId);

    }
}
