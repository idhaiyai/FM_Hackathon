package com.scb.PolicyManagementSystem.service;

import com.scb.PolicyManagementSystem.model.*;
import com.scb.PolicyManagementSystem.repository.DataRepository;
import com.scb.PolicyManagementSystem.repository.PolicyRepository;
import com.scb.PolicyManagementSystem.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DataService {

    @Autowired
    DataRepository dataRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PolicyRepository policyRepository;

    public List<Data> fetch(int userId){

        List<Data> dt = dataRepository.findAll();

        User user = userRepository.findById(userId);
        List<ObjectId> policyIds = user.getDataPolicyApplied();
        List<Policy> policies = policyRepository.findAllById(policyIds);

        return applyPolicyFiltering(policies , dt);






    }
    private List<Data> applyPolicyFiltering(List<Policy> policies , List<Data> dt){

        for(Policy policy :policies){
            for(PolicyRule policyRule:policy.getDataPolicy()){
                dt = filterBasedOnPolicy(dt , policyRule);
            }
        }
        return dt;
    }

    private List<Data> filterBasedOnPolicy(List<Data> dt , PolicyRule policyRule){

        switch (policyRule.getOperator().toUpperCase()){
            case "AND":
                for(Rule rule: policyRule.getRules()){
                    dt = filterBasedOnRules(dt , rule);
                }
                break;
            case "OR":
                dt = dt.stream()
                        .filter(item -> policyRule.getRules().stream()
                                .anyMatch(rule -> applyRules(item, rule)))
                        .collect(Collectors.toList());
                break;

            default:
                throw new IllegalArgumentException("Unsupported policy operator: " + policyRule.getOperator());
        }


    }

    private List<Data> filterBasedOnRules(List<Data> dt , Rule rule){

        return dt.stream()
                .filter(item -> applyRules(item, rule))
                .collect(Collectors.toList());

    }

    private   boolean applyRules(Data item , Rule rule){

        switch (rule.getOperator().toUpperCase()){
            case "IN":
                return rule.getValues().contains(getFieldValue(rule.getKey() , item));
            case "NOT IN":
                return !rule.getValues().contains(getFieldValue(rule.getKey() , item));
            default:
                throw new IllegalArgumentException("Unsupported rule operator: " + rule.getOperator());


        }

    }

    private String getFieldValue(String key , Data item){
        switch (key) {
            case "ReporterISO3":
                return item.getReporterISO3();
            case "ReporterName":
                return item.getReporterName();
            case "PartnerName":
                return item.getPartnerName();
            case "Year":
                return String.valueOf(item.getYear());
            case "TradeFlowName":
                return item.getTradeFlowName();
            default:
                throw new IllegalArgumentException("Unsupported key: " + key);
        }
    }

}
