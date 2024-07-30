import { Panel } from "@/components/layout/panel";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Table } from "./table";
import { Form } from "../(form)/form";
import { SheetForm } from "@/components/form/sheet-form";
import { config } from "../config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { ROLES } from "@/enums/roles";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== ROLES.ADMIN) {
    return (
      <Panel.Root className="pt-5">
        Você não tem autorização para acessar essa página.
      </Panel.Root>
    );
  }

  const { data, error } = await config.actions.find();

  return (
    <Panel.Root className="pt-5">
      <Panel.Header>
        <div className="space-y-2">
          <Panel.Title>{config.conteudo.tabela.titulo}</Panel.Title>
          <Panel.Description>
            {config.conteudo.tabela.descricao}
          </Panel.Description>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button data-test="create-btn">
              {config.conteudo.tabela.botaoNovo}
            </Button>
          </SheetTrigger>
          <SheetForm.Content
            title={config.conteudo.formulario.tituloNovo}
            description={config.conteudo.formulario.descricaoNovo}
          >
            <Form />
          </SheetForm.Content>
        </Sheet>
      </Panel.Header>
      <Panel.Content>
        {error ? error : <Table data={data ?? []} />}
      </Panel.Content>
    </Panel.Root>
  );
}
