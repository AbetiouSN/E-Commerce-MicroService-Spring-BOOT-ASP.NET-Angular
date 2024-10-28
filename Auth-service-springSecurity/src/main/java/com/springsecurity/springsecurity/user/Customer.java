package com.springsecurity.springsecurity.user;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cne;
    private String nom;
    private String prenom;

    @OneToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    private User user;
}
