package com.springsecurity.springsecurity.Services;

import com.springsecurity.springsecurity.Entity.Cart;
import com.springsecurity.springsecurity.Entity.CartItem;
import com.springsecurity.springsecurity.user.User;
import com.springsecurity.springsecurity.user.UserRepository; // Ensure you have this repository
import com.springsecurity.springsecurity.Entity.CartRepository; // You need to create this repository
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CartService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Transactional
    public Cart addProductToCart(Integer userId, Long productId) {
        // Retrieve the user by their ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the user already has a cart
        Cart cart;
        if (user.getCarts().isEmpty()) {
            // Create a new cart if the user doesn't have one
            cart = new Cart();
            cart.setUser(user);
            cart.setCreatedDate(LocalDateTime.now());
            cart.setUpdatedDate(LocalDateTime.now());
            user.getCarts().add(cart); // Add the cart to the user
        } else {
            // Use the first existing cart (you might want to adjust this logic)
            cart = user.getCarts().get(0);
        }

        // Create a new cart item
        CartItem item = new CartItem();
        item.setProductId(productId);

        // Add the item to the cart
        cart.getItems().add(item);

        // Update the cart's updated date
        cart.setUpdatedDate(LocalDateTime.now());
        item.setQuantity(1);
        // Save the cart (user will also be saved thanks to CascadeType)
        cartRepository.save(cart);

        return cart;
    }
}
