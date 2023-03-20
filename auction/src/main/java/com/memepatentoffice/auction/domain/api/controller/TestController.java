package com.memepatentoffice.auction.domain.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "<h1>Hello World This is a Jenkins Test</h1>";
    }
}
