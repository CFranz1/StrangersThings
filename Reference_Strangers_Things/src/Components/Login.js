import {Link, useHistory} from "react-router-dom"
import { logInUser } from "./AjaxHelpers"

export let LogInPage = (props) => {

    let setUserToken = props.setUserToken;
    let setUserInfo = props.setUserInfo;
    let setIsLoggedIn = props.setIsLoggedIn;
    let history = useHistory();


    async function handleSubmit(e){
        e.preventDefault();

        let user ={};
        user['username'] = document.getElementById('User-Name').value
        user['password'] = document.getElementById('Password').value
        
        
        if (!user.password || !user.username)
            return alert('Password and Username must be submitted!');
        let response = await logInUser(user);

        if (response.success === true)
        {
            setUserToken(response.data.token);
            setUserInfo(user);
            alert(response.data.message);
            setIsLoggedIn(true);
            history.push('/Home')
            return
        }
        else
        {
            alert(response.error.message);
            return
            
        }}
        
        
        
    return (
        <div id='Login-Container'>
            <h1>Log In</h1>
            <form>
                <div id='User-Name-Line'>
                    <input type='text' id='User-Name' placeholder="Username"></input>
                </div>
                <div id='PW-Line'>
                    <input type='password' placeholder="Password" id='Password'></input>
                </div>
                <button onClick={handleSubmit} type='submit' >Submit</button>
            </form>
            <Link to="/Register">Don't Have an account? Sign Up</Link>
        </div>
    )
}




