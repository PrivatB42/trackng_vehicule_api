import { Request, Response } from "express";
import Carburant from "../db/models/carburant";
import Helper from "../helpers/Helper";


const GetAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const carburants = await Carburant.findAll()
        return res.status(201).send(Helper.ResponseData(201, "Get all", null, carburants));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

const create = async (req: Request, res: Response): Promise<Response> => {
    try {
		const { numero_facture, nombre_litre, montant } = req.body
        const { chauffeurId } = req.params

		const carburant = await Carburant.create({
			numero_facture,
            nombre_litre,
			montant,
            chauffeurId: chauffeurId
		});

		return res.status(201).send(Helper.ResponseData(201, "Created", null, carburant));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

const destroy = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params
        const carburant = await Carburant.findByPk(id)

        if (!carburant) {
			return res.status(404).send({
				status: 404,
				message: "Data Not Found",
				data: null
			});
		}

        await carburant.destroy()
        return res.status(200).send(Helper.ResponseData(200, "Vehicule destroy", null, ""));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}


export default { GetAll, create, destroy }