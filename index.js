const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const { validateEmail, validatePassword } = require('./middlewares/loginValidations');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', validateEmail, validatePassword, async (_req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

app.get('/talker', async (_req, res) => {
  const talkers = JSON.parse(await fs.readFile('./talker.json'));

  if (!talkers) return res.status(HTTP_OK_STATUS).json([]);

  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const allTalkers = JSON.parse(await fs.readFile('./talker.json'));

  const talker = await allTalkers.find((currentTalker) => currentTalker.id === parseInt(id, 10));

  if (!talker) {
 return res.status(HTTP_NOT_FOUND_STATUS)
  .json({ message: 'Pessoa palestrante não encontrada' }); 
}

  return res.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
