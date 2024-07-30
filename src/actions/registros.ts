"use server";

import { prisma } from "@/lib/prisma";
import { parse } from "date-fns";
import { revalidatePath } from "next/cache";
import * as XLSX from "xlsx";

import { Registro as Model } from "@prisma/client"; // Troque para o novo modelo do Prisma que você criou
const model = prisma.registro; // Troque para o novo modelo do Prisma que você criou
const singular = "registro"; // Nome do modelo no singular
const plural = "registros"; // Nome do modelo no plural
const path = "/"; // Rota para acessar a página

export async function find() {
  try {
    const data = await model.findMany({
      orderBy: { id: "desc" },
    });
    return { data };
  } catch (error) {
    console.error(error);
    return { error: `Erro desconhecido ao buscar ${plural}` };
  }
}

export async function create(data: Model) {
  try {
    await model.create({ data });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    return { error: `Erro desconhecido ao criar ${singular}` };
  }
}

export async function update(dataToUpdate: Partial<Model>) {
  try {
    const { id, ...data } = dataToUpdate;

    await model.update({ where: { id }, data });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    return { error: `Erro desconhecido ao atualizar ${singular}` };
  }
}

export async function remove(id: number) {
  try {
    await model.delete({ where: { id } });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    return { error: `Erro desconhecido ao remover ${singular}` };
  }
}

export async function importXlsx(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    // Substitua entries com os dados do seu modelo
    const entries = rows.map((row: any) => ({
      data: row[0] ? parse(row[0], "dd/MM/yyyy", new Date()) : null,
      descricao: row[1] ? String(row[1]) : null,
      conta: row[2] ? String(row[2]) : null,
      item: row[3] ? String(row[3]) : null,
      valor: row[4] ? parseFloat(row[4].replace(/[^\d,-]/g, "").replace(",", ".")) : null,
      formaDePagamento: row[5] ? String(row[5]) : null,
      status: row[6] ? String(row[6]) : null,
      saldo: row[7] ? parseFloat(row[7].replace(/[^\d,-]/g, "").replace(",", ".")) : null,
      
    }));
    console.log(entries);
    for (const data of entries) {
      try {
        await model.create({ data });
      } catch (e) {
        console.error(`Erro ao importar um campo: ${(e as Error)?.message}`);
      }
    }
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    return { error: `Erro desconhecido ao importar dados em ${singular}` };
  }
}
