package org.example;

import io.javalin.Javalin;
import io.javalin.http.HttpStatus;

import java.io.IOException;
import java.net.ServerSocket;

public class Server {
    private Javalin javalin;
    private ServerSocket serverSocket;


    public Server(){
        javalin = Javalin.create(javalinConfig -> {})
                .get("/", ctx ->{
                    ctx.result("Hello World");
                    ctx.status(HttpStatus.OK);

                })
                .start(5007);
    }
}
