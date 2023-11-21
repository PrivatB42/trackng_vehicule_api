import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface CarburantAttributes {
	id?: number,
    numero_facture?: string | null,
    nombre_litre?: number | null,
    montant?: number | null,
    chauffeurId?: string | null,
	createdAt?: Date,
	updatedAt? : Date
}
  
export interface CarburantInput extends Optional<CarburantAttributes, 'id'>{ }
export interface CarburantOutput extends Required<CarburantAttributes>{ }
  
class Carburant extends Model<CarburantAttributes, CarburantInput> implements CarburantAttributes {
  public id!: number;
  public numero_facture!: string;
  public saisie_reparation!: Text;
  public montant!: number;
  public chauffeurId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}


Carburant.init({
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	numero_facture: {
		type: DataTypes.STRING,
		allowNull: false
	},
	montant: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	nombre_litre: {
		type: DataTypes.NUMBER,
		allowNull: false
	},
    chauffeurId: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
	timestamps: true,
	sequelize: connection,
	underscored: false
});

export default Carburant;