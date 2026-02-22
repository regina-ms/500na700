"use client";
import NewsItemView from "@/components/NewsItemView/NewsItemView";
import { getNewsList } from "@/methods/getNewsList";
import { NewsItem } from "@/types";
import Button from "@/ui/Button/Button";
import React, { useCallback, useEffect, useState } from "react";
import styles from './blog.module.scss'

function Page() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pagesLeft, setPagesLeft] = useState<number>(0);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  useEffect(() => {
    getNewsList(1).then((result) => {
      setNewsList(result.data);
      setPagesLeft(result.pagesLeft);
      setCurrentPage(1);
    });
  }, []);

  function showNewsList() {
    return newsList.map((news) => <NewsItemView key={news.id} {...news} />);
  }

  const showMoreButtonClick = useCallback(() => {
    const nextPage = currentPage + 1;
    getNewsList(nextPage).then((result) => {
      setNewsList((prev) => [...prev, ...result.data]);
      setPagesLeft(result.pagesLeft);
      setCurrentPage(nextPage);
    });
  }, [currentPage]);

  return (
    <section className={styles.blogSection}>
      <h1 className={styles.title}>Новости</h1>
      <ul className={styles.list}>{showNewsList()}</ul>
      {pagesLeft !== 0 && (
        <Button variant="light" onClick={showMoreButtonClick}>
          Показать еще
        </Button>
      )}
    </section>
  );
}

export default Page;
