package com.springsecurity.springsecurity.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;

import java.security.Key;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtService {
    private static final String SECRET_KEY = "68O6oElgaN6n5ng33muN4HPs2Hmw/TuM29X/VGlukHhEwzdqmHF3YnKqN6aNX0eXtCoqW3yGoRJMiY7w3YK3klYk/d2hQDREQobAx88/jOrloWNLfAv2yAlSUjyxkAhKGti1bs/w0k8izCBiEaXUW08qODNBrdYls2VOCi0k6AJlMAc/vKQNQZi5cAFtL9ael3yahKD3r1SlecBFR2a1Vpx9DHSO2Xc1HU/2p2JjepBqBorZBSRJuyYVQXvbuNgRMY8Hm0YFrgr8WzQ/bm7rwsgo9/7AocZC/vjeF+LmvnVsee90wugz9EfCKHHyI8Tv/McBztSWISHiG+NnHnfyJSMvx4yHI6ObhtQwxytYT1Q=\n";

    public String extrtactUsername(String token) {
        return extractClaim(token ,Claims::getSubject);
    }

    public <T> T extractClaim(String token , Function<Claims , T> claimsResolver){
        final  Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

//    public String generateToken(UserDetails userDetails){
//        return generateToken(new HashMap<>(), userDetails);
//    }
    //hadi d rihab
public String generateToken(UserDetails userDetails){
    return Jwts.builder()
            .setClaims(Map.of("role",userDetails.getAuthorities()))
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 *60*10))
            .signWith(getSignInKey(),SignatureAlgorithm.HS256).compact();
}

    public String generateToken(Map<String,Object> extraClaims, UserDetails userDetails){
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ 60480000))
                .signWith(getSignInKey(),SignatureAlgorithm.HS256).compact();

    }


//    public String generateToken(
//            Map<String , Object> extraClaims,
//            UserDetails userDetails
//    ){
//        return Jwts
//                .builder()
//                .setClaims(extraClaims)
//                .setSubject(userDetails.getUsername())
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
//                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }



//public String generateToken(UserDetails userDetails) {
//    // Retrieve user roles from UserDetails
//    List<String> roles = userDetails.getAuthorities().stream()
//            .map(GrantedAuthority::getAuthority)
//            .collect(Collectors.toList());
//
//    // Create extra claims and add roles
//    Map<String, Object> extraClaims = new HashMap<>();
//    extraClaims.put("roles", roles);
//
//    return Jwts.builder()
//            .setClaims(extraClaims)
//            .setSubject(userDetails.getUsername())
//            .setIssuedAt(new Date(System.currentTimeMillis()))
//            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
//            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
//            .compact();
//}


    public boolean isTokenValid(String token , UserDetails userDetails){
        final String username = extrtactUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    private Date extractExpiration(String token){
        return extractClaim(token ,Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    private Key getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
