import { useMutation } from "@tanstack/vue-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export const useEmployeeDelete = () => {
    return useMutation({
        mutationFn: async (id: number) => {
            const token = Cookies.get('token')
            const response = await Api.delete(`/api/employees/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return response.data
        }
    })
}