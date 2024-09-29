import { Person } from './person.model';

export interface Task {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  people?: Person[];
  createdAt: Date;
}
