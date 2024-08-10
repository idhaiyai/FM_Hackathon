package com.scb.PolicyManagementSystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "location")
    private String location;

    @ElementCollection
    @CollectionTable(name = "user_data_policies", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "data_policy")
    private List<String> dataPolicyApplied;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<String> getDataPolicyApplied() {
        return dataPolicyApplied;
    }

    public void setDataPolicyApplied(List<String> dataPolicyApplied) {
        this.dataPolicyApplied = dataPolicyApplied;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
