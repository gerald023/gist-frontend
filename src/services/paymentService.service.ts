import axios from "axios"

export interface paymentDTO{
    amount: number,
    user_id: number,
    description: string,
    email: string
}
const BASE_URL = 'http://localhost:4040/api/v1/payments'
export class PaymentService{
    async makePayment(data: paymentDTO){
        try{
            const response = await axios.post(BASE_URL, data)
            return response;
        }catch(error){
            console.log(error);
        }
    }
}