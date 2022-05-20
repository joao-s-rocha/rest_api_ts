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

const listAlunos = async (idNome? : number | string, limite?: number, paginas?: number) => {
  const sqlQry: string[] = [];
  limite = limite || 25;
  paginas = paginas || 1;

  let text: string = '';
  sqlQry.push(`SELECT * FROM aluno`);
  // console.log(eval('sqlQry.includes(`WHERE`)'))
 
  if (!!idNome) {
    sqlQry.push('WHERE');

    if (typeof idNome == 'string') sqlQry.push(`nome like '%${idNome}%'`)
    else sqlQry.push(`id = ${idNome}`);
  }

  // montarSql('WHERE', '!contains(`WHERE)`', 'AND')

  // if (!!idNome) {
  //   if (!sqlQry.includes(`WHERE`)) sqlQry.push('WHERE');
  //   else sqlQry.push('AND');

  //   sqlQry.push(`nome like '%${idNome}%'`);
  // }
  // console.log(eval('sqlQry.includes(`WHERE`)'))
  sqlQry.push(`LIMIT ${limite} OFFSET ${(paginas - 1) * limite}`);

  text = sqlQry.join(' ')
  console.log(text)

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