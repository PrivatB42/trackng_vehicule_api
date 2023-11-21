import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import Helper from "../../helpers/Helper";


const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rules: Validator.Rules = {
            "nom": [`required`, `string`],
            "prenom": [`required`, `string`],
            "date_naissance": [`required`],
            "numero_piece_identite": [`required`, `string`],
            "telephone": [`required`, `string`],
            "adresse": [`required`, `string`],
            "salaire": [`required`],
            "username": [`required`, `string`],
            "password": [`required`, `string`],
        };

        const { nom, prenom, date_naissance, numero_piece_identite, telephone, adresse, salaire, username, password } = req.body

        const data = {
            nom,
            prenom,
            date_naissance,
            numero_piece_identite,
            telephone,
            adresse,
            salaire,
            username,
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
            "username": [`string`, `required`],
            "password": [`required`, `string`],
        };

        const { username, password } = req.body

        const data = {
            username,
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