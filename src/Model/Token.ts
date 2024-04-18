import {Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import Usuario from "./Usuario";

@Table({
    tableName: 'tokens'
})

class Token extends Model {
    @Column({
        type: DataType.STRING(100)  
    })
    declare token: string

    @ForeignKey(() => Usuario)
    declare usuarioId: number;

    @BelongsTo(() => Usuario)
    usuario: Usuario;
}

export default Token;
