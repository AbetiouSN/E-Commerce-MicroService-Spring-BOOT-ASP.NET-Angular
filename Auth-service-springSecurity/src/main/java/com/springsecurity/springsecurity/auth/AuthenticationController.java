package com.springsecurity.springsecurity.auth;

import com.springsecurity.springsecurity.user.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins ="http://localhost:4200")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

private  final AuthenticationSercvice authenticationSercvice;

    @PostMapping("/register")
    public  ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(authenticationSercvice.register(request));
    }

    @PostMapping("/register-client")
    public ResponseEntity<AuthenticationResponse> registerClient(@RequestBody Customer request) {
        System.out.println("Received request: " + request); // Pour vérifier la requête
        return ResponseEntity.ok(authenticationSercvice.registerClient(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(authenticationSercvice.authenticate(request));
    }
}
