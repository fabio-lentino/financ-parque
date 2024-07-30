"use client";

import { useEffect, useState } from "react";

export function useColumnVisibility(key: string) {
  const [columnVisibility, setColumnVisibility] = useState<any>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const visibility = localStorage.getItem(`${key}ColumnVisibility`);
      if (visibility) {
        setColumnVisibility(JSON.parse(visibility));
      }
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== "undefined" && Object.keys(columnVisibility).length) {
      localStorage.setItem(
        `${key}ColumnVisibility`,
        JSON.stringify(columnVisibility)
      );
    }
  }, [key, columnVisibility]);

  return [columnVisibility, setColumnVisibility];
}
