import { Request, Response } from "express"
import { checkPassword, hashPassword } from "../Helpers/auth"
import { generateToken } from "../Helpers/token"
import { AuthEmail } from "../Email/AuthEmail"
import Token from "../Model/Token"
import Usuario from "../Model/Usuario"


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await Usuario.findAll()
        res.json({data:users})
    } catch (error) {
        console.log(error)
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const user = await Usuario.findByPk(id)
        if(!user){
            return res.status(404).json({
                error: 'Información no encontrada'
            })
        }
        res.json({data : user})
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { password, correoUsuario } = req.body

        //Prevenir emails duplicados
        const userExists = await Usuario.findOne({ where: {correoUsuario}})
        if(userExists){
            const error = new Error('El usuario ya está registrado')
            return res.status(409).json({error: error.message})
        }

        //Hashear password
        const user = new Usuario(req.body)
        user.password = await hashPassword(password)
        await user.save()

        //Crea nuevo token y lo asigna al usuario
        const token = new Token()
        token.token = generateToken()
        token.usuarioId = user.id
        await token.save()

        //Enviar email
        AuthEmail.sendConfirmationEmail({
            correoUsuario: user.correoUsuario,
            nameUsuario: user.nameUsuario,
            token: token.token
        })

        res.json({data : user})
    } catch (error) {
        
    }
}

export const confirmAccount = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;

        const tokenExists = await Token.findOne({ where: { token } });
        if (!tokenExists) {
            const error = new Error('Token no válido');
            return res.status(401).json({ error: error.message });
        }
        const user = await Usuario.findByPk(tokenExists.usuarioId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        user.confirmado = true;
        await Promise.all([user.save(), tokenExists.destroy()]);

        res.send('Cuenta confirmada correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { password, correoUsuario } = req.body
        const user = await Usuario.findOne({ where: {correoUsuario}})

        if(!user){
            const error = new Error('Usuario no encontrado')
            return res.status(401).json({error: error.message})
        }
        if(!user.confirmado){
            const token = new Token()
            token.token = generateToken()
            token.usuarioId = user.id
            await token.save()

            //Enviar email
            AuthEmail.sendConfirmationEmail({
                correoUsuario: user.correoUsuario,
                nameUsuario: user.nameUsuario,
                token: token.token
            })
            const error = new Error('La cuenta no ha sido confirmada, hemos enviado un email de confirmación')
            return res.status(401).json({error: error.message})
            }
            const isPasswordCorrect = await checkPassword(password, user.password)
            if(!isPasswordCorrect){
                const error = new Error('Contraseña incorrecta')
                return res.status(401).json({error: error.message})
            }
            return res.json({token: generateToken()})
    } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error'})
    }
}

export const updateUser = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params
        const user = await Usuario.findByPk(id)

        if(!user) {
            return res.status(404).json({
                error: 'Información no encontrada'
            })
        }

        await user.update(req.body)
        await user.save()

        res.json({data : user})
    } catch (error) {
        console.error(error)
    }
}

export const updateAvailabilityUser = async (req: Request, res: Response) => {
    const {id} = req.params
        const user = await Usuario.findByPk(id)

        if(!user) {
            return res.status(404).json({
                error: 'Información no encontrada'
            })
        }

        user.availability = !user.dataValues.availability
        await user.save()
        res.json({data : user})
        console.log(user.dataValues)
}

export const deleteUser = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params
        const user = await Usuario.findByPk(id)

        if(!user) {
            return res.status(404).json({
                error: 'Información no encontrada'
            })
        }
        await user.destroy()
        res.json({data : "Información eliminada"})

    } catch (error) {
        console.error(error)
    }
}