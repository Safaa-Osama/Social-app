import axios from "axios";

const headers = { token: localStorage.getItem('token') }

export async function getAllPostsApi() {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts?limit=10',
            { headers }
        )
        return data;
    }
    catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}

export async function getSinglePostsApi(postId) {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts/' + postId,
            { headers }
        )
        return data;
    }
    catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}