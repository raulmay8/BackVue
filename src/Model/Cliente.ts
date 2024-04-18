import { Table, Column, Model, DataType, AllowNull, BelongsToMany } from 'sequelize-typescript';
import Cenote from './Cenote';
import ClienteCenote from './ClienteCenote';

@Table({
    tableName: 'clientes'
})
class Cliente extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare nameCliente: string;

    @Column({
        type: DataType.STRING(100)
    })
    declare apellidoCliente: string;
    
    @Column({
        type: DataType.STRING(100)
    })
    declare correoCliente: string;
    
    @Column({
        type: DataType.STRING(100)
    })
    declare telefono: String

    @Column({
        type: DataType.DATE
    })
    declare fechaLlegada: Date

    @Column({
        type: DataType.TIME
    })
    declare horaLlegada: String

    @Column({
        type: DataType.INTEGER
    })
    declare personas: number

    @AllowNull
    @Column({
        type: DataType.TEXT
    })
    declare notas: string;

    @BelongsToMany(() => Cenote, () => ClienteCenote)
    cenotes: Cenote[];
  
}

export default Cliente;
