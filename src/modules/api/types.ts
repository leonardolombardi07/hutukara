import { OMBDBResponse } from "../OMDBApi";

export namespace UsersCol {
  export interface Doc {
    name: string;
    groupIds: string[];
    photoURL: string;
  }

  export namespace RatingsSubCol {
    export interface Doc {
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
    }

    export namespace ParticipantsSubCol {
      export type Doc = Omit<UsersCol.Doc, "groups">;
    }

    export namespace InputContentSubCol {
      export type Doc = ContentCol.Doc;
    }

    export namespace InputUserRatingsSubCol {
      export type Doc = UsersCol.RatingsSubCol.Doc & { userId: string };
    }
  }
}

export namespace ContentCol {
  export interface Doc extends OMBDBResponse {}
}

export type CollectionName = "users" | "content" | "groups";
