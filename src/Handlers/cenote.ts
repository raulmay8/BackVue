import { Request, Response } from "express"
import Cenote from "../Model/Cenote"

export const getCenotes = async (req: Request, res: Response) =>{
    try {
        const cenote = await Cenote.findAll()
        res.json({data:cenote})
    } catch (error) {
        console.log(error)
    }
}

export const getCenoteById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const cenote = await Cenote.findByPk(id)
        if(!cenote){
            return res.status(404).json({
                error : 'Información no encontrada'
            })
        }
        res.json({data: cenote})
    } catch (error) {
        console.log(error)
    }
}

export const createCenote = async(req: Request, res: Response) => {
    try {
        const cenote = await Cenote.create(req.body)
        res.json({data: cenote})
    } catch (error) {
        console.log(error)
    }
}

export const updateCenote = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        const cenote = await Cenote.findByPk(id)

        if(!cenote){
            return res.status(404).json({
                error : 'Información no encontrada'
            })
        }
        await cenote.update(req.body)
        await cenote.save()

        res.json({data : cenote})
    } catch (error) {
        console.log(error)
    }
}

export const deleteCenote = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        const cenote = await Cenote.findByPk(id)

        if(!cenote){
            return res.status(404).json({
                error: 'Información no encontrada'
            })
        }
        await cenote.destroy()
        res.json({data: 'Información eliminada'})
    } catch (error) {
        console.log(error)
    }
}