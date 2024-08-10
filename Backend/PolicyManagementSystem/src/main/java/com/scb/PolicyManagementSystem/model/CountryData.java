package com.scb.PolicyManagementSystem.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "data")
@Data
public class CountryData{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reporter_iso3")
    private String reporterISO3;

    @Column(name = "reporter_name")
    private String reporterName;

    @Column(name = "partner_iso3")
    private String partnerISO3;

    @Column(name = "partner_name")
    private String partnerName;

    @Column(name = "year")
    private int year;

    @Column(name = "trade_flow_name")
    private String tradeFlowName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReporterISO3() {
        return reporterISO3;
    }

    public void setReporterISO3(String reporterISO3) {
        this.reporterISO3 = reporterISO3;
    }

    public String getReporterName() {
        return reporterName;
    }

    public void setReporterName(String reporterName) {
        this.reporterName = reporterName;
    }

    public String getPartnerISO3() {
        return partnerISO3;
    }

    public void setPartnerISO3(String partnerISO3) {
        this.partnerISO3 = partnerISO3;
    }

    public String getPartnerName() {
        return partnerName;
    }

    public void setPartnerName(String partnerName) {
        this.partnerName = partnerName;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getTradeFlowName() {
        return tradeFlowName;
    }

    public void setTradeFlowName(String tradeFlowName) {
        this.tradeFlowName = tradeFlowName;
    }
}
