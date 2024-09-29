import { Person } from './person.model';

export interface Task {
  id?: string;
  title: string;
  status?: boolean;
  people: Person[];
  deadLine: string;
}
