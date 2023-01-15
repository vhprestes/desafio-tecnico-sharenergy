import express from 'express';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app

// app.get('/', (_req, res) => res.send('Hello World!'));
