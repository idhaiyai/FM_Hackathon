package com.scb.PolicyManagementSystem.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "policies")
public class Policy {

    @Id
    private String dataPolicyId;
    private int dataPolicyVersion;
    private Date dataPolicyLastModified;
    private String dataPolicyStatus;
    private String dataPolicyName;
    private List<PolicyRule> dataPolicy;

    // Getters and Setters


    public int getDataPolicyVersion() {
        return dataPolicyVersion;
    }

    public void setDataPolicyVersion(int dataPolicyVersion) {
        this.dataPolicyVersion = dataPolicyVersion;
    }

    public Date getDataPolicyLastModified() {
        return dataPolicyLastModified;
    }

    public void setDataPolicyLastModified(Date dataPolicyLastModified) {
        this.dataPolicyLastModified = dataPolicyLastModified;
    }

    public String getDataPolicyStatus() {
        return dataPolicyStatus;
    }

    public void setDataPolicyStatus(String dataPolicyStatus) {
        this.dataPolicyStatus = dataPolicyStatus;
    }

    public String getDataPolicyId() {
        return dataPolicyId;
    }

    public void setDataPolicyId(String dataPolicyId) {
        this.dataPolicyId = dataPolicyId;
    }

    public String getDataPolicyName() {
        return dataPolicyName;
    }

    public void setDataPolicyName(String dataPolicyName) {
        this.dataPolicyName = dataPolicyName;
    }

    public List<PolicyRule> getDataPolicy() {
        return dataPolicy;
    }

    public void setDataPolicy(List<PolicyRule> dataPolicy) {
        this.dataPolicy = dataPolicy;
    }
}

class PolicyRule {
    private String operator;
    private List<Rule> rules;

    // Getters and Setters

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public List<Rule> getRules() {
        return rules;
    }

    public void setRules(List<Rule> rules) {
        this.rules = rules;
    }
}

class Rule {
    private String key;
    private String operator;
    private List<String> values;

    // Getters and Setters

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


