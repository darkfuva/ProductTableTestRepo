"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TableComponent from "@/components/tableComponent";
import tableHeaders from "@/components/tableHeadersConfig";


export type Item = {
  id: number;
  title: string;
  brand: string;
  category: number;
  price: number;
};

export default function Home() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState<number>(0);
  const defaultSortBy = "price";
  const defaultSortDirection = "asc";
  const defaultLimit = 10;
  const defaultSkip = 0;

  useEffect(() => {
    handleFetchProducts("price", "asc");
  }, []);

  const handleFetchProducts = (
    sortBy: string,
    sortDirection: "asc" | "desc",
    limit: number = 10,
    skip: number = 0
  ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    refreshToken(token);

    fetch(
      `https://dummyjson.com/products?sortBy=${sortBy}&order=${sortDirection}&limit=${limit}&skip=${skip}`
    )
      .then((res) => res.json())
      .then((_items) => {
        setItems(_items.products);
        setTotal(_items.total);
      });
  };

  const refreshToken = (token: string) => {
    fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((user) => localStorage.setItem("token", user.token))
      .catch((err) => router.push("/login"));
  };

  return (
    <div>
      <div className="flex justify-center p-20 pt-14">
        <TableComponent
          totalPages={total}
          tableHeaders={tableHeaders}
          onTableStateChange={(sortBy, sortDirection, limit, skip) => {
            console.log("Called");
            handleFetchProducts(sortBy, sortDirection, limit, skip);
          }}
          tableData={items}
          defaultSortBy={defaultSortBy}
          defaultSortDirection={defaultSortDirection}
          defaultLimit={defaultLimit}
          defaultSkip={defaultSkip}
        />
      </div>
    </div>
  );
}
