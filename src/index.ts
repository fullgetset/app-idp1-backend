import { app } from './app';
import { runDb } from './repositories/run-base';

const port = 3001;

const startApp = async () => {
  await runDb();

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

startApp();
