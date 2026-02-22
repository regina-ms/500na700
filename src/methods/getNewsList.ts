import { GetNewsResponse } from "@/app/api/news/route";

export const getNewsList = async (page?: number): Promise<GetNewsResponse> => {
  const queryParams = page ? `?page=${page}` : "";
  const response = await fetch(`api/news${queryParams}`, { method: "GET" });
  return response.json();
};
