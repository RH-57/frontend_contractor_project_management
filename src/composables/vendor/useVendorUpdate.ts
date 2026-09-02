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
    payment_terms: number;
    is_active: boolean;
}

export const useVendorUpdate = () => {
    return useMutation({
        mutationFn: async ({id, data}: {id: Number, data: VendorRequest}) => {
            const token = Cookies.get('token')
            const response = await Api.put(`/api/vendors/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data
        }
    })
}