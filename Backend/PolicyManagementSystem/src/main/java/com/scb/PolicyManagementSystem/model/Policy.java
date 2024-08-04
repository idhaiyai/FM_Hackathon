package com.scb.PolicyManagementSystem.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date;
import java.util.List;

@Document(collection = "policies")


@NoArgsConstructor
@AllArgsConstructor
public class Policy {

    @Id
    private String id;
    private  int dataPolicyId;
    private int dataPolicyVersion;
    private Date dataPolicyLastModified;
    private Status dataPolicyStatus;
    private String dataPolicyName;
    private String dataPolicyCreator;
    private String  dataPolicyExaminer;
    private  String dataPolicyActionReason;
    private String dataPolicyRegion;
    private List<PolicyRule> dataPolicy;



    // GETTER AND SETTER


    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public Status getDataPolicyStatus() {
        return dataPolicyStatus;
    }

    public void setDataPolicyStatus(Status dataPolicyStatus) {
        this.dataPolicyStatus = dataPolicyStatus;
    }

    public String getDataPolicyName() {
        return dataPolicyName;
    }

    public void setDataPolicyName(String dataPolicyName) {
        this.dataPolicyName = dataPolicyName;
    }

    public String getDataPolicyCreator() {
        return dataPolicyCreator;
    }

    public void setDataPolicyCreator(String dataPolicyCreator) {
        this.dataPolicyCreator = dataPolicyCreator;
    }

    public String getDataPolicyExaminer() {
        return dataPolicyExaminer;
    }

    public void setDataPolicyExaminer(String dataPolicyExaminer) {
        this.dataPolicyExaminer = dataPolicyExaminer;
    }

    public String getDataPolicyActionReason() {
        return dataPolicyActionReason;
    }

    public void setDataPolicyActionReason(String dataPolicyActionReason) {
        this.dataPolicyActionReason = dataPolicyActionReason;
    }

    public String getDataPolicyRegion() {
        return dataPolicyRegion;
    }

    public void setDataPolicyRegion(String dataPolicyRegion) {
        this.dataPolicyRegion = dataPolicyRegion;
    }

    public List<PolicyRule> getDataPolicy() {
        return dataPolicy;
    }

    public void setDataPolicy(List<PolicyRule> dataPolicy) {
        this.dataPolicy = dataPolicy;
    }
}



