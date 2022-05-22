import { Request, Response } from "express";
import { Aluno, alunoModel } from "../../models/aluno";
import { badRequest, internalServerError, notFound, validateNumber } from "../../services/util";

export const updateALuno = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if(!validateNumber(id))
      return badRequest(res, 'id inválido');

    const aluno = req.body;
    if (!aluno)
      return badRequest(res, "Aluno inválido");
  
    if (!aluno.nome)
      return badRequest(res, "Informe um nome para o aluno");
  
    if (!(aluno.rga) || aluno.rga.length != 12 || !(validateNumber(aluno.rga)))
      return badRequest(res, "Rga inválido ou nulo");

    const alunoSaved = await alunoModel.getAlunoById(id);
    if (!alunoSaved)
      return notFound(res);
  }

  const aluno = req.body as Aluno;  
  if(!aluno.situacao)
    aluno.situacao = 'ativo';

  if (aluno.situacao != 'inativo' && aluno.situacao != 'ativo')
    return badRequest(res, "Situaçao inválida");

  aluno.rga = aluno.rga.substring(0,4)+'.'+aluno.rga.substring(4,8)+'.'+aluno.rga.substring(8,11)+'-'+aluno.rga.substring(11,12);
  aluno.id = id;
  return alunoModel.updateAluno(aluno)
    .then(aluno => {
      res.json(aluno)
    })
    .catch(err => internalServerError(res, err))
}