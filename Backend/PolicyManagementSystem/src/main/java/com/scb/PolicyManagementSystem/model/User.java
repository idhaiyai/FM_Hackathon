package com.scb.PolicyManagementSystem.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "User")
public class User {
    @Id
    private String id;
    private String name;
    private String password;

    private List<String> data_policy_applied;



    // Getters and setters


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getData_policy_applied() {
        return data_policy_applied;
    }

    public void setData_policy_applied(List<String> data_policy_applied) {
        this.data_policy_applied = data_policy_applied;
    }
}
