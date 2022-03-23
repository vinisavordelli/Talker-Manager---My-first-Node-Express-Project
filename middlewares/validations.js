const validateEmail = (req, res, next) => {
  // regex criado em outro projeto.
  const REGEX = /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!REGEX.test(email)) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res
    .status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }

  next();
};

const validateAuth = (req, res, next) => {
  const { authorization } = req.headers;
  const regex = /^[a-zA-Z0-9]{16}$/;
  const tokenValidation = regex.test(String(authorization));
  if (!tokenValidation) {
    return res.status(401).json({ message: 'Token inválido' });
    }
    
    next();
};

const validateName = (req, res, next) => {
const { name } = req.body;

if (!name) {
  return res.status(400).json({ message: 'O campo "name" é obrigatório' });
}

if (name.length < 3) {
  return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
}

next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  
  next();
  };

const validateLastWatched = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
 const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
 // regex gerado no website: https://www.regextester.com/99555
 const lastWatchedValidation = regex.test(watchedAt);
   if (!lastWatchedValidation) {
   return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
   }

next();  
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

next();  
};

module.exports = {
  validateEmail,
  validatePassword,
  validateAuth,
  validateAge,
  validateName,
  validateLastWatched,
  validateRate,
  validateTalk,
};