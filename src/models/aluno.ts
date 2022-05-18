import { query } from "../services/db";

export type Aluno = {
  id: number;
  rga: string;
  nome: string;
  curso?: string;
  situacao?: string;
  registrado_em: string;
}

const insertAluno = async (aluno: Aluno) =>{
  await query('INSERT INTO aluno (rga, nome, curso, situacao, registrado_em ) VALUES(?, ?, ?, ?, ?)', [aluno.rga, aluno.nome, aluno.curso, aluno.situacao, Date.now()]);
  let retorno = await query(`SELECT seq as id FROM sqlite_sequence WHERE name = 'aluno'`, []);
  return retorno[0].id as number | undefined;
}

const listAlunos = async () => {
  const retorno = await query(`SELECT * FROM aluno`);
  return retorno as Aluno[];
}

export const alunoModel = {
  insertAluno,
  listAlunos
}