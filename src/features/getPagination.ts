import { NewsItem } from "@/types";

export function getPagination(
  data: NewsItem[],
  page: number,
  perPage: number = 6,
) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedData = data.slice(start, end);
  const pagesLeft = Math.trunc(data.length / (perPage * page));

  return { paginatedData, pagesLeft };
}
