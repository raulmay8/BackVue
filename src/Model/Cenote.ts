import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import Cliente from './Cliente';
import ClienteCenote from './ClienteCenote';

@Table({
    tableName: 'cenotes'
})
class Cenote extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare nameCenote: string;

    @Column({
        type: DataType.STRING(100)
    })
    declare significado: string;
    
    @Column({
        type: DataType.TEXT
    })
    declare descripcion: string;

    @Column({
        type: DataType.INTEGER
    })
    declare precio: number
    
    @Column({
        type: DataType.STRING(100)
    })
    declare url: String

    @BelongsToMany(() => Cliente, () => ClienteCenote)
    clientes: Cliente[];
}

export default Cenote;
