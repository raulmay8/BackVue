import { Request, Response } from "express"
import Cliente from "../Model/Cliente"

export const getClientes = async (req: Request, res: Response) => {
    try {
        const clientes = await Cliente.findAll()
        res.json({data:clientes})
    } catch (error) {
        console.log(error)
    }
}

export const getClienteById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({
                error : 'Información no encontrada'
            })
        }

        res.json({data : cliente})
    } catch (error) {
        console.log(error)
    }
}

export const createCliente = async (req: Request, res: Response) => {
    try {
        const cliente = await Cliente.create(req.body)
        res.json({data:cliente})
    } catch (error) {
        console.log(error)
    }
}

export const updateCliente = async(req: Request, res: Response) =>  {
    try {
        const {id} = req.params
        const cliente = await Cliente.findByPk(id)

        if(!cliente){
            return res.status(404).json({
                error : 'Información no encontrada'
            })
        }
        await cliente.update(req.body)
        await cliente.save()

        res.json({data:cliente})
    } catch (error) {
        console.log(error)
    }
}

export const deleteCliente = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        const cliente = await Cliente.findByPk(id)
    
        if(!cliente){
            return res.status(404).json({
                error : 'Información no encontrada'
            })
        }
        await cliente.destroy()
        res.json({data : 'Información eliminada'})
    } catch (error) {
        console.log(error);
        
    }

}