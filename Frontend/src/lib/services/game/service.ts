import axios from "axios";
import { Cell, Player } from "./types";

const baseUrl: string = "/api/games";

// FIX THESE ANY TYPES!
export interface GameApi {
  getAllGames: () => Promise<any>;
  getGame: (id: string, player: Player) => Promise<any>;
  createGame: (player: Player, gameTitle: string) => Promise<any>;
  makeGameMove: (cell: Cell, id: string) => Promise<any>;
  resetGameBoard: (id: string) => Promise<any>;
  hydrateGame: (id: string) => Promise<any>;
  leaveGame: (id: string, player: Player) => Promise<any>;
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
  createGame: async (player: Player, gameTitle: string) => {
    try {
      const res = await axios.post(`${baseUrl}/create`, {
        gameTitle: gameTitle,
        player: player,
      });
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
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
  leaveGame: async (id: string, player: Player) => {
    try {
      await axios.post(`${baseUrl}/game/${id}/leave`, {
        player: player,
      });
      return;
    } catch (e) {
      console.error(e);
    }
  },
  removeGame: async () => {},
});
