import { Router } from "express";
import { EventRoutes } from "./eventos/router";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use("/api/events", EventRoutes.routes);
        return router;
    }
}
