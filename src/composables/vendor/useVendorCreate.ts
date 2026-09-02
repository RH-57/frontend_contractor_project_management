import { useMutation } from "@tanstack/vue-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export interface VendorRequest {
    name: string;
    type: string;
    phone: string;
    email: string;
    npwp: string;
    address: string;
    note: string;
    payment_terms: string;
}

export const useVendorCreate = () => {
    return useMutation({
        mutationFn: async (data: VendorRequest) => {
            const token = Cookies.get('token')
            const response = await Api.post('/api/vendors', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return response.data
        }
    })
}