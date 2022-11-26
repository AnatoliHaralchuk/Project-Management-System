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
  order?: number;
  done?: boolean;
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
  files?: Array<BoardFiles>;
}

export interface Task {
  title: string;
  description: string;
  userId: string;
}
export interface BoardFiles {
  filename: string;
  fileSize: number;
}

export interface DeleteData {
  idBoard: string;
  idColumn: string;
  idTask: string;
  idUser: string;
}
