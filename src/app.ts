import express from "express";
import { envs } from "./config/env";
import { MongoDatabase } from "./data/init";
import { AppRoutes } from "./presentation/router";
import { emailJob } from "./domain/jobs/email.job";
import { UserModel } from "./data/models/user.models";
import { EventModel } from "./data/models/event.models";

console.log(`Starting server on PORT: ${envs.PORT}`);

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async () => {
    try {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONDO_DB
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1); 
    }
})();

app.listen(envs.PORT, async () => {
    console.log(`Server running on PORT ${envs.PORT}`);

    try {
        const user = await UserModel.findOne({});
        const event = await EventModel.findOne({});

        if (!user || !event) {
            console.warn("Usuario o evento no encontrados. No se ejecutará el job de correo.");
            return; 
        }

        console.log(`Usuario encontrado: ${user._id}`);
        console.log(`Evento encontrado: ${event._id}`);

        emailJob(user._id.toString(), event._id.toString());

    } catch (error) {
        console.error("Error al obtener datos para emailJob:", error);
    }
});