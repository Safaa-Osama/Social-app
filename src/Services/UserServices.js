import axios from "axios";

export async function ChangePasswordApi(){
const data = await axios.patch('https://linked-posts.routemisr.com/users/change-password',)
}


export async function getUserPostsApi(){
    try{
        const headers = { token: userToken }
        const {data} = await axios.get('https://linked-posts.routemisr.com/users/users/profile-data '
            ,  { headers}

        );
        return data;
    }
      catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}