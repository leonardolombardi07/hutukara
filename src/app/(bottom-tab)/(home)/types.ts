export interface Item {
  id: string;
  title: string;
  description: string;
  results: Result[];
  createdAt: Date;
  members: Member[];
  host: Member;
  pin: string;
}

interface Member {
  id: string;
  avatarUrl: string;
  name: string;
}

interface Result {
  id: string;
  Title: string;
  Poster: string;
  score: number;
}
