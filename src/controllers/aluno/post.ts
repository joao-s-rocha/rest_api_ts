import { Request, Response } from "express";
import { alunoModel } from '../../models/aluno';
import { badRequest, internalServerError, notFound, okay, validateNumber } from "../../services/util";

export const insertAluno = (req: Request, res: Response) => {
  const aluno = req.body;

  if (!aluno)
    return badRequest(res, "Aluno inválido");

  if (!aluno.nome)
    return badRequest(res, "Informe um nome para o aluno");

  if (!(aluno.rga) || aluno.rga.length != 12 || !(validateNumber(aluno.rga)))
    return badRequest(res, "Rga inválido ou nulo");

  if(!aluno.situacao)
    aluno.situacao = 'ativo';

  if (aluno.situacao != 'inativo' && aluno.situacao != 'ativo')
    return badRequest(res, "Situaçao inválida");

  aluno.rga = aluno.rga.substring(0,4)+'.'+aluno.rga.substring(4,8)+'.'+aluno.rga.substring(8,11)+'-'+aluno.rga.substring(11,12);

  alunoModel.insertAluno(aluno).then(
    id => {
      res.json({
        id
      })
    })
    .catch(err => internalServerError(res, err))
}