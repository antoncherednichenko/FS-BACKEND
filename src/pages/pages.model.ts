
import { Column, Table, DataType, Model } from "sequelize-typescript";
import { IFeature, IPagesAttrs } from "./types";

@Table({ tableName: 'pages' })
export class Pages extends Model<Pages, IPagesAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.ARRAY(DataType.JSON), unique: false, allowNull: true }  )
    features: IFeature[]

    @Column({ type: DataType.STRING, unique: true })
    pageName: string
}