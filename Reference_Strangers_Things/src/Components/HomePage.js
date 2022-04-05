import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom"
import {fetchAllPosts, getUserInfo} from "./AjaxHelpers"

export let HomePage = (props) => {
    let setPosts= props.setPosts;
    let setMessages= props.setMessages;
    let userInfo= props.userInfo;
    let userToken=props.userToken;
    let messages=props.messages;
    let setPostOfInterest=props.setPostOfInterest;
    let postsList = props.postsList;
    let history = useHistory();
    
    

    useEffect(() => {
        const fetchData = async () =>{
            const response1 = await getUserInfo(userToken);
            const response2 = await fetchAllPosts(userToken);
            setPosts(response2.data.posts);
            setMessages(response1.data.messages);
        }
        fetchData();
    }, [])

    
    let messagesToMe=[];
    let messagesFromMe=[];

    
    messages.forEach((message)=>{
        if (message.fromUser.username === userInfo.username)
            messagesFromMe.push(message);
        else 
            messagesToMe.push(message);
    })

    function handleViewPost(e){
        e.preventDefault();
        let isPostValid= false;
        postsList.forEach((post)=>{            
             if(post._id === e.target.id){
                setPostOfInterest(post);
                isPostValid=true;
                 history.push('/Post');
            }
        })
        if (!isPostValid)
            alert('that post has been deleted')
    }

    function handleMessageAgain(e){
        e.preventDefault();
        
        postsList.forEach((post)=>{
             if(post._id === e.target.id){
                setPostOfInterest(post)
                history.push('/Post/Message')
             }
            })
        
    }

    return(
        <div id='HomePage-Container'>
            <h1>Welcome {userInfo.username} </h1>      
            <h2>Messages to Me:</h2>
            {messagesToMe.map((message, index) => {
                return(
                    <div key={index} className='Single-Message'>
                        <p>From : {message.fromUser.username}</p>
                        <p>Message : {message.content}</p>
                        <p>Post : {message.post.title}</p>
                        {/* id of button is the id of the post the message is attached too */}
                        <button onClick={handleViewPost} id={message.post._id}>view post</button>                        
                    </div>
                )               
            })}
            <h2>Messages from Me:</h2>
            {messagesFromMe.map((message,index) => {
                return(
                    <div key={index} className='Single-Message'>
                        <p>From : {message.fromUser.username}</p>
                        <p>Message : {message.content}</p>
                        <p>Post : {message.post.title}</p>
                        <button onClick={handleMessageAgain} id={message.post._id}>Message Again</button>                       
                    </div>
                )               
            })}
        </div>
    )
}