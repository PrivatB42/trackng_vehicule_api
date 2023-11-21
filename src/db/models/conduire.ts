import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface ConduireAttributes {
	id?: number,
    id_vehicule?: string | null,
    id_chauffeur?: Text | null,
    date?: Date | null
	createdAt?: Date,
	updatedAt? : Date
}
  
export interface ConduireInput extends Optional<ConduireAttributes, 'id'>{ }
export interface ConduireOutput extends Required<ConduireAttributes>{ }
  
class Conduire extends Model<ConduireAttributes, ConduireInput> implements ConduireAttributes {
  public id!: number;
  public id_vehicule!: string;
  public id_chauffeur!: Text;
  public date!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}


Conduire.init({
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	id_vehicule: {
		type: DataTypes.BIGINT,
		allowNull: false
	},
	id_chauffeur: {
		type: DataTypes.BIGINT,
		allowNull: false
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false
	}
}, {
	timestamps: true,
	sequelize: connection,
	underscored: false
});

export default Conduire;