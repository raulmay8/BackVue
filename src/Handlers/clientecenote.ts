import { Request, Response } from "express"
import ClienteCenote from "../Model/ClienteCenote"
import Cliente from "../Model/Cliente"
import Cenote from "../Model/Cenote"
import { AuthReserva } from "../Email/AuthReserva"
import { generateToken } from "../Helpers/token"

export const getClienteCenote = async (req: Request, res: Response) => {
    try {
        const clice = await ClienteCenote.findAll({include: [Cliente, Cenote]})

        res.json({data : clice})
    } catch (error) {
        console.log(error)
    }
}

export const getClienteCenoteById = async (req: Request, res: Response) => {
    try {
        const {token} = req.params
        const clice = await ClienteCenote.findOne({ where: { token }, include: [Cliente, Cenote] });
        if(!clice){
            return res.status(404).json({
                error : 'Información no encontrada'
            })
        }
        res.json({data: clice})
    } catch (error) {
        console.log(error)
    }
}

export const createClienteCenote = async(req: Request, res: Response) => {
    try {
        const token = generateToken();
        const clice = await ClienteCenote.create({ ...req.body, token })

        const clienteCenoteWithCliente = await ClienteCenote.findOne({
            where: { token },
            include: [Cliente]
        });
        const cliente = clienteCenoteWithCliente.dataValues.cliente;
        
        AuthReserva.sendConfirmationReserva({
            correoCliente: cliente.correoCliente,
            nameCliente: cliente.nameCliente,
            token
        });
        res.json({data: clice})
    } catch (error) {
        console.log(error)
    }
}

export const updateClienteCenote = async(req: Request, res: Response) => {
    try {
        const {token} = req.params
        const clice = await ClienteCenote.findOne({ where: { token } });

        if(!clice){
            return res.status(404).json({
                error : 'Información no encontrada'
            })
        }
        await clice.update(req.body)
        await clice.save()

        res.json({data : clice})
    } catch (error) {
        console.log(error)
    }
}

export const deleteClienteCenote = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const deletedRows = await ClienteCenote.destroy({ where: { token } });

        if (deletedRows === 0) {
            return res.status(404).json({
                error: 'Información no encontrada'
            });
        }

        res.json({ data: 'Información eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ocurrió un error al intentar eliminar la información.' });
    }
};
