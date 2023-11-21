import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface MaintenanceAttributes {
	id?: number,
    numero_facture?: string | null,
    saisie_reparation?: Text | null,
    montant?: number | null,
    chauffeurId?: string |null,
	createdAt?: Date,
	updatedAt? : Date
}
  
export interface MaintenanceInput extends Optional<MaintenanceAttributes, 'id'>{ }
export interface MaintenanceOutput extends Required<MaintenanceAttributes>{ }
  
class Maintenance extends Model<MaintenanceAttributes, MaintenanceInput> implements MaintenanceAttributes {
  public id!: number;
  public numero_facture!: string;
  public saisie_reparation!: Text;
  public montant!: number;
  public chauffeurId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}


Maintenance.init({
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
	saisie_reparation: {
		type: DataTypes.TEXT,
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

export default Maintenance;