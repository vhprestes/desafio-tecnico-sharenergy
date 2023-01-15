import { NextFunction, Request, Response } from "express";
import validator  from "validator";

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, address, cpf } = req.body;
  if (!name || !email || !phone || !address || !cpf) {
      return res.status(400).json({ message: 'Missing required fields' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: `Invalid email` });
  }

  if (!validator.isMobilePhone(phone)) {
    return res.status(400).json({ message: `Invalid phone` });
  }

  if (!validator.isLength(address, { min: 10, max: 100 })) {
    return res.status(400).json({ message: `Invalid address` });
  }

  if (!validator.isLength(cpf, { min: 11, max: 11 })) {
    return res.status(400).json({ message: `Invalid cpf` });
  }

  next();
};

export default validateUser;