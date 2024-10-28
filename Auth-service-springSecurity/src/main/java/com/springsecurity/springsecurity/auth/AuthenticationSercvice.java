package com.springsecurity.springsecurity.auth;

import com.springsecurity.springsecurity.config.JwtService;
import com.springsecurity.springsecurity.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationSercvice {

    private final UserRepository repository;
    private  final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private  final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    public AuthenticationResponse register(RegisterRequest request) {
      var user = User.builder()
              .email(request.getEmail())
              .password(passwordEncoder.encode(request.getPassword()))
              .role(request.getRole())
              .build();
      repository.save(user);
      var jwtToken = jwtService.generateToken(user);
      return AuthenticationResponse.builder()
              .token(jwtToken)
              .build();
    }

    public AuthenticationResponse registerClient(Customer request) {
        System.out.println("Received request: " + request);

        System.out.println("Email: " + request.getUser().getEmail());
        System.out.println("Password: " + request.getUser().getPassword());
        System.out.println("CNE: " + request.getCne()); // Vérification de la valeur de CNE
        System.out.println("Nom: " + request.getNom());
        System.out.println("Prenom: " + request.getPrenom());

        // Créer et enregistrer l'utilisateur
        var user = User.builder()
                .email(request.getUser().getEmail())
                .password(passwordEncoder.encode(request.getUser().getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        // Créer et associer le customer
        var customer = new Customer();
        customer.setCne(request.getCne());
        customer.setNom(request.getNom());
        customer.setPrenom(request.getPrenom());
        customer.setUser(user); // Associer l'utilisateur au client
        System.out.println(customer);
        customerRepository.save(customer);

        // Générer un jeton JWT pour le client
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
