export interface Item {
  id: string;
  title: string;
  description: string;
  results: any[];
  createdAt: Date;
  members: Member[];
  hosts: Host[];
  pin: string;
}

interface Member {
  id: string;
  avatarUrl: string;
  name: string;
}

interface Host {
  id: string;
  avatarUrl: string;
  name: string;
}
