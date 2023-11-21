import { Request, Response } from "express";
import Conduire from "../db/models/conduire";
import Helper from "../helpers/Helper";

const create = async (req: Request, res: Response): Promise<Response> => {
    try {
		const { id_vehicule, id_chauffeur, date } = req.body

		const conduire = await Conduire.create({
			id_vehicule,
            id_chauffeur,
			date
		});

		return res.status(201).send(Helper.ResponseData(201, "Created", null, conduire));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

export default { create }