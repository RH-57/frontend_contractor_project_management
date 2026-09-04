import { useQuery } from "@tanstack/vue-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export interface Customer {
    id: number;
    name: string;
    email?: string;
    phone?: string;
}

export interface Employee {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

// Interface utama sesuai ProjectResponse struct
export interface Project {
    id: number;
    code: string;
    name: string;
    customer_id: number;
    customer?: Customer;
    employee_id: number;
    employee?: Employee;
    contract_value: number;
    estimated_cost: number;
    status: string;
    address: string;
    description: string;
    start_date: string;
    end_date: string;
    created_by_id?: number;
    created_by?: User;
    created_at: string;
    updated_at: string;
    // Properti tambahan (opsional) jika ada kalkulasi progress dari backend
    progress_percentage?: number; 
}

export const useProjectById = (id: number) => {
    return useQuery<Project, Error>({
        queryKey: ['projects', id],
        queryFn: async () => {
            const token = Cookies.get('token')
            const response = await Api.get(`/api/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data.data as Project
        }
    })
}