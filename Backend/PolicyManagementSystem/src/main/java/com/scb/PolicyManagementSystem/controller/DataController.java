package com.scb.PolicyManagementSystem.controller;


import com.scb.PolicyManagementSystem.model.Data;
import com.scb.PolicyManagementSystem.model.Policy;
import com.scb.PolicyManagementSystem.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/data")
public class DataController {
    @Autowired
    DataService dataService;

    @GetMapping("/{userId}")
    public List<Data> getAllPolices(@PathVariable int userId){

        return dataService.fetch(userId);

    }
}
