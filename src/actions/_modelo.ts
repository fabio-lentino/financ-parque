"use server";

import { prisma } from "@/lib/prisma";
import { parse } from "date-fns";
import { revalidatePath } from "next/cache";
import * as XLSX from "xlsx";

import { User as Model } from "@prisma/client"; // Troque para o novo modelo do Prisma que você criou
const model = prisma.user; // Troque para o novo modelo do Prisma que você criou
const singular = "usuário"; // Nome do modelo no singular
const plural = "usuários"; // Nome do modelo no plural
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
    const entries = rows.slice(1).map((row: any) => ({})) as Model[];
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
