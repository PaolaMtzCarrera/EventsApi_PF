import cron from "node-cron";
import { EmailService } from "../services/email.service";
import { EventModel } from "../../data/models/event.models";
import { UserModel } from "../../data/models/user.models";
import { generateMonoMapEmailTemplate } from "../template/email.template";

export const emailJob = (userId: string, eventId: string) => {
    const emailService = new EmailService();

    const job = cron.schedule("*/10 * * * * *", async () => {
        console.log("Cron ejecutado cada 10 segundos");

        try {
            const event = await EventModel.findById(eventId);
            const user = await UserModel.findById(userId);

            if (!event || !user) {
                console.log("Usuario o evento no encontrado, deteniendo cron.");
                job.stop(); // Detener el cron si algo falta
                return;
            }

            if (user.isEmailSent) {
                console.log("Correo ya fue enviado, deteniendo cron.");
                job.stop(); // Detener el cron si ya se envió
                return;
            }

            const htmlBody = generateMonoMapEmailTemplate(
                event.lat,
                event.lng,
                event.name,
                event.description,
                Math.random().toString(36).substring(2, 10).toUpperCase()
            );

            await emailService.sendEmail({
                to: user.email,
                subject: `Detalles del Evento: ${event.name}`, 
                htmlBody,
            });

            console.log(`Correo enviado a ${user.email}`); 

            // Actualizar al usuario para marcar como enviado
            await UserModel.findByIdAndUpdate(userId, { isEmailSent: true });

            // Detener el cron una vez enviado el correo
            job.stop();
        } catch (error) {
            console.error("Error al enviar el correo desde el job:", error);
            job.stop(); // Detén el cron también en caso de error
        }
    });
};