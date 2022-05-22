import { query, queryFirst } from "../services/db";
import { Response } from "express";
import { notFound, internalServerError } from "../services/util";

export type Aluno = {
  id: number;
  rga: string;
  nome: string;
  curso: string;
  situacao: string;
  registrado_em: string;
} 

const insertAluno = async (aluno: Aluno) =>{
  await query('INSERT INTO aluno (rga, nome, curso, situacao, registrado_em ) VALUES(?, ?, ?, ?, ?)', [aluno.rga, aluno.nome, aluno.curso, aluno.situacao, Date.now()]);
  let retorno = await query(`SELECT seq as id FROM sqlite_sequence WHERE name = 'aluno'`);
  return getAlunoById(retorno[0].id);
}

const listAlunos = async (nome? : string, limite?: number, paginas?: number) => {
  const sqlQry: string[] = [];
  limite = limite || 25;
  paginas = paginas || 1;
  nome = nome || '';

  sqlQry.push(`SELECT * FROM aluno`);
 
  if (!!nome) {
    sqlQry.push(`WHERE nome like '%${nome}%'`)
  }

  sqlQry.push(`LIMIT ${limite} OFFSET ${(paginas - 1) * limite}`);
  const retorno = await query(sqlQry.join(' '));

  return retorno as Aluno[];
}

const getAlunoById = async (id: number) => {
  const retorno = await queryFirst(`SELECT * FROM aluno WHERE id = ? `, [id]);
  return retorno as Aluno | undefined;
}

const deleteAluno = async(id: number, res: Response) => {
  await queryFirst(`DELETE FROM aluno WHERE id = ? `, [id]);
}

const updateAluno = async (aluno: Aluno) =>{
  await query('UPDATE aluno SET rga = ?, nome = ?, curso = ?, situacao = ? WHERE id = ?', [aluno.rga, aluno.nome, aluno.curso, aluno.situacao, aluno.id]);
  return getAlunoById(aluno.id);
}

export const alunoModel = {
  insertAluno,
  listAlunos,
  getAlunoById,
  deleteAluno,
  updateAluno
}