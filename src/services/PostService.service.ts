import axios from "axios";
// import { LikePostDTO } from "../schemas/likeSchema.schema";
import Cookies from 'js-cookie'

export interface postDTO{
    id: any | null | undefined;
    images: any;
    title: string
    content: string
    publish?: boolean
    author: any
    cateID: number
    image: any
}
export interface CreatePostDTO{
    images: any;
    title: string
    content: string
    category: number
    publish?: boolean
    author: any
    image: any
}
const BASE_URL = "http://localhost:4040/api/v1/post";
export class PostServices {
    async createPost(data: CreatePostDTO){
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

    async getLatestPost(){
        try{
            const response = await axios.get(`${BASE_URL}/latest-post`)
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async getPostByCategory(cateID: number){
        try{
            const response = await axios.get(`${BASE_URL}/category/${cateID}`)
            return response;
        }catch(error){
            console.log(error);
        }
    }

    async getPostById(postID: number){
        try{
            const response = await axios.get(`${BASE_URL}/one-post/${postID}`)
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async likePost(Id: number){
        try{
            const response = await axios.post(`http://localhost:4040/api/v1/like/like-post`,
            {
                postId: Id
            },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('jwt')}`,
                        'Content-Type': 'application/json',
                      },
                }
            )
            // console.log(response.headers)
            return response
        }catch(error){
            console.log(error)
        }
    }

    async getLikesForEachPost(id: number){
        try{
            const response = await axios.get(`http://localhost:4040/api/v1/like/get-likes/${id}`)
            return response;
        }catch(error){
            console.log(error)
        }
    }
    
    async getDisikesForEachPost(id: number){
        try{
            const response = await axios.get(`http://localhost:4040/api/v1/like/get-dislikes/${id}`)
return response;
        }catch(error){
            console.log(error)
        }
    }
}