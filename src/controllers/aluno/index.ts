import { insertAluno } from "./post";
import { deleteAluno } from "./delete";
import getAlunos from "./get";

export const alunoController = {
  insertAluno,
  deleteAluno,
  ...getAlunos,
}