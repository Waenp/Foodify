package org.example;

import io.javalin.Javalin;
public class Test {
    public static void main(String[] args) {
        Javalin javalin1 = Javalin.create(config -> {})
                .get("/", ctx ->{
                    ctx.result("Hello World");
                })
                .start(5007);




    }
}
