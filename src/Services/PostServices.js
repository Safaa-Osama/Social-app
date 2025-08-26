import axios from "axios";



export async function getAllPostsApi(userToken) {
    
    try {
        const headers = { token: userToken }
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts?sort=-createdAt',
            { headers}
        )
  
        return data;
    }
    catch (err) {
        return err.response.data;
    }
}

export async function getSinglePostsApi(postId,userToken) {
    try {
        const headers = { token: userToken }
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts/' + postId,
            { headers}
        )
        return data;
    }
    catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}

export async function createPostApi(formData,userToken){
    try{
        const headers = { token: userToken }
        const {data} = await axios.post('https://linked-posts.routemisr.com/posts', formData
            ,  { headers}

        );
        return data;
    }
      catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}


export async function updatePostApi(postId,formData,userToken){
    try{
        const headers = { token: userToken }
        const {data} = await axios.put(`https://linked-posts.routemisr.com/posts/${postId}`, formData
            ,  { headers}

        );

        return data;
    }
      catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}


export async function deletePostApi(postId,userToken){
    try{
        const headers = { token: userToken }
        const {data} = await axios.delete('https://linked-posts.routemisr.com/posts/'+postId
            ,  { headers}

        );
        return data;
    }
      catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}