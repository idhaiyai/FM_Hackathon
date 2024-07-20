package com.scb.PolicyManagementSystem.model;


import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date;
import java.util.List;

@Document(collection = "policies")


@NoArgsConstructor
@AllArgsConstructor
public class Policy {

    @Id
    private ObjectId id;
    private  int dataPolicyId;
    private int dataPolicyVersion;
    private Date dataPolicyLastModified;
    private String dataPolicyStatus;
    private String dataPolicyName;
    private int dataPolicyCreator;
    private int  dataPolicyExaminer;
    private List<PolicyRule> dataPolicy;


    // GETTER AND SETTER


    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public int getDataPolicyId() {
        return dataPolicyId;
    }

    public void setDataPolicyId(int dataPolicyId) {
        this.dataPolicyId = dataPolicyId;
    }

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

    public String getDataPolicyName() {
        return dataPolicyName;
    }

    public void setDataPolicyName(String dataPolicyName) {
        this.dataPolicyName = dataPolicyName;
    }

    public int getDataPolicyCreator() {
        return dataPolicyCreator;
    }

    public void setDataPolicyCreator(int dataPolicyCreator) {
        this.dataPolicyCreator = dataPolicyCreator;
    }

    public int getDataPolicyExaminer() {
        return dataPolicyExaminer;
    }

    public void setDataPolicyExaminer(int dataPolicyExaminer) {
        this.dataPolicyExaminer = dataPolicyExaminer;
    }

    public List<PolicyRule> getDataPolicy() {
        return dataPolicy;
    }

    public void setDataPolicy(List<PolicyRule> dataPolicy) {
        this.dataPolicy = dataPolicy;
    }
}



