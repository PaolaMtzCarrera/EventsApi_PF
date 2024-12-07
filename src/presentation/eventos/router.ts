import { Router } from 'express';
import { EventController } from './eventController';
import { UserController } from './userController';
import { EmailController } from './emailController';

export class EventRoutes {
    static get routes(): Router {
        const router = Router();

        const eventController = new EventController();
        router.get('/events', eventController.getEvents);
        router.get('/events/:id', eventController.getEventById);
        router.post('/events', eventController.createEvent);

        const userController = new UserController();
        router.get('/users', userController.getUsers);
        router.post('/users', userController.createUser);

        const emailController = new EmailController();
        router.post('/schedule-email-job', emailController.scheduleEmailJob);

        return router;
    }
}
