import { body } from "express-validator";

export const titleValidation = body("title")
  .isLength({ min: 3, max: 15 })
  .withMessage("Length should from 3 to 10");
