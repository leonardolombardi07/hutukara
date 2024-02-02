import { OMBDBResponse } from "../OMDBApi";

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
    export interface Doc {
      group: GroupsCol.Doc;
      createdAt: number;
      recommendations: (ContentCol.Doc & { score: number })[];
      allMembers: Omit<UsersCol.Doc, "groups">[];
      content: ContentCol.Doc[];
      ratings: UsersCol.RatingsSubCol.Doc[];
    }
  }
}

export namespace ContentCol {
  export interface Doc extends OMBDBResponse {}
}

export type CollectionName = "users" | "content" | "groups";
