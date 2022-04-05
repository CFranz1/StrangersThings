import { useHistory} from "react-router-dom"
import { createPost } from "./AjaxHelpers"

export let NewPostForm = (props) => {
    let {userToken, isLoggedIn } = props;   
    let history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        let post = {}
        post['title'] = document.getElementById('Title').value;
        post['description'] = document.getElementById('Description').value;
        post['location']= document.getElementById('Location').value;
        post['price'] = document.getElementById('Price').value;
        post['willDeliver'] = document.getElementById('WillingToDeliver').checked;
        let response = await createPost(post,userToken);
        if (response.success ===true)
        {
            alert('Post added successfully')
            history.push('/Home')
        }
        else
        {
            alert(response.error.message)
        }

    }       
     
    if (!isLoggedIn)
        return(
            <div>
                <h1>Please login or Register to make a post</h1>
            </div>
        )

    

    return (
        <div id='AddNewPost'>
            <h1>Add New Post</h1>
            <form>                
                <input type='text' id='Title' placeholder="Title" className='newPost'></input>
                <textarea rows="5" cols="60" placeholder="Description" id='Description' className='newPost'></textarea>
                <input type='text' placeholder="Price" id='Price' className='newPost'></input>
                <input type='text' placeholder="Location" id='Location' className='newPost'></input>
                <div>
                <input type='checkbox' id="WillingToDeliver"></input>
                <label>Willing to Deliver?</label>
                </div>
                <button onClick={handleSubmit} type='submit' >Submit</button>
            </form>
        </div>
    )
}

