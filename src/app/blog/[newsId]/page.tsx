import { formatDate } from "@/features/formatDate";
import { getParams } from "@/features/getParams";
import mockNewsList from "@/mock.json";
import Image from "next/image";
import Link from "next/link";
import styles from "./newsId.module.scss";

import React from "react";

export async function generateStaticParams() {
  return await getParams();
}

async function Page({ params }: { params: Promise<{ newsId: string }> }) {
  const { newsId } = await params;

  const newsItem = [...mockNewsList].find(
    (item) => item.id.toString() === newsId,
  );

  if (!newsItem) {
    return (
      <div>
        <p>Страница не найдена</p>
        <Link href={"/blog"}>Назад</Link>
      </div>
    );
  }

  return (
    <section className={styles.article}>
      <Image
        src={newsItem.imageSrc}
        alt={newsItem.name}
        width={440}
        height={320}
        className={styles.image}
      />
      <div className={styles.description}>
        <h1 className={styles.title}>{newsItem.name}</h1>
        <p className={styles.date}>
          {formatDate(new Date(newsItem.date)).replace(" г.", "")}
        </p>
        <p className={styles.shortDescr}>{newsItem.shortDescription}</p>
        <p>{newsItem.fullDescription}</p>
      </div>
    </section>
  );
}

export default Page;
