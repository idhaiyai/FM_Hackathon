package com.scb.PolicyManagementSystem.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Policy_Maker")
public class PolicyMaker {
    @Id
    private String id;
    private String name;


    // Getters and setters
}
