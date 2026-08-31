import { useQuery } from "@tanstack/vue-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export interface Employee {
    id: number;
    code: string;
    name: string;
    position: string;
    type: string;
    phone: string;
    address: string;
    daily_rate: number;
    is_active: boolean;
}

export const useEmployee = () => {
    return useQuery<Employee[], Error>({
        queryKey: ['employees'],
        queryFn: async () => {
            const token = Cookies.get('token')
            const response = await Api.get('/api/employees', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return response.data.data as Employee[]
        }
    })
}