import axios from "axios"


export async function sendData(userData) {
    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', userData);
        return data.message;
    }
    catch (errors) {
        console.log(errors.response.data.error)
        return errors.response.data.error
    }
}

export async function sendSignInData(userData) {
    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/users/signin', userData);
        return data
    }
    catch (errors) {
        console.log(errors.response.data.error)
        return errors.response.data;
    }
}
