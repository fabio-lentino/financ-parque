import * as actions from "@/actions/_modelo"; //Alterar para o caminho do seu modelo
export type { User as Model } from "@prisma/client"; // Alterar para o tipo do seu modelo

export const config = {
  id: "MODELO",
  actions,
  conteudo: {
    tabela: {
      titulo: "Controle de MODELO",
      descricao: "Painel para realizar o controle de MODELO",
      botaoNovo: "Novo MODELO",
    },
    formulario: {
      tituloNovo: "Novo MODELO",
      descricaoNovo: "Adicione um novo MODELO",
      tituloEdicao: "Dados do MODELO",
      descricaoEdicao: "Visualize e edite as informações do MODELO selecionado",
      sucessoAoSalvar: "MODELO salvo com sucesso",
      erroAoSalvar: "Erro ao salvar MODELO",
    },
  },
};
