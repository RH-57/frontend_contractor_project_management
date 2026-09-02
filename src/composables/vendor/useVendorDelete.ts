import { useMutation } from "@tanstack/vue-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export const useVendorDelete = () => {
    return useMutation({
        mutationFn: async (id: number) => {
            const token = Cookies.get('token')
            const response = await Api.delete(`/api/vendors/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return response.data
        }
    })
}