import { Request, Response } from "express";
import { alunoModel } from "../../../models/aluno";
import { internalServerError} from "../../../services/util";

export const getAlunos = (req: Request, res: Response) => {
  const { nome, limite, paginas }: any = req.query

  alunoModel.listAlunos(nome, limite, paginas).then(
    alunos => {
      res.json(alunos)
    })
    .catch(err => internalServerError(res, err))
}