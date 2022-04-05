import React, { useState, useEffect } from "react";
import {Link , useHistory} from "react-router-dom";
import { fetchAllPosts, deletePost, submitMessage, editPost } from "./AjaxHelpers";


export let RenderPosts =  (props) =>{
    let isLoggedIn = props.isLoggedIn;
    let setPosts = props.setPosts;
    let postsList = props.postsList;
    let userToken = props.userToken;
    let setPostOfInterest= props.setPostOfInterest;
    let history = useHistory();

   
    const [searchTerm, setSearchTerm] = useState('');


    const fetchData = async (userToken) =>{
        const response = await fetchAllPosts(userToken);
        setPosts(response.data.posts);
    }  

    useEffect(()=>{
        if (!isLoggedIn){
            fetchData();
        } else{
            fetchData(userToken);
        }
    }, [])

    function handleSubmit(e){
        e.preventDefault();
        setPostOfInterest(postsList[e.target.id])
        history.push('/Post')
    }    

    function postMatches(post, text) {
        if (post.title.includes(text) || post.description.includes(text) || post.price.includes(text) || post.location.includes(text) || post.author.username.includes(text))
            return true
        return false
      }
      
      const filteredPosts = postsList.filter(post => postMatches(post, searchTerm));
      const postsToDisplay = searchTerm.length ? filteredPosts : postsList;


    return ( 
        <div id="Posts-Container">
            <h1>Posts</h1>
            <div className="Search-Container">
                <label>Search : </label>
                <input id="keywords" type="text" placeholder="enter keywords..." onChange={(evt) => setSearchTerm(evt.target.value)}/>
            </div>
            {isLoggedIn ? <Link to='/Posts/Add'>ADD POST</Link> : null}
            {postsToDisplay.map((element, index) =>{
                return(
                <div key={index} className="Single-Post">            
                    <h1 className="Title">{element.title}</h1>
                    <p  className="Description">{element.description}</p>
                    <p  className="Price">{element.price}</p>
                    <p  className="location">{element.location}</p>
                    {element.willDeliver ? <p>They will Deliver</p> : <p>They wont deliver</p>}
                    <p  className="Author">{element.author.username}</p>
                    {isLoggedIn ? <><button onClick={handleSubmit} id={index}>View Post</button></> : null}
                </div>
            )})}

        </div>
    )
}


export let RenderPost =  (props) =>{
    let isLoggedIn=props.isLoggedIn;
    if(!isLoggedIn){
        return (
            <h1>Please Log in to view, edit, message, and delete Posts</h1>
        )
    }
    let postOfInterest=props.postOfInterest;
    let userToken=props.userToken;
    let messages = props.messages;
    let history = useHistory();

    async function  handleDelete(e){
        e.preventDefault();
        await deletePost(postOfInterest._id,userToken);   
        history.push('/Posts');
    }

    function handleMessage(e){
        e.preventDefault()
        history.push('/Post/Message')
    };

    function startEdit(e){
        e.preventDefault();
        history.push('/Post/Edit')
    };

    
    return(
        <div id="Posts-Container">
        <div className='Single-Post'>
                <h1 className="Title">{postOfInterest.title}</h1>
                <p  className="Description">Description : {postOfInterest.description}</p>
                <p  className="Price">Price : {postOfInterest.price}</p>
                <p  className="location">Location : {postOfInterest.location}</p>
                {postOfInterest.willDeliver ? <p>They will Deliver</p> : <p>They wont Deliver</p>}
                <p className='author'>Poster : {postOfInterest.author.username}</p>
                {postOfInterest.isAuthor ? <div className="Button-Container"><button onClick={handleDelete}>Delete</button> <button onClick={startEdit}>Edit Post</button></div> : <><p>{postOfInterest.author.username}</p> <button onClick={handleMessage}>message</button></> }
       </div>
        <h1>
            messages
        </h1>        
        {messages.map((message,index) => {
                if (postOfInterest._id === message.post._id)
                    return(
                        <div key={index} className='Single-Message'>
                            <p>From : {message.fromUser.username}</p>
                            <p>Message : {message.content}</p>
                            <p>Post : {message.post.title}</p>                      
                        </div>
                    )               
            })}
        </div>
    )
}


export let EditPost =  (props) =>{
    let userToken = props.userToken;
    let postOfInterest= props.postOfInterest;
    let history = useHistory();


    async function handleEdit(e){
        e.preventDefault();
        let updates={};
        let title = document.getElementById('updatedTitle').value;
        let description = document.getElementById('updatedDescription').value;
        let price = document.getElementById('updatedPrice').value;
        let willDeliver = document.getElementById('UpdatedWillingToDeliver').checked;

        if (!willDeliver)
            willDeliver='false'

        if (title)
            updates['title'] = title;
        if (description)
            updates['description'] = description;
        if (price)
            updates['price'] = price;
        updates['willDeliver'] = willDeliver;
        let response = await editPost(updates,userToken,postOfInterest._id)
        if (response.success === true)
            alert("post updated")
        else
            alert("post failed to update")

        history.push('/Posts')        
    }

    return(
        <div id='Posts-Container'>
        <div className='Single-Post'>
                <h1 className="Title">{postOfInterest.title}</h1>
                <p  className="Description">Description : {postOfInterest.description}</p>
                <p  className="Price">Price : {postOfInterest.price}</p>
                <p  className="location">Location : {postOfInterest.location}</p>
                {postOfInterest.willDeliver ? <p>They will Deliver</p> : <p>They wont Deliver</p>}
                <p className='author'>Poster : {postOfInterest.author.username}</p>                
        </div>            
            <div className='UpdatingContainer' >
                <h1>What needs to be updated</h1>
                <form>                
                <input type='text' id='updatedTitle' placeholder="Title" class='newPost'></input>
                <textarea rows="5" cols="60" placeholder="Description" id='updatedDescription' class='newPost'></textarea>
                <input type='text' placeholder="Price" id='updatedPrice' class='newPost'></input>
                <input type='text' placeholder="Location" id='updatedLocation' class='newPost'></input>
                <div>
                <input type='checkbox' id="UpdatedWillingToDeliver"></input>
                <label>Willing to Deliver?</label>
                </div>
                <button onClick={handleEdit} type='submit' >Submit</button>
            </form>
            </div>
        </div>
    )

}

export let MessageForm =  (props) =>{

    let isLoggedIn=props.isLoggedIn;
    if(!isLoggedIn){
        return (
            <h1>Please Log in to view, edit, message, and delete Posts</h1>
        )
    }
    let postOfInterest=props.postOfInterest;
    let userToken=props.userToken;
    
    let history = useHistory();

    async function handleSubmit(e)
    {
        e.preventDefault();
        let message = document.getElementById('Message').value;
        let response = await submitMessage(postOfInterest._id,userToken,message);
        if(response.success === true)
        {
            alert('Message Sent');
        }else{
            alert('Message error');
            console.log(response);
        }
        history.push('/Posts')
    }


    return(
        <div className='Message-Form'>
            <div className='Single-Post'>
            <h1>Post</h1>
                <h1 className="Title">{postOfInterest.title}</h1>
                <p  className="Description">{postOfInterest.description}</p>
                <p  className="Price">{postOfInterest.price}</p>
                <p  className="location">{postOfInterest.location}</p>
                <p  className="willDeliver">{postOfInterest.willDeliver}</p>
            </div>
            <h1>What Would you Like to ask {postOfInterest.author.username}?</h1>
            <form>
            <input type='text' placeholder="message" id='Message' class='newPost'></input>
            <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )

}