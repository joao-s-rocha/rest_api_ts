import { Application, Router } from "express";
import { alunoRouter } from "./aluno";



export const useRoutes = (app: Application) => {
  const apiRouter = Router();
<<<<<<< HEAD
  apiRouter.use('/alunos', alunoRouter);

  app.use('/', apiRouter);
=======
  apiRouter.use('/aluno', alunoRouter);

  app.use('/api/v1', apiRouter);
>>>>>>> 082b6310aa9e8f5bdc399459140539a36d91cf4a
}