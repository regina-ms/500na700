import { formatDate } from "@/features/formatDate";
import { NewsItem as Props } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./NewsItemView.module.scss";

function NewsItemView({ id, name, shortDescription, imageSrc, date }: Props) {
  return (
    <li className={styles.item}>
      <Link href={`/blog/${id}`}>
        <Image
          src={imageSrc}
          alt={name}
          width={440}
          height={300}
          className={styles.image}
        />
        <div className={styles.title}>{name}</div>
        <div className={styles.description}>{shortDescription}</div>
        <div className={styles.date}>
          {formatDate(new Date(date)).replace(" г.", "")}
        </div>
      </Link>
    </li>
  );
}

export default NewsItemView;
