import { ok } from 'assert';
import {Request, Response} from 'express';
import { Aluno, alunoModel } from '../models/aluno';
import { badRequest, internalServerError, notFound, okay, validateNumber } from '../services/util';

const insertAluno = (req: Request, res: Response) => {
  {
    const aluno = req.body;
    if (!aluno)
      return badRequest(res, "Aluno inválido");

    if (!aluno.nome)
      return badRequest(res, "Informe um nome para o aluno");

    if (!(aluno.rga) || aluno.rga.length != 12 || !(validateNumber(aluno.rga)))
      return badRequest(res, "Rga inválido ou nulo");

    if (aluno.situacao && ((aluno.situacao != 'inativo') || (aluno.situacao != 'ativo')))
      return badRequest(res, "Situaçao inválida");
  }

  const aluno = req.body as Aluno;
  
  if(!aluno.situacao)
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

const getAlunos = (req: Request, res: Response) => {

  let { nome, limite, paginas }: any = req.query

  alunoModel.listAlunos(nome, limite, paginas).then(
    alunos => {
      res.json(alunos)
    })
    .catch(err => internalServerError(res, err))
}

const getAlunoById = (req: Request, res: Response) => {
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

const deleteAluno = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if(!validateNumber(id))
      return badRequest(res, 'id inválido');
  }

  alunoModel.deleteAluno(id)
    .then(() => okay(res))
    .catch(err => internalServerError(res, err))
}

export const alunoController = {
  insertAluno,
  getAlunos,
  getAlunoById,
  deleteAluno
}

