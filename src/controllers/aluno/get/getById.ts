import { Request, Response } from "express";
import { alunoModel } from "../../../models/aluno";
import { badRequest, internalServerError, notFound, validateNumber } from "../../../services/util";

export const getAlunoById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if(!validateNumber(id))
      return badRequest(res, 'id inválido');
  }

  alunoModel.getAlunoById(id)
    .then(aluno => {
      return (aluno ? res.json(aluno) : notFound(res))
    })
    .catch(err => internalServerError(res, err))
}