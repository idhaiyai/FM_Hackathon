package com.scb.PolicyManagementSystem.model;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "rules")
public class Rule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "key")
    private String key;

    @Column(name = "operator")
    private String operator;

    @ElementCollection
    @CollectionTable(name = "rule_values", joinColumns = @JoinColumn(name = "rule_id"))
    @Column(name = "value")
    private List<String> values;

    // Getters and Setters


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public List<String> getValues() {
        return values;
    }

    public void setValues(List<String> values) {
        this.values = values;
    }
}
