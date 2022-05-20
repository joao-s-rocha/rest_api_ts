import { Router } from 'express';
import { alunoController } from '../controllers/aluno';
import { Aluno } from '../models/aluno';

const alunoRouter = Router();

alunoRouter.post('/', alunoController.insertAluno);
alunoRouter.get('/', alunoController.getAlunos);
alunoRouter.get('/:id', alunoController.getAlunoById);
alunoRouter.delete('/:id', alunoController.deleteAluno);

export {
  alunoRouter
}