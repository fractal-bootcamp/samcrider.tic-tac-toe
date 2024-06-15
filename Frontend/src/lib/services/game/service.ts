import axios from "axios";
import { Cell, Player } from "./types";

const baseUrl: string = "/api/games";

// FIX THESE ANY TYPES!
export interface GameApi {
  getAllGames: () => Promise<any>;
  getGame: (id: string, player: Player) => Promise<any>;
  createGame: () => Promise<any>;
  makeGameMove: (cell: Cell, id: string) => Promise<any>;
  resetGameBoard: (id: string) => Promise<any>;
  hydrateGame: (id: string) => Promise<any>;
  removeGame: () => Promise<any>;
}

type GameService = () => GameApi;

export const gameService: GameService = () => ({
  getAllGames: async () => {
    try {
      const res = await axios.get(`${baseUrl}`);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
  hydrateGame: async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/game/${id}`);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
  getGame: async (id: string, player: Player) => {
    try {
      const res = await axios.post(`${baseUrl}/game/${id}`, { player: player });
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
  createGame: async () => {},
  makeGameMove: async (cell: Cell, id: string) => {
    try {
      const res = await axios.post(`${baseUrl}/game/${id}/move`, {
        cell: cell,
      });
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
  resetGameBoard: async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/game/${id}/reset`);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
  removeGame: async () => {},
});
