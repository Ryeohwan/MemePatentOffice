package com.memepatentoffice.auction.domain.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auction")
public class TestController {

    @GetMapping("")
    public String nginxTest() {
        return "<h1>Auction Server Nginx Test succeed</h1>";
    }

    @GetMapping("/test")
    public String test() {
        return "<h1>Hello World This is a Jenkins Test</h1>";
    }
}
