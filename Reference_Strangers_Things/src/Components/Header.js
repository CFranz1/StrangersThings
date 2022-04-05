import { useHistory} from "react-router-dom"
import {Link} from "react-router-dom"

export let Header = (props) => {
    // const {setIsLoggedIn, setUserInfo,setUserToken} = props;
    // let {isLoggedIn} = props;

    let setIsLoggedIn= props.setIsLoggedIn;
    let setUserInfo=props.setUserInfo;
    let setUserToken=props.setUserToken;
    let isLoggedIn=props.isLoggedIn;
    let history = useHistory(); 


    function Logout(e){
        e.preventDefault();
        setIsLoggedIn(false);
        setUserInfo({username:'' , password: ''});
        setUserToken('');
        history.push('/Home');
    }

    return(
        <div id='Header-Container'>
            <h1 id='Logo'>Stranger's Things</h1>
            <div id='Tag-Links'>                
                <Link to='/Home'>Home</Link>
                <Link to='/Posts'>Posts</Link>
                { isLoggedIn ? <Link to='Posts' onClick={Logout}>Logout</Link>:<Link to='/Login'>Login</Link>}
                { isLoggedIn ? null : <Link to="/Register">Register</Link> }                
            </div>
        </div>
    )
}