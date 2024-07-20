package com.scb.PolicyManagementSystem.controller;

import com.scb.PolicyManagementSystem.model.Policy;
import com.scb.PolicyManagementSystem.service.PolicyService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/policies")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello World";
    }

    @GetMapping("/all")
    public List<Policy> getAllPolices(){

        return policyService.getAllPolices();

    }
    @GetMapping("/unique/{Id}")
    public Policy getPolicyById(@PathVariable ObjectId Id) {
        System.out.println(Id);
        return policyService.getPolicy(new ObjectId(String.valueOf(Id)));
    }

    @GetMapping("/ByStatus")
    public List<Policy> getAllPolicesByStatus(@RequestParam("status") String status){

        return policyService.getPolicesByStatus(status);

    }



    @GetMapping("/{policyId}")
    public List<Policy> getAllPolices(@PathVariable int policyId){
        return policyService.getAllPolicesByDataPolicyID(policyId);

    }
    @GetMapping("/archive")
    public  List<Policy> getAllArchive(){
        return policyService.getArchivePolices();
    }

    @PostMapping("/create/{userId}")
    public Policy createPolicy(@RequestBody Policy policy , @PathVariable int userId) {
        return policyService.createPolicy( policy , userId);
    }

    @PostMapping("/update/{userId}")
    public Policy updatePolicy(@RequestBody Policy policy , @PathVariable int userId) {
        return policyService.updatePolicy( policy , userId);
    }

    @PostMapping("/approve/{Id}/{userId}")
    public Policy approvePolicy(@RequestParam("approve") boolean approve , @PathVariable("Id") ObjectId Id,
                                @PathVariable("userId") int userId) {
        System.out.println("here");
        return policyService.approvePolicy(new ObjectId(String.valueOf(Id)), userId , approve);
    }


}
