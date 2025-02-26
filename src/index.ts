import { app } from './app';
import { runDb } from './repositories';

const port = 3000;

const startApp = async () => {
  await runDb();

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

startApp();
