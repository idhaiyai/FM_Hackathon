package com.scb.PolicyManagementSystem.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/policy")
public class PolicyController {

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello World";
    }

}
