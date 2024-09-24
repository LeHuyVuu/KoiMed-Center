package com.koicenter.koicenterbackend.util;


import com.koicenter.koicenterbackend.model.entity.User;
import com.koicenter.koicenterbackend.repository.LoggedOutTokenRepository;
import com.koicenter.koicenterbackend.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Component
public class JWTUtilHelper {
    @Autowired
    UserRepository userRepository;


    @Autowired
    LoggedOutTokenRepository loggedOutTokenRepository;

    @Value("${myapp.api-key}")
    private String privateKey;


    public String generateToken(String data){
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(privateKey));
        User user = userRepository.findByUsername(data);

        String jws = Jwts.builder().subject(data)
                .claim("user_id", user.getUserId())
                .issuer("KoiCenter.com")
                .issuedAt(new Date())
                .claim("jti", UUID.randomUUID().toString())
                .expiration(new Date(
                        Instant.now().plus(3, ChronoUnit.DAYS).toEpochMilli()
                ))
                .signWith(key).compact();
        return jws;
    }



    public boolean verifyToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(privateKey));
            Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false; // Return false if the token verification fails
        }
    }

    public boolean isTokenLoggedOut(String token) {
        return loggedOutTokenRepository.findByToken(token).isPresent();
    }






}
