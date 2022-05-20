import { query, queryFirst } from "../services/db";

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
  let retorno = await query(`SELECT seq as id FROM sqlite_sequence WHERE name = 'aluno'`, []);
  return retorno[0].id as number | undefined;
}

const listAlunos = async (limite : number = 25, paginas : number = 1, nome : string = '') => {
  let text : string = `SELECT * FROM aluno `;
  let where : string = ``;
  
  if (nome != '') where = `WHERE nome like '%${nome}%' `;

  if (where != ``) text = text + where;

  text = text + `LIMIT ${limite} `;
  text = text + `OFFSET ${paginas} `;

  const retorno = await query(text);

  return retorno as Aluno[];
}

const getAlunoById = async(id: number) => {
  const retorno = await queryFirst(`SELECT * FROM aluno WHERE id = ? `, [id]);
  return retorno as Aluno;
}

const getAlunoByName = async (name: string) => {
  const retorno = await query(`SELECT * FROM aluno WHERE upper(nome) like upper('%?%') `, [name]);
  return retorno as Aluno[];
}

export const alunoModel = {
  insertAluno,
  listAlunos,
  getAlunoById
}