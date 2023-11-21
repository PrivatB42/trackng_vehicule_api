import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import Helper from "../../helpers/Helper";

const CreatedValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rules: Validator.Rules = {
            "immatriculation_vehicule": [`required`, `string`],
            "puissance": [`required`],
            "couleur": [`required`, `string`],
            "marque": [`required`, `string`],
            "annee_mise_en_circulation": [`required`]
        };

        const { immatriculation_vehicule, puissance, couleur, marque, annee_mise_en_circulation } = req.body

        const data = {
            immatriculation_vehicule,
            puissance,
            couleur,
            marque,
            annee_mise_en_circulation
        }

        const validate = new Validator(data, rules);

		if (validate.fails()) {
			return res?.status(400).send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
		}
		next();
    } catch (error) {
        
    }
}

export default { CreatedValidation }