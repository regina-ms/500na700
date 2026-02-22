import mockNewsList from "@/mock.json";
import { NewsItem } from "@/types";

export async function getParams() {
    const data: NewsItem[] = [...mockNewsList];
    return data.map((item) => {
        return { newsId: `${item.id}` };
    });
}