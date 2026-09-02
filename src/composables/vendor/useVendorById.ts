import { useQuery } from "@tanstack/vue-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export interface Vendor {
    id: number;
    code: string;
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

export const useVendorbyId = (id: number) => {
    return useQuery<Vendor, Error>({
        queryKey: ['customer', id],
        queryFn: async () => {
            const token = Cookies.get('token')
            const response = await Api.get(`/api/vendors/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data.data as Vendor
        }
    })
}