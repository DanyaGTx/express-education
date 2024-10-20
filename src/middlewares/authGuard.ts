import { NextFunction, Request, Response } from "express";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  console.log("authGuard");
  if (req.query.token === "123") {
    next();
  } else {
    res.send(401);
  }
};
