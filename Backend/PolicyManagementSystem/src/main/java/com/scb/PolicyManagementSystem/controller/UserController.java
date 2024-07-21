package com.scb.PolicyManagementSystem.controller;

import com.scb.PolicyManagementSystem.model.Role;
import com.scb.PolicyManagementSystem.model.User;
import com.scb.PolicyManagementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username,@RequestParam String password) {
        Optional<User> user = userService.verifyUser(username, password);
        if (user.isPresent()) {
            return ResponseEntity.ok("Login successful");
        }
        else {
            return ResponseEntity.status(401).body("Login failed");
        }
    }

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return userService.createUser(user);
    }

}
