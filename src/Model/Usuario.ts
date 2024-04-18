import { Table, Column, Model, DataType, Default, HasOne } from 'sequelize-typescript';
import Token from './Token';

@Table({
    tableName: 'usuarios'
})
class Usuario extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare nameUsuario: string;

    @Column({
        type: DataType.STRING(100),
        unique: true,
    })
    declare correoUsuario: string;
    
    @Column({
        type: DataType.STRING(100)
    })
    declare password: string;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
    
    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmado: Boolean

    @HasOne(() => Token)
    declare token: Token;
}

export default Usuario;
