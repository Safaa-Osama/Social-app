import axios from "axios";

export async function ChangePasswordApi(){
const data = await axios.patch('https://linked-posts.routemisr.com/users/change-password',)
}


export async function GetUserPostApi(){
    try{
        const headers = { token: userToken }
        const {data} = await axios.post('https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?limit=3'
            ,  { headers}

        );
        return data;
    }
      catch (err) {
        console.log(err.response.data);
        return err.response.data;
    }
}