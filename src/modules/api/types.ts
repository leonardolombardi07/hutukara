import { OMBDBResponse } from "../OMDBApi";
import { WithId } from "../tsUtils";

export namespace UsersCol {
  export interface Doc {
    name: string;
    groupIds: string[];
    photoURL: string;
  }

  export namespace RatingsSubCol {
    export interface Doc {
      userId: string;
      contentId: string;
      value: number;
    }
  }
}

export namespace GroupsCol {
  export interface Doc {
    name: string;
    pin: string;
    createdAt: number;
    ownerId: string;
    hostIds: string[];
    memberIds: string[];
    matchIds: string[];
  }

  export namespace MatchesSubCol {
    interface Recommendation {
      Title: string;
      score: number;
      possibleIMDBId: string;
      possiblePoster: string;
    }

    export interface Doc {
      createdAt: number;
      output: {
        recommendations: Recommendation[];
        content: WithId<ContentCol.Doc & { score: number }>[];
      };
    }

    export namespace InputSubCol {
      export interface Doc {
        group: GroupsCol.Doc;
        allMembers: Omit<WithId<UsersCol.Doc>, "groupIds">[];
        content: WithId<ContentCol.Doc>[];
        ratings: UsersCol.RatingsSubCol.Doc[];
      }
    }
  }
}

export namespace ContentCol {
  export interface Doc extends OMBDBResponse {}
}

export type CollectionName = "users" | "content" | "groups";
