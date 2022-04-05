import {Link, useHistory} from "react-router-dom"
import { registerUser } from "./AjaxHelpers"

export let Register = (props) => {
    let setUserToken = props.setUserToken;
    let setUserInfo = props.setUserInfo;
    let setIsLoggedIn = props.setIsLoggedIn;
    let history = useHistory();    


    async function handleSubmit(e){
        e.preventDefault();     
        
        let user={};
        let username = document.getElementById('User-Name').value;
        let password = document.getElementById('Password').value;
        let passwordConfirm = document.getElementById('PasswordConfirm').value;

        if (!password || !username)
            return alert('Password and Username must be submitted!')
        if (password != passwordConfirm)
            return alert('Password must match Password Confirmation!')
        
        user['username']=username;
        user['password']=password;        
        let response = await registerUser(user);
        if (response.success === true)
        {
            alert(`Your account has been created sucessfully welcome to Stranger's Things ${username}`)
            setUserToken(response.data.token);
            setUserInfo(user);
            setIsLoggedIn(true);
            history.push('/Home');            
        }
        else if (response.error.name === 'UserExists')
        {
            alert(response.error.message);
            history.push('/Login');
        }
        else
        {            
            return alert(response.error.message);            
        }
        
        }
    
    return (
        <div id='Login-Container'>
            <h1>Register a New Account</h1>
            <form>
                <div id='User-Name-Line'>
                    <input type='text' id='User-Name' placeholder="Username"></input>
                </div>
                <div id='PW-Line'>
                    <input type='password' placeholder="Password" id='Password'></input>
                </div>
                <div id='PW-Line'>
                    <input type='password' placeholder="Password Confirmation" id='PasswordConfirm'></input>
                </div>
                <button onClick={handleSubmit} type='submit' >Submit</button>
            </form>
            <Link to="Login">Already have an account?</Link>
        </div>
    )
}