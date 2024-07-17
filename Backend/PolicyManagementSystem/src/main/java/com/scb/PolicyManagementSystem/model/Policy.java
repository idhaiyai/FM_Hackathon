package com.scb.PolicyManagementSystem.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date;
import java.util.List;

@Document(collection = "policies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Policy {

    @Id
    private String dataPolicyId;
    private int dataPolicyVersion;
    private Date dataPolicyLastModified;
    private String dataPolicyStatus;
    private String dataPolicyName;
    private List<PolicyRule> dataPolicy;

}



