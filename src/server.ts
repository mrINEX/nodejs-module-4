const PORT = 3000;

function server(app) {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
}

export default server;
