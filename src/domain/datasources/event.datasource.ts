import { EventModel } from "../../data/models/event.models";
import { IEventDocument } from "../entities/event.entity";

export class EventDataSource {
    public async updateEvent(id: string, event: Partial<IEventDocument>) {
        await EventModel.findByIdAndUpdate(id, {
            name: event.name,
            date: event.date,
            description: event.description,
            lat: event.lat,
            lng: event.lng,
            creationDate: event.creationDate,
        });
    }
}