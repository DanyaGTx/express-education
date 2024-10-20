import { NextFunction, Request, Response } from "express";

let counter = 0;

export const requestCounter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  counter++;
  console.log(counter);
  next();
};
