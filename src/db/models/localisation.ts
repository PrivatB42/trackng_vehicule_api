import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

type Time = Date | null;

interface LocalisationAttributes {
	id?: number,
    latitude?: number | null,
    longitude?: number | null,
    //date?: Date | null,
    //heure?: Time | null,
    chauffeurId?: string | null,
    //vehiculeId?: number | null,
	createdAt?: Date,
	updatedAt? : Date
}
  
export interface LocalisationInput extends Optional<LocalisationAttributes, 'id'>{ }
export interface LocalisationOutput extends Required<LocalisationAttributes>{ }
  
class Localisation extends Model<LocalisationAttributes, LocalisationInput> implements LocalisationAttributes {
  public id!: number;
  public latitude!: number;
  public longitude!: number;
  //public date!: Date;
  //public heure!: Time;
  public chauffeurId!: string;
  //public vehiculeId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}


Localisation.init({
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	latitude: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	longitude: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	/*date: {
		type: DataTypes.DATE,
		allowNull: false
	},
	heure: {
		type: DataTypes.TIME,
		allowNull: false
	},*/
    chauffeurId: {
		type: DataTypes.STRING,
		allowNull: false
	},
    /*vehiculeId: {
		type: DataTypes.BIGINT,
		allowNull: false
	}*/
}, {
	timestamps: true,
	sequelize: connection,
	underscored: false
});

export default Localisation;