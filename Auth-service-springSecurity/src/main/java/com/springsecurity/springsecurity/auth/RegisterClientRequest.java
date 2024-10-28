package com.springsecurity.springsecurity.auth;

import lombok.Data;

@Data
public class RegisterClientRequest {
    private String email;
    private String password;
    private String cne;
    private String nom;
    private String prenom;
}
