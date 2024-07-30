"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { ROLES } from "@/enums/roles";

type Model = User;
const model = prisma.user;
const singular = "usuário";
const plural = "usuários";
const path = "/usuarios";

export async function find() {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== ROLES.ADMIN) {
      return { error: `Você não tem autorização` };
    }

    const data = await model.findMany({
      orderBy: { id: "desc" },
      select: { id: true, name: true, email: true, role: true },
    });
    return { data };
  } catch (error) {
    console.error(error);
    return { error: `Erro ao buscar ${plural}` };
  }
}

export async function create(data: Model) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== ROLES.ADMIN) {
      return { error: `Você não tem autorização` };
    }

    if (!data.password) {
      return { error: `Senha é obrigatória` };
    }
    await model.create({
      data: {
        ...data,
        password: bcrypt.hashSync(data.password, 10),
      },
    });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    return { error: `Erro ao criar produto ${singular}` };
  }
}

export async function update(dataToUpdate: Partial<Model>) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== ROLES.ADMIN) {
      return { error: `Você não tem autorização` };
    }

    const { id, ...data } = dataToUpdate;

    data.password = data.password
      ? bcrypt.hashSync(data.password, 10)
      : undefined;

    await model.update({
      where: { id },
      data,
    });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    return { error: `Erro ao atualizar ${singular}` };
  }
}

export async function remove(id: number) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== ROLES.ADMIN) {
      return { error: `Você não tem autorização` };
    }

    await model.delete({ where: { id } });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    return { error: `Erro ao remover ${singular}` };
  }
}
