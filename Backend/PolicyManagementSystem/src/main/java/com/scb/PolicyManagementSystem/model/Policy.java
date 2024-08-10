package com.scb.PolicyManagementSystem.model;

import jakarta.persistence.*;


import java.util.Date;
import java.util.List;

@Entity
@Table(name = "policies")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "data_policy_id")
    private int dataPolicyId;

    @Column(name = "data_policy_version")
    private int dataPolicyVersion;

    @Column(name = "data_policy_last_modified")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataPolicyLastModified;

    @Enumerated(EnumType.STRING)
    @Column(name = "data_policy_status")
    private Status dataPolicyStatus;

    @Column(name = "data_policy_name")
    private String dataPolicyName;

    @Column(name = "data_policy_creator")
    private String dataPolicyCreator;

    @Column(name = "data_policy_examiner")
    private String dataPolicyExaminer;

    @Column(name = "data_policy_action_reason")
    private String dataPolicyActionReason;

    @Column(name = "data_policy_region")
    private String dataPolicyRegion;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_id")
    private List<PolicyRule> dataPolicy;

    // Getters and Setters


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
