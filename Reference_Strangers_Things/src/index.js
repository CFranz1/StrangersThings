import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import{Header , LogInPage, RenderPosts, Register, HomePage, NewPostForm, MessageForm, RenderPost, EditPost} from './Components/index.js'




function App(){

    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[userInfo, setUserInfo] = useState({username: "" , password: ""});
    const[userToken, setUserToken] = useState('');
    const[postsList, setPosts] = useState([]);
    const[messages, setMessages] = useState([]);
    const[postOfInterest, setPostOfInterest] = useState([]); 


    return (
    <div className='app'>
        <Router>
            <Header 
            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
            setUserInfo={setUserInfo} setUserToken={setUserToken}
            />        
            <Switch>
                <Route exact path='/Posts/Add'>
                    <NewPostForm 
                        isLoggedIn={isLoggedIn}
                        userToken={userToken}/>                    
                </Route>
                <Route exact path='/Login' >
                    <LogInPage 
                    isLoggedIn={isLoggedIn} 
                    setIsLoggedIn={setIsLoggedIn}
                    setUserInfo={setUserInfo}
                    setUserToken={setUserToken}/>
                </Route>
                <Route exact path='/Post/Edit'>
                    <EditPost
                    postOfInterest={postOfInterest} userToken={userToken}

                    />
                </Route>
                <Route exact path='/Post/Message'>
                    <MessageForm
                    postOfInterest={postOfInterest} isLoggedIn={isLoggedIn}
                    userToken={userToken}
                    />                    
                </Route>
                <Route exact path='/Post'>
                    <RenderPost
                    postOfInterest={postOfInterest} isLoggedIn={isLoggedIn}
                    userToken={userToken} messages={messages} setMessages={setMessages}
                    />
                </Route>
                <Route exact path='/Posts'>
                    <RenderPosts
                    setPostOfInterest={setPostOfInterest}
                    setPosts={setPosts} postsList={postsList}
                    userToken={userToken} isLoggedIn={isLoggedIn}/>            
                </Route>
                <Route exact path='/Register'>
                    <Register  
                        setUserToken={setUserToken} setUserInfo={setUserInfo} 
                        setIsLoggedIn={setIsLoggedIn}>
                    </Register></Route>
                <Route path="/Home">
                    <>
                    {isLoggedIn ? 
                    <HomePage
                        setPosts={setPosts} setPostOfInterest={setPostOfInterest}
                        messages={messages} setMessages={setMessages}
                        userInfo={userInfo} postsList={postsList}
                        userToken={userToken}
                    ></HomePage>
                     : <h1 id='HomePage-Container'>Welcome to Stranger's Things</h1>}
                    </> 
                </Route>
            </Switch>
        </Router>
    </div>
    
   )
}
const app = document.getElementById('app')
ReactDOM.render(<App />, app)