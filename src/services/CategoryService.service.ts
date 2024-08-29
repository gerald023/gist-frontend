import axios from "axios";
import { BASE_URL } from "../utils/baseURL";


// const BASE_URL = "http://localhost:4040/api/v1/category";


export class CategoryService{
    async createCategory(name: string, description: string, image: any){
        try{
            // const BASE_URL = "http://localhost:4040/api/v1/category/create-cate";
            // const newUrl = "http://localhost:4040/api/v1/user/create-cate"
            const response = await axios.post(`${BASE_URL}/api/v1/category/create-cate`, {
                name: name,
                description: description,
                image: image
            },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                }
            );
            console.log(response);
            console.log(response.data);
            return response;
           
        }catch(error){
            console.log(error);
        }
    }

    async getAllCategory(){
        try{
            const response = await axios.get(BASE_URL);
            return response;
        }catch(error){
            console.log("error: ", error);
        }
    }
} 