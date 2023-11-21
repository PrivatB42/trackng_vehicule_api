import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import Helper from "../../helpers/Helper";


const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rules: Validator.Rules = {
            "nom": [`required`, `string`],
            "prenom": [`required`, `string`],
            "telephone": [`required`, `string`],
            "email": [`required`, `string`],
            "password": [`required`, `string`]
        };

        const { nom, prenom, telephone, email, password } = req.body

        const data = {
            nom,
            prenom,
            telephone,
            email,
            password
        }

        const validate = new Validator(data, rules);

		if (validate.fails()) {
			return res?.status(400).send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
		}
		next();
    } catch (error) {
        
    }
}

const LoginValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rules: Validator.Rules = {
            "email": [`string`, `required`],
            "password": [`required`, `string`],
        };

        const { email, password } = req.body

        const data = {
            email,
            password
        }

        const validate = new Validator(data, rules);

		if (validate.fails()) {
			return res?.status(400).send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
		}
		next();
    } catch (error) {
        
    }
}

export default { LoginValidation, RegisterValidation }