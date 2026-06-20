package com.example.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.entity.User;
import com.example.service.UserService;

@RestController
    //@CrossOrigin(origins = "http://localhost:1234")
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping
//    public User create(@RequestBody User user) {  return service.save(user); }

    public ResponseEntity<Map<String, Object>> create(@RequestBody User user) {
        User savedUser = service.save(user);
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "User created successfully");
        response.put("data", savedUser);  
        return ResponseEntity.ok(response);
    }
    
    @GetMapping
//    public List<User> getAll() { return service.getAll(); }

    public ResponseEntity<Map<String, Object>> getAll() {
        List<User> users = service.getAll();
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Users fetched successfully");
        response.put("count", users.size());
        response.put("data", users);
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}")
//    public User update(@PathVariable Long id, @RequestBody User user) { return service.update(id, user); }

  public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @RequestBody User user) {
      User updatedUser = service.update(id, user);
      Map<String, Object> response = new LinkedHashMap<>();
      response.put("message", "User updated successfully");
      response.put("id", updatedUser.getId());
      response.put("data", updatedUser);
      return ResponseEntity.ok(response);
  }
     
    @DeleteMapping("/{id}")
//    public void delete(@PathVariable Long id) { service.delete(id); }
    
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        service.delete(id);
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "User deleted successfully");
        response.put("id", id);
        return ResponseEntity.ok(response);
    }
     
    @PatchMapping("/{id}")
    public ResponseEntity<Map<String, Object>> patchUser(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        User updatedUser = service.patchUpdate(id, updates);
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "User partially updated successfully");
        response.put("id", updatedUser.getId());
        response.put("data", updatedUser);
        return ResponseEntity.ok(response);
    }
    
    @RequestMapping(method = RequestMethod.HEAD)
    public ResponseEntity<Void> headUsers() {
        return ResponseEntity.ok().build();
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Void> optionsUsers() {
        return ResponseEntity.ok()
                .allow(HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH,HttpMethod.HEAD)
                .build();
    }
}
