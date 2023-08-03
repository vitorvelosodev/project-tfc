import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeams from './SequelizeTeams';

class SequelizeMatches
  extends Model<InferAttributes<SequelizeMatches>, InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatches.belongsTo(SequelizeTeams, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

SequelizeMatches.belongsTo(SequelizeTeams, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default SequelizeMatches;
