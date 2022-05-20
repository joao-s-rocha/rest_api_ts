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
  console.log(sqlQry.join(' '));
  const retorno = await query(sqlQry.join(' '));

  return retorno as Aluno[];
}

const getAlunoById = async(id: number) => {
  const retorno = await queryFirst(`SELECT * FROM aluno WHERE id = ? `, [id]);
  return retorno as Aluno;
}

const deleteAluno = async(id: number) => {
  await queryFirst(`DELETE FROM aluno WHERE id = ? `, [id]);
}

export const alunoModel = {
  insertAluno,
  listAlunos,
  getAlunoById,
  deleteAluno
}