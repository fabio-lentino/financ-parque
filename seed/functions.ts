import { ROLES } from "@/enums/roles";
import { prisma } from "../src/lib/prisma";
const bcrypt = require("bcrypt");

export async function createAdminUser() {
  await prisma.user.create({
    data: {
      email: "admin@admin.com",
      name: "Admin",
      password: await bcrypt.hash("admin", 10),
      role: ROLES.ADMIN,
    },
  });

  console.log(`1 admin criado in ${process.env.DATABASE_URL}.`);
}
