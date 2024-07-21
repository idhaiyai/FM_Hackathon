package com.scb.PolicyManagementSystem.model;


import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "data")
@lombok.Data

public class Data {


            private String ReporterISO3;
            private  String ReporterName;
            private String PartnerISO3;
            private String PartnerName;
            private int Year;
            private  String TradeFlowName;



}
