import axios from "axios";
export interface postDTO{
    id: any | null | undefined;
    images: any;
    title: string
    content: string
    publish?: boolean
    author: any
    cateID: any
    image: any
}
const BASE_URL = "http://localhost:4040/api/v1/post";
export class PostServices {
    async createPost(data: postDTO){
        try{
           

            const response = await axios.post(`${BASE_URL}/make-post`, data,
                {
                    headers: {
                        Authorization: `Bearer ${data.author}`,
                        'Content-Type': 'multipart/form-data',
                      },
                }
            );
            // console.log(response);
            // console.log(response.data);
            return response.data;
           
        }catch(error){
            console.log(error);
        } 
    }

    async getAllPost(){
        try{
            const response = await axios.get(`${BASE_URL}/all-posts`);
            return response;
        }catch(error){
            console.log(error)
        }
    }
}