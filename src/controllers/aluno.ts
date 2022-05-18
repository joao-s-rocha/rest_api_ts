import {Request, Response} from 'express';
import { Aluno, alunoModel } from '../models/aluno';
import { badRequest, internalServerError } from '../services/util';

const insertAluno = (req: Request, res: Response) => {
  {
    const aluno = req.body;
    if (!aluno)
      return badRequest(res, "Aluno inválido");

    if(!aluno.nome)
      return badRequest(res, "Informe um nome para o aluno");

    if(!aluno.rga)
      return badRequest(res, "Informe um rga para o aluno");
  }

  const aluno = req.body as Aluno;
  alunoModel.insertAluno(aluno).then(
    id => {
      res.json({
        id
      })
    })
    .catch(err => internalServerError(res, err))
}

const listAlunos = (req: Request, res: Response) => {
  alunoModel.listAlunos().then(
    alunos => {
      res.json(alunos)
    })
    .catch(err => internalServerError(res, err))
}

export const alunoController = {
  insertAluno,
  listAlunos
}

