import { Request, Response } from "express";
import { EventModel } from "../../data/models/event.models";

export class EventController {
    
    public getEvents = async (req: Request, res: Response) => {
        try {
            const events = await EventModel.find();
            res.json(events);
        } catch (error) {
            console.error(error);
        }
    }

    public getEventById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const event = await EventModel.findById(id);
            if (event) {
                res.json(event);
            } else {
                res.status(404).json({ message: "Evento no encontrado" });
            }
        } catch (error) {
            console.error(error);
        }
    }

    public createEvent = async (req: Request, res: Response) => {
        try {
            const { name, date, description, lat, lng } = req.body;
            const newEvent = await EventModel.create({ name, date, description, lat, lng });
            return res.status(201).json(newEvent);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al crear el evento" });
        }
    };      
}