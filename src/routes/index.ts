import { Application, Router } from "express";
import { alunoRouter } from "./aluno";

export const useRoutes = (app: Application) => {
  const apiRouter = Router();
  apiRouter.use('/alunos', alunoRouter);

  app.use('/', apiRouter);
}