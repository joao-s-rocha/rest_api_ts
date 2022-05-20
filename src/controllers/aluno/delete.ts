import { Request, Response } from "express";
import { alunoModel } from "../../models/aluno";
import { badRequest, internalServerError, okay, validateNumber } from "../../services/util";

export const deleteAluno = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if(!validateNumber(id))
      return badRequest(res, 'id inválido');
  }

  alunoModel.deleteAluno(id)
    .then(() => okay(res))
    .catch(err => internalServerError(res, err))
}