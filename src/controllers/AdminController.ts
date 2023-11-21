import { Request, Response } from "express";
import Admin from "../db/models/admin";
import Helper from "../helpers/Helper";
import PasswordHelper from '../helpers/PasswordHelper'

const Register = async (req: Request, res: Response): Promise<Response> => {

    try {
		const { nom, prenom, telephone, email, password, photo } = req.body

		const hashed = await PasswordHelper.PasswordHashing(password);

		const user = await Admin.create({
			nom,
            prenom,
			telephone, 
			email, 
			password: hashed,
			photo
		});

		return res.status(201).send(Helper.ResponseData(201, "Created", null, user));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

const Login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({
            where: {
                email: email
            }
        })

        if (!admin) {
			return res.status(401).send(Helper.ResponseData(401, "Unauthorized", null, null));
		}

		const matched = await PasswordHelper.PasswordCompare(password,  admin?.password)

		if (!matched) {
			return res.status(401).send(Helper.ResponseData(401, "Unauthorized", null, null));
		}

        const dataAdmin = {
			nom: admin.nom,
            prenom: admin.prenom,
			telephone: admin.telephone, 
			email: admin.email, 
			photo: admin.photo
		};
		const token = Helper.GenerateToken(dataAdmin);
		const refreshToken = Helper.GenerateRefreshToken(dataAdmin);
        admin.accessToken = refreshToken;

		await admin.save();
        
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		});

		const responseAdmin = {
			nom: admin.nom,
            prenom: admin.prenom,
			telephone: admin.telephone, 
			email: admin.email, 
			photo: admin.photo,
			token: token
		}
		return res.status(200).send(Helper.ResponseData(200, "OK", null, responseAdmin));

    } catch (error) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

const Logout = async (req: Request, res: Response): Promise<Response> => {
	try {
		const refreshToken = req.cookies?.refreshToken;

		if (!refreshToken) {
			return res.status(200).send(Helper.ResponseData(200, "Admin logout", null, null));
		}

		const email = res.locals.email;
		const admin = await Admin.findOne({
            where: {
                email: email
            }
        })

		if (!admin) {
			res.clearCookie("refreshToken");
			return res.status(200).send(Helper.ResponseData(200, "Admin logout", null, null));
		}

		await admin.update({ accessToken: null }, { where: { email: email } });
		res.clearCookie("refreshToken");

		return res.status(200).send(Helper.ResponseData(200, "Admin logout", null, null));
	} catch (error) {
		return res.status(500).send(Helper.ResponseData(500, "", error, null));
	}
}

export default { Register, Login, Logout }