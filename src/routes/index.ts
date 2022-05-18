import { Application, Router } from "express";
import { alunoRouter } from "./aluno";



export const useRoutes = (app: Application) => {
  const apiRouter = Router();
  apiRouter.use('/aluno', alunoRouter);

  app.use('/api/v1', apiRouter);
}