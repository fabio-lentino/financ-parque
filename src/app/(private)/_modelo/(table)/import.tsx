"use client";

import { FileUp } from "lucide-react";
import { config } from "../config";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function ImportBtn() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function upload(files: FileList | null) {
    setLoading(true);
    try {
      if (!files) {
        return;
      }
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("file", file));
      await config.actions.importXlsx(formData);
      toast({
        title: "Dados importados com sucesso",
        variant: "success",
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Ocorreu um erro ao importar os arquivos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      document.getElementById("import-btn")?.setAttribute("value", "");
    }
  }

  return (
    <div className="flex items-center">
      <label htmlFor="import-btn">
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <FileUp className="cursor-pointer" />
        )}
      </label>
      <input
        hidden
        id="import-btn"
        type="file"
        accept=".xlsm,.xls,.xlsx"
        onChange={async (e) => upload(e.target.files)}
      />
    </div>
  );
}
