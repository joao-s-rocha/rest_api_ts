import { Request, Response } from "express";
import { alunoModel } from "../../models/aluno";
import { badRequest, internalServerError, notFound, okay, validateNumber } from "../../services/util";

export const deleteAluno = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!validateNumber(id))
    return badRequest(res, 'id inválido');

  const alunoSaved = await alunoModel.getAlunoById(id);
  if (!alunoSaved)
    return notFound(res);

  alunoModel.deleteAluno(id, res)
    .then(() => okay(res))
    .catch(err => internalServerError(res, err))
}