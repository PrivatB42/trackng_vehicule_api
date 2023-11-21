import { Request, Response, NextFunction } from "express";
import Validator from "validatorjs";
import Helper from "../../helpers/Helper";

const CreatedValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rules: Validator.Rules = {
            "numero_facture": [`required`, `string`],
            "nombre_litre": [`required`],
            "montant": [`required`],
            "chauffeurId": [`required`, `string`]
        };

        const { numero_facture, nombre_litre, montant } = req.body
        const { chauffeurId } = req.params
        const data = {
            numero_facture,
            nombre_litre,
            montant,
            chauffeurId
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