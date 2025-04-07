declare namespace Roblox {
    interface GameContents {
        universeId: number;
        name: string;
        description: string;
        playerCount: number;
        totalUpvotes: number;
        totalDownvotes: number;
        emphasis: boolean;
        isSponsered: boolean;
        nativeAdData: string;
        creatorName: string;
        creatorHasVerifiedBadge: boolean;
        creatorId: number;
        rootPlaceId: number;
        maximumAge: number;
        ageRecommendationDisplayName: string;
        contentType: string;
        contentId: number;
        defaultLayoutData: any;
    }

    interface GameMetadata {
        contentGroupType: string;
        contents: GameContents[];
        topicId: string;
    }

    interface GameResults {
        searchResults: GameMetadata[];
        nextPageToken: string;
        filteredSearchQuery: any;
        vertical: string;
        sorts: any;
        paginationMethod: string;
    }

    interface ThumbnailResult {
        data: Array<{
            tagetId: number;
            state: string;
            imageUrl: string;
            version: string;
        }>;
    };

    interface Creator {
        id: number;
        name: string;
        type: string;
        isRNVAccount: boolean;
        hasVerifiedBadge: boolean;
    }

    interface Game {
        id: number;
        rootPlaceId: number;
        name: string;
        description: string;
        sourceName: string;
        sourceDescription: string;
        creator: Creator;
        price: number | null;
        allowedGearGenres: string[];
        allowedGearCategories: string[];
        isGenreEnforced: boolean;
        copyingAllowed: boolean;
        playing: number;
        visits: number;
        maxPlayers: number;
        created: string;
        updated: string;
        studioAccessToApisAllowed: boolean;
        createVipServersAllowed: boolean;
        universeAvatarType: string;
        genre: string;
        genre_l1: string;
        genre_l2: string;
        isAllGenre: boolean;
        isFavoritedByUser: boolean;
        favoritedCount: number;
    }
}