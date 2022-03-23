const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const talkersFile = './talker.json';

const {
  validateEmail,
  validatePassword,
  validateAuth,
  validateAge,
  validateName,
  validateLastWatched,
  validateRate,
  validateTalk,
} = require('./middlewares/validations');

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
  const talkers = JSON.parse(await fs.readFile(talkersFile));

  if (!talkers) return res.status(HTTP_OK_STATUS).json([]);

  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.post('/talker',
validateAuth,
validateName,
validateAge,
validateTalk,
validateLastWatched,
validateRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = JSON.parse(await fs.readFile(talkersFile));
  const newTalker = { id: talkers.length + 1, name, age, talk };
  talkers.push(newTalker);

  await fs.writeFile(talkersFile, JSON.stringify(talkers));
  res.status(201).json(newTalker);
});

app.get('/talker/search', validateAuth, async (req, res) => {
  const { q } = req.query;

  const talkers = await JSON.parse(await fs.readFile(talkersFile));

  if (!q) {
    return res.status(200).json(talkers);
  }
  const name = q.toLowerCase();

  const filteredTalkers = talkers.filter((tal) => tal.name.toLowerCase().includes(name));

  if (!filteredTalkers) return res.status(200).json([]);
  
  return res.status(200).json(filteredTalkers);
});

app.put('/talker/:id',
validateAuth,
validateName,
validateAge,
validateTalk,
validateLastWatched,
validateRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const talkers = await JSON.parse(await fs.readFile(talkersFile));

  const identifier = talkers.findIndex((talker) => talker.id === +id);
  talkers[identifier] = { id: +id, name, age, talk };

  await fs.writeFile(talkersFile, JSON.stringify(talkers));
  res.status(200).json(talkers[identifier]);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const allTalkers = JSON.parse(await fs.readFile(talkersFile));

  const talker = await allTalkers.find((currentTalker) => currentTalker.id === parseInt(id, 10));

  if (!talker) {
 return res.status(HTTP_NOT_FOUND_STATUS)
  .json({ message: 'Pessoa palestrante não encontrada' }); 
}

  return res.status(200).json(talker);
});

app.delete('/talker/:id', validateAuth, async (req, res) => {
  const { id } = req.params;
 
  const allTalkers = await JSON.parse(await fs.readFile(talkersFile));
 
  const talker = await allTalkers.find((currentTalker) => currentTalker.id === parseInt(id, 10));
 
  await fs.writeFile(talkersFile, JSON.stringify(talker));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
