export interface IEvent {
    name: string;
    date: Date;
    description: string;
    lat: number;
    lng: number;
    creationDate: Date;
}

export interface IEventDocument extends Document, IEvent {}


export interface IEventDocument extends Document, IEvent {}