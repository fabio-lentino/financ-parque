import { Panel } from "@/components/layout/panel";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Table } from "./table";
import { Form } from "../(form)/form";
import { SheetForm } from "@/components/form/sheet-form";
import { config } from "../config";
import { ImportBtn } from "./import";

export default async function Page() {
  const { data, error } = await config.actions.find();

  return (
    <Panel.Root className="pt-5">
      <Panel.Header>
        <div className="space-y-2">
          <Panel.Title>{config.conteudo.tabela.titulo}</Panel.Title>
          <Panel.Description className="hidden lg:block">
            {config.conteudo.tabela.descricao}
          </Panel.Description>
        </div>
        <div className="flex gap-4">
          <ImportBtn />
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
        </div>
      </Panel.Header>
      <Panel.Content>
        {error ? error : <Table data={data ?? []} />}
      </Panel.Content>
    </Panel.Root>
  );
}
