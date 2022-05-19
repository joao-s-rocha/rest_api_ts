import { query } from "../services/db";

export type Aluno = {
  id: number;
  rga: string;
  nome: string;
<<<<<<< HEAD
  curso: string;
  situacao: string;
  registrado_em: string;
} 
=======
  curso?: string;
  situacao?: string;
  registrado_em: string;
}
>>>>>>> 082b6310aa9e8f5bdc399459140539a36d91cf4a

const insertAluno = async (aluno: Aluno) =>{
  await query('INSERT INTO aluno (rga, nome, curso, situacao, registrado_em ) VALUES(?, ?, ?, ?, ?)', [aluno.rga, aluno.nome, aluno.curso, aluno.situacao, Date.now()]);
  let retorno = await query(`SELECT seq as id FROM sqlite_sequence WHERE name = 'aluno'`, []);
  return retorno[0].id as number | undefined;
}

const listAlunos = async () => {
  const retorno = await query(`SELECT * FROM aluno`);
  return retorno as Aluno[];
}

<<<<<<< HEAD
const getAlunoByName = async (name: string) => {
  const retorno = await query(`SELECT * FROM aluno WHERE upper(nome) like upper('%?%') `, [name]);
  return retorno as Aluno[];
}

export const alunoModel = {
  insertAluno,
  listAlunos,

=======
export const alunoModel = {
  insertAluno,
  listAlunos
>>>>>>> 082b6310aa9e8f5bdc399459140539a36d91cf4a
}