import { Request, Response } from "express";
import { insertAluno } from "./post";
import { deleteAluno } from "./delete";
import { updateALuno } from "./put";
import { metodNotFound } from "../../services/util";
import getAlunos from "./get";

const metodoInvalido = async (req: Request, res: Response) => {
  return metodNotFound(res, 'método inválido');
}

export const alunoController = {
  insertAluno,
  deleteAluno,
  updateALuno,
  metodoInvalido,
  ...getAlunos,
}