import { render } from 'react-dom'
import styled from 'styled-components'

const LoginForm = styled.form`
    background-color: white;
    padding: auto;
    border-radius: 8px;
    `;

const InputLogin = styled.input`
    font-size: 20px;
    padding: auto;
    margin:  auto;
    border-radius: 8px;
    `;

const Button = styled.button`
    border-raius: 8px;
    color: red;
    padding: center;
    `;

function ExampleForm() {
    return (
        <LoginForm>
            <InputLogin placeholder="username" type="email" />
            <br />
            <InputLogin placeholder="password" type="password" />
            <br />
            <Button>Sign In</Button>
        </LoginForm>
    )
}


