import axios from "axios";

const headers = { token: localStorage.getItem('token') }


export async function createCommentApi(content, post){
    try{
        const {data} = await axios.post('https://linked-posts.routemisr.com/comments' ,
             {content , post},
              {    headers  })
  

    if (data.message == 'success'){
return data.comments[0];
    }
}

    catch(error){
    return error.response.data
    }
    

}

export async function getPostCommentsApi(postId){
    try{
        const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments` ,
              {    headers  })

    if (data.message == 'success'){
return data.comments;
    }
}

    catch(error){
    return error.response.data
    }
    

}