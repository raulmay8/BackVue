import { transporter } from "../Config/nodemailer";

interface IEmail{
    nameUsuario: string,
    correoUsuario: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (usuarios: IEmail) => {
        await transporter.sendMail({
            from: 'Cenotes Homun <admin@homun.com>',
            to: usuarios.correoUsuario,
            subject: 'Cenotes Homun - Confirma tu cuenta',
            text: 'Cenotes Homun - Confirma tu cuenta',
            html: `<p>Hola: ${usuarios.nameUsuario}, cuenta creada en Cenotes Homun, para completar el registro
                    por favor confirma tu cuenta </p>
                    <p>Visita el siguiente enlace: </p>
                    <a href="http://localhost:5173/confirm">Confirma tu cuenta</a>
                    <p>Y utiliza el código: <b>${usuarios.token}</b></p>`
        });
    }
}
