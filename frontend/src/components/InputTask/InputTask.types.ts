export interface IAddTaskFormProps {
  onAdd: (title: string) => Promise<void>;
}