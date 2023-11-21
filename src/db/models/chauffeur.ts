import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface ChauffeurAttributes {
	id?: number,
    nom?: string | null,
    prenom?: string | null,
    date_naissance?: Date | null,
    numero_piece_identite?: string | null,
    telephone?: string | null,
    adresse?: string | null,
    salaire?: number | null,
    username?: string | null,
    password?: string | null,
    accessToken?: string | null,
	createdAt?: Date,
	updatedAt? : Date
}
  
export interface ChauffeurInput extends Optional<ChauffeurAttributes, 'id'>{ }
export interface ChauffeurOutput extends Required<ChauffeurAttributes>{ }
  
class Chauffeur extends Model<ChauffeurAttributes, ChauffeurInput> implements ChauffeurAttributes {
  public id!: number;
  public nom!: string;
  public prenom!: string;
  public date_naissance!: Date;
  public numero_piece_identite!: string;
  public telephone!: string;
  public adresse!: string;
  public salaire!: number;
  public username!: string;
  public password!: string;
  public accessToken!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}


Chauffeur.init({
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	nom: {
		type: DataTypes.STRING,
		allowNull: false
	},
	prenom: {
		type: DataTypes.STRING,
		allowNull: false
	},
	date_naissance: {
		type: DataTypes.DATE,
		allowNull: false
	},
    numero_piece_identite: {
		type: DataTypes.STRING,
		allowNull: false
	},
    telephone: {
		type: DataTypes.STRING,
		allowNull: false
	},
    adresse: {
		type: DataTypes.STRING,
		allowNull: false
	},
    salaire: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
    username: {
		type: DataTypes.STRING,
		allowNull: false
	},
    password: {
		type: DataTypes.STRING,
		allowNull: false
	},
    accessToken: {
		type: DataTypes.TEXT,
		allowNull: true
	},
}, {
	timestamps: true,
	sequelize: connection,
	underscored: false
});

export default Chauffeur;