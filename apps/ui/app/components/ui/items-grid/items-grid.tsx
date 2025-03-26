import Link from "next/link";
import React, { ReactNode } from "react";

export const ItemsGrid = ({ items }: { items: { link: string; content: ReactNode }[] }) => {
  return (
    <section className="pt-0 pb-6 bg-gray-100">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map(i => (
          <article
            key={i.link}
            className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
          >
            <Link href={i.link}>{i.content}</Link>
          </article>
        ))}
      </div>
    </section>
  );
};
