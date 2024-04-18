import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../Middleware";
import { getUserById, getUsers, createUser, updateUser, updateAvailabilityUser, deleteUser, confirmAccount, login } from "../Handlers/usuario";
import Usuario from "../Model/Usuario";


const userRoutes = Router()


//Regresa todos los datos
userRoutes.get('/', getUsers)

//Regresa un dato de acuerdo al id
userRoutes.get('/:id',  
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors, 
    getUserById
)

//Crear nuevo dato
userRoutes.post('/register',

    body('correoUsuario')
        .isEmail().withMessage('El email no es válido'),
    body('nameUsuario')
        .notEmpty().withMessage('El nombre del usuario es obligatorio'),
    body('password')
        .isLength({min : 6}).withMessage('La contraseña debe ser mínimo de 6 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Las contraseñas no son iguales')
        }
        return true
    }),

    handleInputErrors,
    createUser
)

userRoutes.post('/login',
    body('correoUsuario')
        .isEmail().withMessage('El email no es válido'),
    body('password')
        .notEmpty().withMessage('La contraseña no puede ir vacía'),
    handleInputErrors,
    login
)

userRoutes.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El token no puede ir vacío'),
    handleInputErrors,
    confirmAccount
)

userRoutes.put('/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('correoUsuario')
        .notEmpty().withMessage('El email del usuario es obligatorio')
        .custom(async (value) => {
            const existingUser = await Usuario.findOne({ where: { correoUsuario: value } });
            if (existingUser) {
                throw new Error('Este email ya está siendo utilizado');
            }
        }),
    body('nameUsuario')
        .notEmpty().withMessage('El perfil del usuario es obligatorio'),
    body('password')
        .notEmpty().withMessage('La contraseña del usuario es obligatorio'),

    handleInputErrors,
    updateUser
)

userRoutes.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailabilityUser
)

userRoutes.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteUser
)
export default userRoutes