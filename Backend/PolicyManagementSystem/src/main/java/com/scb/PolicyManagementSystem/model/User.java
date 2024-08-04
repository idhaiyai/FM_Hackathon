package com.scb.PolicyManagementSystem.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.lang.String;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Set;

@Document(collection = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String userId;
    private String username;
    private String password;
    private String location;
    private List<String> data_policy_applied;
    private Role role;


    public List<String> getData_policy_applied() {
        return data_policy_applied;
    }

    public void setData_policy_applied(List<String> data_policy_applied) {
        this.data_policy_applied = data_policy_applied;
    }
}