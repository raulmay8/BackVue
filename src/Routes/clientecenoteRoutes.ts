import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../Middleware";
import { createClienteCenote, deleteClienteCenote, getClienteCenote, getClienteCenoteById, updateClienteCenote } from "../Handlers/clientecenote";

const clienteCenote = Router()

clienteCenote.get('/reserva', getClienteCenote)

clienteCenote.get('/:token', 
    param('token').isInt().withMessage('Id no válido'),
    handleInputErrors,
    getClienteCenoteById
)

clienteCenote.post('/',
    body('clienteId')
        .notEmpty().withMessage('Información necesaria'),
    body('cenoteId')
        .notEmpty().withMessage('Información necesaria'),
    body('precioTotal')
        .notEmpty().withMessage('Ingresa su precio'),

    handleInputErrors,
    createClienteCenote
)

clienteCenote.put('/:token',
    param('token').isInt().withMessage('Id no válido'),
    body('clienteId')
        .notEmpty().withMessage('Información necesaria'),
    body('cenoteId')
        .notEmpty().withMessage('Información necesaria'),
    body('precioTotal')
        .notEmpty().withMessage('Ingresa su precio'),

    handleInputErrors,
    updateClienteCenote
)

clienteCenote.delete('/:token',
    param('token').isInt().withMessage('Id no válido'),

    handleInputErrors,
    deleteClienteCenote
)

export default clienteCenote