import { app } from "./app";
import { runDB } from "./repositories/db";

const port = 3000;

const startApp = async () => {
  await runDB();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp();
