import { createAdminUser } from "./functions";

async function main() {
  await createAdminUser();
}

main().catch((e) => {
  throw e;
});
