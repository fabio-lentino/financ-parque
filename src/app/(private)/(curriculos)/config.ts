import * as actions from "@/actions/registros"; //Alterar para o caminho do seu modelo
export type { Registro as Model } from "@prisma/client"; // Alterar para o tipo do seu modelo

export const config = {
  id: "registros",
  actions,
  conteudo: {
    tabela: {
      titulo: "Controle de Registros",
      descricao: "Painel para realizar o controle de registro",
      botaoNovo: "Novo registro",
    },
    formulario: {
      tituloNovo: "Novo registro",
      descricaoNovo: "Adicione um novo registro",
      tituloEdicao: "Dados do registro",
      descricaoEdicao: "Visualize e edite as informações do registro selecionado",
      sucessoAoSalvar: "registro salvo com sucesso",
      erroAoSalvar: "Erro ao salvar registro",
    },
  },
};
