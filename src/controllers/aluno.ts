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

    if(!(aluno.rga) || aluno.rga.length != 12 || Number.isInteger(aluno.rga))
      return badRequest(res, "Rga inválido ou nulo");
  }

  const aluno = req.body as Aluno;
  
  if(!aluno.situacao || ((aluno.situacao != 'I') && (aluno.situacao != 'A')))
    aluno.situacao = 'ativo';
  
  aluno.rga = aluno.rga.substring(0,4)+'.'+aluno.rga.substring(4,8)+'.'+aluno.rga.substring(8,11)+'-'+aluno.rga.substring(11,12);

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

