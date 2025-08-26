import axios from "axios";



export async function createCommentApi(content, post, userToken) {
    try {
        const headers = { token: userToken }

        const { data } = await axios.post('https://linked-posts.routemisr.com/comments',
            { content, post },
            { headers })


        if (data.message == 'success') {
            return data.comments[0];
        }
    }

    catch (error) {
        return error.response.data
    }


}

export async function getPostCommentsApi(postId) {
    try {
        const headers = { token: userToken }
        const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`,
            { headers })

        if (data.message == 'success') {
            return data.comments;
        }
    }

    catch (error) {
        return error.response.data
    }


}

export async function updateCommentsApi(content, commenttId, userToken) {
    try {
        const headers = { token: userToken }
        const { data } = await axios.put(`https://linked-posts.routemisr.com/comments/${commenttId}` , content, 
            {headers})
        if (data.message == 'success') {
            return data.comments;
        }
    }

    catch (error) {
        return error.response.data
    }


}

export async function deleteCommentsApi(commenttId,userToken) {
    try {
        const headers = { token: userToken }
        const { data } = await axios.delete(`https://linked-posts.routemisr.com/comments/` + commenttId,
            { headers })

        if (data.message == 'success') {
            return data;
        }
    }

    catch (error) {
        return error.response.data
    }


}