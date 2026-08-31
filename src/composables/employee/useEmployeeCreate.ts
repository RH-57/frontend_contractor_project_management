import { useMutation } from "@tanstack/vue-query";
import Api from "../../services/api";
import Cookies from "js-cookie";


interface EmployeeRequest {
    name: string;
    position: string;
    type: string;
    phone: string;
    address: string;
    daily_rate: number;
}

export const useEmployeeCreate = () => {
    return useMutation({
        mutationFn: async (data: EmployeeRequest) => {
            const token = Cookies.get('token')
            const response = await Api.post('/api/employees', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return response.data
        }
    })
}