import { Request, Response } from "express";
import Vehicule from "../db/models/vehicule";
import Helper from "../helpers/Helper";

const GetAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const vehicules = await Vehicule.findAll()
        return res.status(201).send(Helper.ResponseData(201, "Get all", null, vehicules));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

const create = async (req: Request, res: Response): Promise<Response> => {
    try {
		const { immatriculation_vehicule, puissance, couleur, marque, annee_mise_en_circulation } = req.body

		const user = await Vehicule.create({
			immatriculation_vehicule,
            puissance,
			couleur, 
			marque,
			annee_mise_en_circulation
		});

		return res.status(201).send(Helper.ResponseData(201, "Created", null, user));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

const destroy = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params
        const vehicule = await Vehicule.findByPk(id)

        if (!vehicule) {
			return res.status(404).send({
				status: 404,
				message: "Data Not Found",
				data: null
			});
		}

        await vehicule.destroy()
        return res.status(200).send(Helper.ResponseData(200, "Vehicule destroy", null, ""));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

export default { GetAll, create, destroy }