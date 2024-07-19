package com.scb.PolicyManagementSystem.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Policy_Maker")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PolicyMaker {
    @Id
    private String id;
    private String name;
    private String role;
    private String password;
}
