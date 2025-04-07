/// <reference path="./Roblox.d.ts"/>

export default class {
    public static async SearchGames(search: string): Promise<Roblox.GameResults> {
        const games = await fetch(
            `https://apis.roblox.com/search-api/omni-search?searchQuery=${search}&pageType=all&sessionId=0`
        );
        return await games.json();
    }

    public static async GetGameFromSearch(game: string): Promise<Roblox.Game[]> {
        const gameData = await fetch(
            `https://games.roblox.com/v1/games?universeIds=${game}`
        );
        return await gameData.json();
    }

    public static async GetGameIcon(placeId: number): Promise<Roblox.ThumbnailResult> {
        return await (await fetch(
            `https://thumbnails.roblox.com/v1/games/icons?universeIds=${placeId}&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false`
        )).json();
    }
}