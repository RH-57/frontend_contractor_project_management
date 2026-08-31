import { useMutation } from "@tanstack/vue-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export interface EmployeeRequest {
    name: string;
    position: string;
    type: string;
    phone: string;
    address: string;
    daily_rate: number;
    is_active: boolean;
}

export const useEmployeeUpdate = () => {
    return useMutation({
        mutationFn: async ({id, data}: {id: number, data: EmployeeRequest}) => {
            const token = Cookies.get('token')
            const response = await Api.put(`/api/employees/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return response.data
        }
    })
}