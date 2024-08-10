package com.scb.PolicyManagementSystem.service;

import com.scb.PolicyManagementSystem.model.*;
import com.scb.PolicyManagementSystem.repository.DataRepository;
import com.scb.PolicyManagementSystem.repository.PolicyRepository;
import com.scb.PolicyManagementSystem.repository.UserRepository;

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

    public List<CountryData> fetch(String userId){



        User user = userRepository.findById(userId).get();
        System.out.println(user.getLocation());
        List<CountryData> dt = dataRepository.findByReporterName(user.getLocation());
        List<String> policyIds = user.getDataPolicyApplied();
        List<Policy> policies = (List<Policy>) policyRepository.findAllById(policyIds);

        return applyPolicyFiltering(policies , dt);






    }
    private List<CountryData> applyPolicyFiltering(List<Policy> policies , List<CountryData> dt){

        for(Policy policy :policies){
            for(PolicyRule policyRule:policy.getDataPolicy()){
                dt = filterBasedOnPolicy(dt , policyRule);
            }
        }
        return dt;
    }

    private List<CountryData> filterBasedOnPolicy(List<CountryData> dt , PolicyRule policyRule){

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
        return dt;

    }

    private List<CountryData> filterBasedOnRules(List<CountryData> dt , Rule rule){

        return dt.stream()
                .filter(item -> applyRules(item, rule))
                .collect(Collectors.toList());

    }

    private   boolean applyRules(CountryData item , Rule rule){

        switch (rule.getOperator().toUpperCase()){
            case "IN":
                return rule.getValues().contains(getFieldValue(rule.getKey() , item));
            case "NOT IN":
                return !rule.getValues().contains(getFieldValue(rule.getKey() , item));
            default:
                throw new IllegalArgumentException("Unsupported rule operator: " + rule.getOperator());


        }

    }

    private String getFieldValue(String key , CountryData item){
        switch (key) {
            case "ReporterISO3":
                return item.getReporterISO3();
            case "ReporterName":
                return item.getReporterName();
            case "PartnerISO3":
                return item.getPartnerISO3();
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
