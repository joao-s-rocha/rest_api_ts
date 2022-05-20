import { Router } from 'express';
import { alunoController } from '../controllers/aluno';

const alunoRouter = Router();

alunoRouter.post('/', alunoController.insertAluno);
alunoRouter.post('/:id', alunoController.metodoInvalido);

alunoRouter.get('/', alunoController.getAlunos);
alunoRouter.get('/:id', alunoController.getAlunoById);

alunoRouter.delete('/:id', alunoController.deleteAluno);
alunoRouter.delete('/', alunoController.metodoInvalido);

alunoRouter.put('/', alunoController.metodoInvalido);

export {
  alunoRouter
}