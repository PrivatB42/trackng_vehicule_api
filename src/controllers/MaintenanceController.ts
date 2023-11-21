import { Request, Response } from "express";
import Maintenance from "../db/models/maintenance";
import Helper from "../helpers/Helper";

const GetAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const maintenances = await Maintenance.findAll()
        return res.status(201).send(Helper.ResponseData(201, "Get all", null, maintenances));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

const create = async (req: Request, res: Response): Promise<Response> => {
    try {
		const { numero_facture, saisie_reparation, montant } = req.body
        const { chauffeurId } = req.params

		const maintenance = await Maintenance.create({
			numero_facture,
            saisie_reparation,
			montant,
            chauffeurId: chauffeurId
		});

		return res.status(201).send(Helper.ResponseData(201, "Created", null, maintenance));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

const destroy = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params
        const maintenance = await Maintenance.findByPk(id)

        if (!maintenance) {
			return res.status(404).send({
				status: 404,
				message: "Data Not Found",
				data: null
			});
		}

        await maintenance.destroy()
        return res.status(200).send(Helper.ResponseData(200, "Vehicule destroy", null, ""));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

export default { GetAll, create, destroy }