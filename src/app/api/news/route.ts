import { NEWS_PER_PAGE } from "@/constants";
import { getPagination } from "@/features/getPagination";
import mockNewsList from "@/mock.json";
import { NewsItem } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export type GetNewsResponse = {
  pagesLeft: number;
} & { data: NewsItem[] };

type Response = Promise<NextResponse<GetNewsResponse>>;

export async function GET(request: NextRequest): Response {
  const page = Number(request.nextUrl.searchParams.get("page"));

  const data: NewsItem[] = [...mockNewsList];
  if (page === 0) {
    const pagesLeft = data.length / NEWS_PER_PAGE;
    return NextResponse.json({ data, pagesLeft });
  } else {
    const { paginatedData, pagesLeft } = getPagination(
      data,
      page,
      NEWS_PER_PAGE,
    );
    return NextResponse.json({ data: paginatedData, pagesLeft });
  }
}
