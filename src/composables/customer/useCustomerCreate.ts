import { useMutation } from "@tanstack/vue-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export interface CustomerRequest {
     name: string;
    type: string;
    phone: string;
    email: string;
    npwp: string;
    address: string;
}

export const useCustomerCreate = () => {
    return useMutation({
        mutationFn: async (data: CustomerRequest) => {
            const token = Cookies.get('token')
            const response = await Api.post('/api/customers', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return response.data
        }
    })
}