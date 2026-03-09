package com.portfolio.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class PasswordEncoder {

    private static final String ALGORITHM = "SHA-256";

    /**
     * Criptografa a senha usando SHA-256 e converte para Base64
     */
    public static String encode(String rawPassword) {
        try {
            MessageDigest digest = MessageDigest.getInstance(ALGORITHM);
            byte[] hash = digest.digest(rawPassword.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error encoding password", e);
        }
    }

    /**
     * Verifica se a senha fornecida corresponde ao hash armazenado
     */
    public static boolean matches(String rawPassword, String encodedPassword) {
        return encode(rawPassword).equals(encodedPassword);
    }

    /**
     * Gera um hash de uma senha para armazenamento
     */
    public static String hashPassword(String password) {
        return encode(password);
    }
}
