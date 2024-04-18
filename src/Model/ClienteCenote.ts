import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import Cenote from './Cenote';
import Cliente from './Cliente';

@Table({
    tableName: 'clientes_cenotes'
})
class ClienteCenote extends Model {
    @Column({
        type: DataType.INTEGER
    })
    declare precioTotal: number

    @Column({
        type: DataType.STRING(100)  
    })
    declare token: string

    @ForeignKey(() => Cliente)
    @Column
    clienteId: number;

    @BelongsTo(() => Cliente)
    cliente: Cliente;

    @ForeignKey(() => Cenote)
    @Column
    cenoteId: number;

    @BelongsTo(() => Cenote)
    cenote: Cenote;
}

export default ClienteCenote;
