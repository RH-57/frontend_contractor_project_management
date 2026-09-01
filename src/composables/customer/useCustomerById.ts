import { useQuery } from "@tanstack/vue-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export interface Customer {
    id: number;
    code: string;
    name: string;
    type: string;
    phone: string;
    email: string;
    npwp: string;
    address: string;
    is_active: boolean;
}

export const useCustomerById = (id: number) => {
    return useQuery<Customer, Error>({
        queryKey: ['customer', id],
        queryFn: async () => {
            const token = Cookies.get('token')
            const response = await Api.get(`/api/customers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return response.data.data as Customer
        }
    })
}