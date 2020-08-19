import React from "react";
import {Container, ImageCropped, Form, Titulo, SubTitulo, InputGroup, Button} from "./styles"
import foto from "../../assets/foto.jpg"

const Login = () =>{
    return(
        <Container>
            <ImageCropped>
                <img src={foto} alt="Foto"/>
            </ImageCropped>
            <Form>
                <Titulo>SENAI OVERFLOW</Titulo>
                <SubTitulo>Compartilhe suas dúvidas</SubTitulo>
                <InputGroup>
                    <label>E-mail</label>
                    <input type="email" placeholder="Insira seu email"></input>
                </InputGroup>
                <InputGroup>
                    <label>Senha</label>
                    <input type="password" placeholder="Insira sua Senha"></input>
                </InputGroup>
                <Button>
                    Entrar
                </Button>
                <Button>
                    Registrar
                </Button>
            </Form>
        </Container>
    )
}
export default Login;