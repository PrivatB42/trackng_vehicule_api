import { Request, Response } from "express";
import Localisation from "../db/models/localisation";
import Helper from "../helpers/Helper";

const create = async (req: Request, res: Response): Promise<Response> => {
    try {
		const { latitude, longitude} = req.body
        const { chauffeurId } = req.params

		const localisation = await Localisation.create({
			latitude,
            longitude,
			//date,
            //heure,
            //vehiculeId: vehiculeId,
            chauffeurId: chauffeurId
		});

		return res.status(201).send(Helper.ResponseData(201, "Created", null, localisation));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { latitude, longitude} = req.body
        const { localisationId } = req.params;

        const localisation = await Localisation.findOne({
            where: {
                id: localisationId
            }
        })

        if(!localisation) {
            return res.status(404).send({
				status: 404,
				message: "Data Not Found",
				data: null
			});
        }

        localisation.latitude = latitude
        localisation.longitude = longitude
        //localisation.date = date
        //localisation.heure = heure

        localisation.save()

        return res.status(201).send(Helper.ResponseData(201, "Updated", null, localisation));

	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

export default { create, update }