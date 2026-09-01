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
    is_active: boolean;
}

export const useCustomerUpdate = () => {
    return useMutation({
        mutationFn: async ({id, data}: {id: Number, data: CustomerRequest}) => {
            const token = Cookies.get('token')
            const response = await Api.put(`/api/customers/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        }
    })
}