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

  if (!(tokenValidation)) {
    return res.status(401).json({ message: 'Token inválido' });
    }
    
    next();
};

module.exports = { validateEmail, validatePassword };