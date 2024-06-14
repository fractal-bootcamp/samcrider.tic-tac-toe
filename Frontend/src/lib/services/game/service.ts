import axios from "axios";

const baseUrl: string = "/api/games";

// FIX THESE ANY TYPES!
export interface GameApi {
  getAllGames: () => Promise<any>;
  getGame: (id: string) => Promise<any>;
  createGame: () => Promise<any>;
  makeGameMove: () => Promise<any>;
  resetGameBoard: () => Promise<any>;
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
  getGame: async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/game/${id}`);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
  createGame: async () => {},
  makeGameMove: async () => {},
  resetGameBoard: async () => {},
  removeGame: async () => {},
});
