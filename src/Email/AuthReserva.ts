import { transporter } from "../Config/nodemailer";

interface IReserva{
    correoCliente: string,
    nameCliente: string,
    token: string
}

export class AuthReserva {
    static sendConfirmationReserva = async(clientes : IReserva) =>{
        await transporter.sendMail({
            from: 'Cenotes Homun <admin@saitgo.com>',
            to: clientes.correoCliente,
            subject: 'Cenotes Homun - Reserva exitosa',
            text: 'Cenotes Homun - Reserva exitosa',
            html: `<p>Hola: ${clientes.nameCliente}, su reserva a sido programada, puede buscar su reserva en </p>
                    <p>Visita el siguiente enlace:</p>
                    <a href="http://localhost:5173/busquedaReserva">Busca tu reserva</a>
                    <p>Id de tu reserva <b>${clientes.token}</b></p>
                    `
        })
    }
}