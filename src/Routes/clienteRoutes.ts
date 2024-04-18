import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../Middleware";
import { createCliente, deleteCliente, getClienteById, getClientes, updateCliente } from "../Handlers/cliente";

const clienteRoutes = Router()

clienteRoutes.get('/cliente', getClientes)

clienteRoutes.get('/:id',  
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors, 
    getClienteById
)

clienteRoutes.post('/',
    body('nameCliente')
        .notEmpty().withMessage('Información necesaria'),
    body('apellidoCliente')
        .notEmpty().withMessage('Información necesaria'),
    body('correoCliente')
        .isEmail().withMessage('El email no es válido'),
    body('telefono')
        .notEmpty().withMessage('Información necesaria'),
    body('fechaLlegada')
        .notEmpty().withMessage('Información necesaria'),
    body('horaLlegada')
        .notEmpty().withMessage('Información necesaria'),
    body('personas')
        .notEmpty().withMessage('Información necesaria'),
    body('notas'),

    handleInputErrors,
    createCliente
)

clienteRoutes.put('/:id',
    param('id').isInt().withMessage('Id no válido'),
    body('nameCliente')
        .notEmpty().withMessage('Información necesaria'),
    body('apellidoCliente')
        .notEmpty().withMessage('Información necesaria'),
    body('correoCliente')
        .isEmail().withMessage('El email no es válido'),
    body('telefono')
        .notEmpty().withMessage('Información necesaria'),
    body('fechaLlegada')
        .notEmpty().withMessage('Información necesaria'),
    body('horaLlegada')
        .notEmpty().withMessage('Información necesaria'),
    body('personas')
        .notEmpty().withMessage('Información necesaria'),
    body('notas'),

    handleInputErrors,
    updateCliente
)

clienteRoutes.delete('/:id',
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    deleteCliente
)
export default clienteRoutes