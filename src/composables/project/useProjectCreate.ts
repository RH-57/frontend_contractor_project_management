import { useMutation } from "@tanstack/vue-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export interface ProjectRequest {
    name: string;
    customer_id: number;
    contract_value: number;
    estimated_cost: number;
    employee_id: number | null;
    status: string;
    address: string;
    description: string;
    start_date: string;
    end_date: string;
}

export const useProjectCreate = () => {
    return useMutation({
        mutationFn: async (data: ProjectRequest) => {
            const token = Cookies.get('token')
            const response = await Api.post('/api/projects', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return response.data
        }
    })
}