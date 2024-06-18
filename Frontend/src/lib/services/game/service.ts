import axios from "axios";
import { Cell, Player } from "./types";

const basePath: string = "/api/games";

// FIX THESE ANY TYPES!
export interface GameApi {
  getAllGames: () => Promise<any>;
  getGame: (id: string, player: Player) => Promise<any>;
  createGame: (player: Player, gameTitle: string) => Promise<any>;
  makeGameMove: (cell: Cell, id: string) => Promise<any>;
  resetGameBoard: (id: string) => Promise<any>;
  leaveGame: (id: string, player: Player) => Promise<any>;
  removeEmptyGames: () => Promise<any>;
}

type GameService = () => GameApi;

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

export const gameService: GameService = () => ({
  getAllGames: async () => {
    try {
      const res = await axiosInstance.get(`${basePath}`);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },

  getGame: async (id: string, player: Player) => {
    try {
      const res = await axiosInstance.post(`${basePath}/game/${id}`, {
        player: player,
      });
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
  createGame: async (player: Player, gameTitle: string) => {
    try {
      const res = await axiosInstance.post(`${basePath}/create`, {
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
      const res = await axiosInstance.post(`${basePath}/game/${id}/move`, {
        cell: cell,
      });
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
  resetGameBoard: async (id: string) => {
    try {
      const res = await axiosInstance.get(`${basePath}/game/${id}/reset`);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
  leaveGame: async (id: string, player: Player) => {
    try {
      await axiosInstance.post(`${basePath}/game/${id}/leave`, {
        player: player,
      });
      return;
    } catch (e) {
      console.error(e);
    }
  },
  removeEmptyGames: async () => {
    try {
      await axiosInstance.delete(`${basePath}/remove`);
      return;
    } catch (e) {
      console.error(e);
    }
  },
});
