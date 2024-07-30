import * as actions from "@/actions/dre"; //Alterar para o caminho do seu modelo
export type { User as Model } from "@prisma/client"; // Alterar para o tipo do seu modelo

export const config = {
  id: "DRE",
  actions,
  conteudo: {
    tabela: {
      titulo: "Controle de DRE",
      descricao: "Painel para realizar o controle de DRE",
      botaoNovo: "Novo DRE",
    },
    formulario: {
      tituloNovo: "Novo DRE",
      descricaoNovo: "Adicione um novo DRE",
      tituloEdicao: "Dados do DRE",
      descricaoEdicao: "Visualize e edite as informações do DRE selecionado",
      sucessoAoSalvar: "DRE salvo com sucesso",
      erroAoSalvar: "Erro ao salvar DRE",
    },
  },
};
