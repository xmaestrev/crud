import { Request, Response } from "express";

class IndexControllers {

    index (req: Request, res: Response) {
        res.json({text: "klk"});
    }
}

export const indexController = new IndexControllers();