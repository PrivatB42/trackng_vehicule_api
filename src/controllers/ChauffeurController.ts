import { Request, Response, NextFunction } from "express";
import PasswordHelper from "../helpers/PasswordHelper";
import Chauffeur from "../db/models/chauffeur";
import Helper from "../helpers/Helper";

const GetAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const chauffeurs = await Chauffeur.findAll()
        return res.status(201).send(Helper.ResponseData(201, "Get all", null, chauffeurs));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

const Register = async (req: Request, res: Response): Promise<Response> => {

    try {
		const { nom, prenom, date_naissance, numero_piece_identite, telephone, adresse, salaire, username, password  } = req.body

		const hashed = await PasswordHelper.PasswordHashing(password);

		const user = await Chauffeur.create({
			nom,
            prenom,
			date_naissance, 
            numero_piece_identite, 
            telephone, 
            adresse, 
            salaire, 
            username,
			password: hashed
		});

		return res.status(201).send(Helper.ResponseData(201, "Created", null, user));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

const Login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = req.body

        const chauffeur = await Chauffeur.findOne({
            where: {
                username: username
            }
        })

        if (!chauffeur) {
			return res.status(401).send(Helper.ResponseData(401, "Unauthorized", null, null));
		}

		const matched = await PasswordHelper.PasswordCompare(password,  chauffeur?.password)

		if (!matched) {
			return res.status(401).send(Helper.ResponseData(401, "Unauthorized", null, null));
		}

        const dataChauffeur = {
			nom: chauffeur.nom,
            prenom: chauffeur.prenom,
			date_naissance: chauffeur.date_naissance, 
            numero_piece_identite: chauffeur.numero_piece_identite, 
            telephone: chauffeur.telephone, 
            adresse: chauffeur.adresse, 
            salaire: chauffeur.salaire, 
            username: chauffeur.username,
		};
		const token = Helper.GenerateToken(dataChauffeur);
		const refreshToken = Helper.GenerateRefreshToken(dataChauffeur);
        chauffeur.accessToken = refreshToken;

		await chauffeur.save();
        
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		});

		const responseChauffeur = {
            id: chauffeur.id,
			nom: chauffeur.nom,
            prenom: chauffeur.prenom,
			date_naissance: chauffeur.date_naissance, 
            numero_piece_identite: chauffeur.numero_piece_identite, 
            telephone: chauffeur.telephone, 
            adresse: chauffeur.adresse, 
            salaire: chauffeur.salaire, 
            username: chauffeur.username,
			token: token
		}
		return res.status(200).send(Helper.ResponseData(200, "OK", null, responseChauffeur));

    } catch (error) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

const destroy = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params
        const chauffeur = await Chauffeur.findByPk(id)

        if (!chauffeur) {
			return res.status(404).send({
				status: 404,
				message: "Data Not Found",
				data: null
			});
		}

        await chauffeur.destroy()
        return res.status(200).send(Helper.ResponseData(200, "Chauffeur destroy", null, ""));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

export default { GetAll, Register, Login, destroy }