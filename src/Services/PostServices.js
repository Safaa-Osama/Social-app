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
        const {data} = await axios.post('https://linked-posts.routemisr.com/posts?', formData
            ,  { headers}

        );
        console.log(data)
        return data;
    }
      catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}


export async function UpdatePostApi(formData,userToken){
    try{
        const headers = { token: userToken }
        const {data} = await axios.put('https://linked-posts.routemisr.com/posts/66875b3b006c4ff191a61a89', formData
            ,  { headers}

        );
        console.log(data)
        return data;
    }
      catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}


export async function deletePostApi(userToken){
    try{
        const headers = { token: userToken }
        const {data} = await axios.delete('https://linked-posts.routemisr.com/posts'+postId
            ,  { headers}

        );
        console.log(data)
        return data;
    }
      catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}