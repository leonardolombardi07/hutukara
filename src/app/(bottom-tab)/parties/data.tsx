import { Item } from "./types";

const FAKE_PERSON: Item["members"][number] = {
  id: "1",
  name: "John Doe",
  avatarUrl: "https://i.pravatar.cc/300?img=1",
};

function getPersonArray(num: number) {
  return Array.from({ length: num }, (_, i) => ({
    ...FAKE_PERSON,
    id: i.toString(),
  }));
}

const FAKE_RESULTS: Item["results"] = [
  {
    id: "1",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTI0MzcxMTYtZDVkMy00NjY1LTgyMTYtZmUxN2M3NmQ2NWJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    Title: "Good Will Hunting",
    score: 7.3,
  },
  {
    id: "2",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    Title: "Whiplash",
    score: 4.3,
  },
  {
    id: "3",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
    Title: "Shawshank Redemption",
    score: 5,
  },
  {
    id: "4",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    Title: "Batman: The Dark Knight",
    score: 7.5,
  },
  {
    id: "5",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    Title: "Gladiator",
    score: 3,
  },
  {
    id: "6",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg",
    Title: "Breaking Bad",
    score: 5,
  },
  {
    id: "7",
    Poster: "",
    Title: "The Godfather",
    score: 4,
  },
  {
    id: "8",
    Title: "Batman",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZWQ0OTQ3ODctMmE0MS00ODc2LTg0ZTEtZWIwNTUxOGExZTQ4XkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
    score: 10,
  },
];

export const FAKE_DATA: Item[] = [
  {
    id: "1",
    title: "With Members",
    description: "Some nice party",
    results: FAKE_RESULTS,
    createdAt: new Date("2021-10-10"),
    members: getPersonArray(3),
    host: FAKE_PERSON,
    pin: "1234",
  },

  {
    id: "2",
    title: "Some other party",
    description: "Some other nice party",
    results: [],
    createdAt: new Date("2018-10-10"),
    members: [],
    host: FAKE_PERSON,
    pin: "1234",
  },

  {
    id: "3",
    title: "Third party",
    description: "Yes, with results!",
    results: [],
    createdAt: new Date("2013-10-10"),
    members: [],
    host: FAKE_PERSON,
    pin: "1234",
  },
] as const;
