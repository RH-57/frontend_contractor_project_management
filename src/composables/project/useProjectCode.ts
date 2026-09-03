import { useQuery } from "@tanstack/vue-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

export const useProjectCode = () => {
  return useQuery({
    queryKey: ["nextProjectCode"],
    queryFn: async (): Promise<string> => {
      const token = Cookies.get("token");
      const response = await Api.get("/api/projects/generate-code", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.code;
    },
  });
};