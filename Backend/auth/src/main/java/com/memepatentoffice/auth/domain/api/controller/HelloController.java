package com.memepatentoffice.auth.domain.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class HelloController {

    @GetMapping("/test")
    public String check() {
        return "<h1>Hello Auth Server Main Page</h1>";
    }
}
