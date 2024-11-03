package com.springsecurity.springsecurity.Controllers;

import com.springsecurity.springsecurity.Entity.Cart;
import com.springsecurity.springsecurity.Services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    // Ensure that only users with ADMIN role can access this endpoint
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public Cart addProductToCart(@RequestParam Integer userId, @RequestParam Long productId) {
        return cartService.addProductToCart(userId, productId);
    }
}
