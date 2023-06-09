package com.example.ativooperante_back.controllers;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ativooperante_back.db.entidades.Denuncia;
import com.example.ativooperante_back.db.entidades.Usuario;
import com.example.ativooperante_back.db.repository.DenunciaRepository;
import com.example.ativooperante_back.db.repository.OrgaoRepository;
import com.example.ativooperante_back.db.repository.TipoRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

// @CrossOrigin
@CrossOrigin
@RestController
@RequestMapping("apis/cidadao")
public class CidadaoRestController {
    @Autowired
    OrgaoRepository orgaorepo;

    @Autowired
    TipoRepository tiporepo;

    @Autowired
    DenunciaRepository denunciarepo;

    // @Autowired
    // UsuarioRepository usuariorepo;

    @GetMapping("get-orgaos")
    public ResponseEntity<Object> getOrgaos()
    {
        return ResponseEntity.ok().body(orgaorepo.findAll(Sort.by("nome")));  
    }

    @GetMapping("get-tipos")
    public ResponseEntity<Object> getTipos()
    {
        return ResponseEntity.ok().body(tiporepo.findAll(Sort.by("nome")));  
    }

    @GetMapping("get-denuncia/{id_usu}")
    public ResponseEntity<Object> getDenuncia(@PathVariable("id_usu") int id_usu)
    {   Usuario usuario=new Usuario();
        usuario.setId((long)id_usu);
        return ResponseEntity.ok().body(denunciarepo.findAllByUsuario(usuario));
    }

    @GetMapping("get-denuncia-id/{den_id}")
    public ResponseEntity<Object> getDenunciaId(@PathVariable("den_id") int den_id) {
        return ResponseEntity.ok().body(denunciarepo.findById((long)den_id));
    }

    @PostMapping("add-denuncia")
    public ResponseEntity <Object> addDenuncia(@RequestBody Denuncia denuncia) {
        denuncia.setTexto(new String(Base64.getDecoder().decode(denuncia.getTexto().getBytes())));
        return ResponseEntity.ok().body(denunciarepo.save(denuncia));
    }
}
