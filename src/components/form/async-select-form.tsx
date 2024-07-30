"use client";

import { TSelectOption } from "@/types/form";
import { useEffect, useState } from "react";

interface AsyncSelectProps {
  fetchFn: () => Promise<TSelectOption<string | number>[]>;
  select: (options: TSelectOption<string | number>[]) => JSX.Element;
}

export const AsyncSelect = ({ select, fetchFn }: AsyncSelectProps) => {
  const [data, setData] = useState<TSelectOption<string | number>[]>([]);

  useEffect(() => {
    fetchFn().then((options) => setData(options));
  }, [fetchFn]);

  return select(data);
};
