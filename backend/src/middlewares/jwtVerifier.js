import "dotenv/config";

const jwtVerifier = (req, res, next) => {

  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  token = token.split(' ')[1].replace(/\\/g, "");
  const decode = JSON.parse(token);

  if(decode.token != process.env.JWT_SECRET_KEY){
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = decode;
  next();
  
}

export default jwtVerifier;
