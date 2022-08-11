import styled from 'styled-components'

const Form = styled.form`
    padding: auto;
    border-radius: 5px;
    `;

const InputLogin = styled.input`
    font-size: 20px;
    padding: auto;
    margin:  auto;
    border-radius: 8px;
    `;

const Button = styled.button`
    border-raius: 8px;
    background-color: red;
    padding: center;
    `;

function ExampleForm() {
    return (
        <Form>
            <h2> Welcome Back Biker</h2>
            <InputLogin placeholder="username" type="email" />
            <br />
            <InputLogin placeholder="password" type="password" />
            <br />
            <Button>Log In</Button>
        </Form>
    )
}

export default ExampleForm;

