
import { 
    Model, 
    Table, 
    Column, 
    DataType 
} from 'sequelize-typescript'

export interface IUserAttrs {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number
    
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @Column({ type: DataType.STRING, unique: false, allowNull: false })
    password: string

    @Column({ type: DataType.STRING, unique: false, allowNull: false, defaultValue: "student" })
    role: string

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isBanned: boolean

    @Column({ type: DataType.STRING, unique: false, allowNull: true })
    banReason: string
}