package com.example.ativooperante_back.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;

import com.example.ativooperante_back.db.entidades.Usuario;
import com.example.ativooperante_back.db.repository.UsuarioRepository;
import com.example.ativooperante_back.security.JWTTokenProvider;

@CrossOrigin
@RestController
@RequestMapping("security")
public class SecurityRestController {
    @Autowired
    UsuarioRepository usuariorepo;

    @GetMapping("logar")
    public ResponseEntity <Object> logar(String email, int senha) {
        Usuario u = usuariorepo.findByEmail(email);
        if(u != null) {   
            if(u.getSenha() == senha) {
                ArrayList<Object> obj = new ArrayList<>();
                obj.add(JWTTokenProvider.getToken(u.getEmail(),u.getNivel()));
                obj.add(u.getNivel());
                obj.add(u.getId());
                return ResponseEntity.ok(obj);
            }
        }
        return ResponseEntity.badRequest().body("Usuario não aceito");
    }

    @PostMapping("add-usuario")
    public ResponseEntity <Object> addUsuario(@RequestBody Usuario usuario){
        return ResponseEntity.ok().body(usuariorepo.save(usuario));
    }

    @GetMapping("get-usuarios")
    public ResponseEntity<Object> getUsuarios(){
        return ResponseEntity.ok().body(usuariorepo.findAll());  
    }
    @GetMapping("get-usuario/{email}")
    public ResponseEntity<Object> getUsuaris(@PathVariable("email") String email){
        return ResponseEntity.ok().body(usuariorepo.findByEmail(email));  
    }
}