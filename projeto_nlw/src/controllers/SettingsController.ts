import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { SettingsService } from "../services/SettingsService";


class SettingsController {

    async create(request: Request, response: Response){
        // Desestruturação
    const { chat, username } = request.body;

    const settingsService = new SettingsService();

    const settings = await settingsService.create({ chat, username });

    return response.json(settings);

    }
}

export { SettingsController }
