export type Category = {
  id: number;
  name: string;
  channels: Channel[];
};

export type Channel = {
  id: number;
  name: string;
  description: string;
};

export type Author = {
  id: number;
  username: string;
  display_name: string;
};

export type Reply = {
  id: number;
  content: string;
  author: Author;
  date: string;
  depth: number;
  parent_reply_id: number | null;
  likes: number;
  liked: boolean;
  dislikes: number;
  disliked: boolean;
  edited?: boolean;
  edited_date?: string;
  replies?: Reply[];
};

export type Post = {
  id: number;
  title: string;
  content: string;
  author: Author;
  date: string;
  edited?: boolean;
  edited_date?: string;
  likes: number;
  liked: boolean;
  dislikes: number;
  disliked: boolean;
  replies?: Reply[];
};
