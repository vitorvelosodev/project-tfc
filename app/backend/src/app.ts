import * as express from 'express';
import router from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    // const accessControl: express.RequestHandler = (_req, res, next) => {
    //   res.header('Access-Control-Allow-Origin', '*');
    //   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
    //   res.header('Access-Control-Allow-Headers', '*');
    //   next();
    // };

    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*'); // Defina a origem específica do front-end (pode ser '*')
      res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');

      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      );
      // Adicione a opção abaixo para permitir que o navegador envie cookies em solicitações cross-origin
      res.header('Access-Control-Allow-Credentials', 'true');

      if (_req.method === 'OPTIONS') {
        // Se a solicitação for OPTIONS, envie uma resposta 200 com os cabeçalhos CORS para que o navegador permita a solicitação real
        return res.sendStatus(200);
      }

      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use(router);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
