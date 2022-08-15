import styled from 'styled-components'

const Form = styled.form`
    width: 480px;
    height: 555px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff39;
    
`;

const TitleHello = styled.h2`
    color: white;
    padding-right: 10px;
    font-weight: bold;
    font-family: sans-serif;
`

const TitleBiker = styled.h2`
    color: red;
    font-weight: bold;
    font-family: sans-serif;
`

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 10px;
    
`
const InputSignupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`
    
const InputLogin = styled.input`
    font-size: 20px;
    width: 370px;
    height: 55px;
    padding: 5px;
    border-radius: 8px;
    border: none;  
    background-color: white;
`;

const H4Signup = styled.h4`
    color: white;
    font-weight: 100;
    font-style: italic;
    padding-bottom: 2px;
    margin-bottom:2px;
    margin-top: 20px
`

const Button = styled.button`
    border-radius: 8px;
    
    font-size: 30px;
    font-weight: bold;
    font-family: sans-serif;
    color: red;
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;      
    text-shadow: 0px 4px 3px #463e3e,
             0px 8px 13px #cacaca18,
             0px 18px 23px #b9b9b91d;
    padding-top: 25px;
    `;

function SignupForm() {
    return (
        <Form>
            <TitleWrapper>
            <TitleHello> Hello </TitleHello> <TitleBiker> Biker</TitleBiker>
            </TitleWrapper>
            
            <InputSignupWrapper>
            < H4Signup>Username</ H4Signup>
            <InputLogin type="email" />

            < H4Signup>Email</ H4Signup>
            <InputLogin type="email" />
           
            < H4Signup>Password</ H4Signup>
            <InputLogin type="password" />

            < H4Signup>Confirm Password</ H4Signup>
            <InputLogin type="password" />
            </InputSignupWrapper>
            
            <Button>Confirm</Button>
        </Form>
    )
}

export default SignupForm;