import { ItemType } from '../TodoList.d';

export const filterDate = (data: ItemType[]): ItemType[] => {
  return data.filter((task) => {
    if (!task.due) return false;
    if (
      new Date(task.due.date).getTime() >
      new Date().setDate(new Date().getDate() + 2)
    )
      return false;
    return task;
  });
};

export const sortByDate = (data: ItemType[]): ItemType[] => {
  return data.sort((a, b) => {
    if (!a.due || !b.due) return 0;
    return new Date(a.due.date).getTime() - new Date(b.due.date).getTime();
  });
};

export const itemSchedule = (due: ItemType['due']) => {
  if (!due) return 'overdue';
  return new Date(due.date).setHours(0, 0, 0, 0) <
    new Date().setHours(0, 0, 0, 0)
    ? 'overdue'
    : 'future';
};
