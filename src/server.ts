import { Express } from 'express'

const PORT = 3000;

function server(app: Express): void {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
}

export default server;
