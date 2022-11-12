export interface Board {
  id?: string;
  title: string;
  description: string;
  columns?: Array<BoardColumns>;
}
export interface BoardColumns {
  id?: string;
  title: string;
  order: number;
  tasks?: Array<BoardTasks>;
}

export interface BoardTasks {
  id?: string;
  title: string;
  order: number;
  done?: boolean;
  description: string;
  userId: string;
  files: Array<BoardFiles>;
}

export interface BoardFiles {
  filename: string;
  fileSize: number;
}
