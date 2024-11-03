package com.springsecurity.springsecurity.auth;

import com.springsecurity.springsecurity.config.JwtService;
import com.springsecurity.springsecurity.user.Customer;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

   private  final AuthenticationSercvice authenticationSercvice;


    private final JwtService jwtService;


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




    @GetMapping("/userId")
    public ResponseEntity<Integer> getUserId(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            Integer userId = jwtService.extractUserId(token);
            return ResponseEntity.ok(userId);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        System.out.println(request.getEmail());
        return ResponseEntity.ok(authenticationSercvice.authenticate(request));
    }
}
