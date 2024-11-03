package com.springsecurity.springsecurity.Entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class CartItem {
    private Long productId; // The ID of the product in the cart
    private int quantity; // The quantity of the product
}
