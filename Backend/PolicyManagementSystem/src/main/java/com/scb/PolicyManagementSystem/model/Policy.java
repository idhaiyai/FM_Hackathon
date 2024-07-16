package com.scb.PolicyManagementSystem.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Policy")
public class Policy {

    @Id
    private String id;



    // Getters and setters
}


