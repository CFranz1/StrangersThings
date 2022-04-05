const APIURL = `https://strangers-things.herokuapp.com/api/2111-et-web-ft`;


export const fetchAllPosts = async (userToken) => {
  if (userToken === null){  
    try {
        const response = await fetch(`${APIURL}/posts`);
        const result = await response.json();
        if (result.error) throw result.error;
        return result.data.posts;
      } catch (err) {
        console.error('Uh oh, trouble fetching posts!', err);
      }}
      else{
        try{
          const response = await fetch(`${APIURL}/posts`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`
            }
          })
          const result = await response.json();
          return result;
        }
        catch (err) {
          console.log('Trouble creating post', err)
        }  
      }


};

export async function registerUser(user){
  try{
    const response = await fetch(`${APIURL}/users/register`,{
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user})
    })
    const result= await response.json();
    return result;
  }
  catch (err) {
    console.log('Trouble registering user', err)
  }   
}

export async function logInUser(user){
  try{
    const response = await fetch(`${APIURL}/users/login`,{
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user})
    })
    const result= await response.json();
    return result;
  }
  catch (err) {
    console.log('Trouble registering user', err)
  }   
}

export async function getUserInfo(userToken){
  try{
    const response = await fetch(`${APIURL}/users/me`,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}` 
      }
    })
    const result= await response.json();
    return result;
  }
  catch (err) {
    console.log('Trouble registering user', err)
  }  
}

export async function createPost(post, userToken){

  try{
    const response = await fetch(`${APIURL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({post})
    })
    const result = await response.json();
    return result;
  }
  catch (err) {
    console.log('Trouble creating post', err)
  }  
}
  
export async function deletePost(postId, userToken){

  try{
    const response = await fetch(`${APIURL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
    const result = await response.json();
    return result;
  }
  catch (err) {
    console.log('Trouble deleting post', err)
  }  
}

export async function submitMessage(postId, userToken, message){

  try{
    const response = await fetch(`${APIURL}/posts/${postId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({'message' :{ 'content': message}})
    })
    const result = await response.json();
    return result;
  }
  catch (err) {
    console.log('Trouble deleting post', err)
  }  
}

export async function editPost(post, userToken,postId){

  try{
    const response = await fetch(`${APIURL}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({post})
    })
    const result = await response.json();
    return result;
  }
  catch (err) {
    console.log('Trouble Editing post', err)
  }  
}