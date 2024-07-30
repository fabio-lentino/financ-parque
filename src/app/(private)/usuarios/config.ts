import * as actions from "@/actions/users";
export type { User as Model } from "@prisma/client";

export const config = {
  id: "usuarios",
  actions,
  conteudo: {
    tabela: {
      titulo: "Controle de Usuários",
      descricao: "Painel para realizar o controle de usuários",
      botaoNovo: "Novo Usuário",
    },
    formulario: {
      tituloNovo: "Novo Usuário",
      descricaoNovo: "Adicione um novo usuários",
      tituloEdicao: "Dados do Usuário",
      descricaoEdicao:
        "Visualize e edite as informações do usuário selecionado",
      sucessoAoSalvar: "Usuário salvo com sucesso",
      erroAoSalvar: "Erro ao salvar usuário",
    },
  },
};
