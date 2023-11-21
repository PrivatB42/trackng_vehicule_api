import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface AdminAttributes {
	id?: number,
	nom?: string | null,
	prenom?: string | null,
	telephone?: string | null,
	email?: string | null,
	password?: string |null,
  	accessToken?: string | null,
  	photo?: string | null,
	createdAt?: Date,
	updatedAt? : Date
}
  
export interface AdminInput extends Optional<AdminAttributes, 'id'>{ }
export interface AdminOutput extends Required<AdminAttributes>{ }
  
class Admin extends Model<AdminAttributes, AdminInput> implements AdminAttributes {
  public id!: number;
  public nom!: string;
  public prenom!: string;
  public telephone!: string;
  public email!: string;
  public password!: string;
  public accessToken!: string;
  public photo!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}


Admin.init({
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	nom: {
        type: DataTypes.STRING
    },
    prenom: {
        type: DataTypes.STRING
    },
    telephone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
  	accessToken: {
		type: DataTypes.TEXT,
		allowNull: true
	},
  	photo: {
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	tableName:"admins",
	timestamps: true,
	sequelize: connection,
	underscored: false
});

export default Admin;