import cron from "node-cron";
import { EmailService } from "../services/email.service";
import { EventModel } from "../../data/models/event.models";
import { UserModel } from "../../data/models/user.models";
import { generateMonoMapEmailTemplate } from "../template/email.template";

export const emailJob = (userId: string, eventId: string) => {
    const emailService = new EmailService();

    cron.schedule("*/10 * * * * *", async () => {
        console.log("Cron ejecutado cada 10 segundos");

        try {
            const event = await EventModel.findById(eventId);
            if (!event) {
                console.log(`Evento con ID: ${eventId} no encontrado`);
                return;
            }

            const user = await UserModel.findById(userId);
            if (!user) {
                console.log(`Usuario con ID: ${userId} no encontrado`);
                return;
            }


            const userev = await UserModel.find({ isEmailSent: false });
            if (!userev.length) {
                console.log("No hay casos pendientes de enviar");
                return;
            }

            const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();

            const htmlBody = generateMonoMapEmailTemplate( 
                event.lat,          
                event.lng,
                event.name,         
                event.description,  
                randomCode     
            );

            await emailService.sendEmail({
                to: user.email,
                subject: `Detalles del Evento: ${event.name}`,
                htmlBody,
            });

            console.log(`Correo enviado a ${user.email} con la información del evento ${event.name}`);

        } catch (error) {
            console.error("Error al enviar el correo desde el job:", error);
        }
    });
};
