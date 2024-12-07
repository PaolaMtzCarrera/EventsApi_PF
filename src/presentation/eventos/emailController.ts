import { Request, Response } from "express";
import { emailJob } from "../../domain/jobs/email.job";

export class EmailController {
    public scheduleEmailJob = (req: Request, res: Response) => {
        const { userId, eventId } = req.body;

        if (!userId || !eventId) {
            return res.status(400).json({ message: "userId y eventId son requeridos" });
        }
        emailJob(userId, eventId);

        res.status(200).json({ message: "Job programado exitosamente" });
    };
}