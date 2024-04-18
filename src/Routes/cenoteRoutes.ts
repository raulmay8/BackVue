import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../Middleware";
import { createCenote, deleteCenote, getCenoteById, getCenotes, updateCenote } from "../Handlers/cenote";

const cenoteRoutes = Router()

cenoteRoutes.get('/', getCenotes)

cenoteRoutes.get('/:id', 
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    getCenoteById
)

cenoteRoutes.post('/',
    body('nameCenote')
        .notEmpty().withMessage('El nombre del cenote es obligatorio'),
    body('significado')
        .notEmpty().withMessage('Ingresa su significado'),
    body('descripcion')
        .notEmpty().withMessage('No puede ir vacío'),
    body('precio')
        .notEmpty().withMessage('Ingresa su precio'),
    body('url')
        .notEmpty().withMessage('Guarda una url para la imagen'),
    
    handleInputErrors,
    createCenote
)

cenoteRoutes.put('/:id',
    param('id').isInt().withMessage('Id no válido'),
    body('nameCenote')
        .notEmpty().withMessage('El nombre del cenote es obligatorio'),
    body('significado')
        .notEmpty().withMessage('Ingresa su significado'),
    body('descripcion')
        .notEmpty().withMessage('No puede ir vacío'),
    body('precio')
        .notEmpty().withMessage('Ingresa su precio'),
    body('url')
        .notEmpty().withMessage('Guarda una url para la imagen'),

    handleInputErrors,
    updateCenote
)

cenoteRoutes.delete('/:id',
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    deleteCenote
)
export default cenoteRoutes