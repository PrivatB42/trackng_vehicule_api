import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface VehiculeAttributes {
	id?: number,
    immatriculation_vehicule?: string | null,
    puissance?: string | null,
    couleur?: string | null,
    marque?: string | null,
    annee_mise_en_circulation?: Date | null,
	createdAt?: Date,
	updatedAt? : Date
}
  
export interface VehiculeInput extends Optional<VehiculeAttributes, 'id'>{ }
export interface VehiculeOutput extends Required<VehiculeAttributes>{ }
  
class Vehicule extends Model<VehiculeAttributes, VehiculeInput> implements VehiculeAttributes {
  public id!: number;
  public immatriculation_vehicule!: string;
  public puissance!: string;
  public couleur!: string;
  public marque!: string;
  public annee_mise_en_circulation!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}


Vehicule.init({
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	immatriculation_vehicule: {
		type: DataTypes.STRING,
		allowNull: false
	},
	puissance: {
		type: DataTypes.STRING,
		allowNull: false
	},
    couleur: {
		type: DataTypes.STRING,
		allowNull: false
	},
    marque: {
		type: DataTypes.STRING,
		allowNull: false
	},
    annee_mise_en_circulation: {
		type: DataTypes.DATE,
		allowNull: false
	},
}, {
	timestamps: true,
	sequelize: connection,
	underscored: false
});

export default Vehicule;