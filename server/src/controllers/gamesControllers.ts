import { request, Request, Response, text } from "express";
import pool from "../database";

class GamesController {

    public async list (req: Request, res: Response) {
        const games = await pool.query("SELECT * FROM games");
        res.json(games);
    }

    public async getOne(req: Request, res: Response){
        const { id } = req.params;
        const games = await pool.query("SELECT * FROM games WHERE id = ?", [id]);
        if (games.length > 0){
            return res.json(games[0]);
        }
        else{
            res.status(404).json({text: "El juego no existe"});
        }
        
    }

    public async create (req: Request, res: Response) {
        await pool.query("INSERT INTO games set ?", [req.body]);
        res.json( {message: "juego guardado"} );
    }

    public async delete (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query("DELETE FROM games WHERE id = ?", [id]);
        res.json({message: "El juego fue eliminado"});
    }

    public async update (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query("UPDATE games SET ? WHERE id = ?", [req.body, id]);
        res.json({message: "El juego fue actualizado"});
    }
}

const gamesController = new GamesController();
export default gamesController;