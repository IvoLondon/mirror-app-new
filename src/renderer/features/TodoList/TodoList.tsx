import React, { useState, useEffect, useCallback } from 'react';
import { TodoistApi } from '@doist/todoist-api-typescript';
import './TodoList.scss';
import todoIcon from './assets/memo.png';
import { filterDate, sortByDate } from './utilities';
import useInterval from '@utils/customHooks';
import { printConsoleLog, timeInMinutes } from '@utils/utilities';
import { ItemType, PropType } from './TodoList.d';

const TodoList = ({ api, id }: PropType) => {
  const [items, getItems] = useState<[] | ItemType[]>([]);

  const handleTodoAPI = useCallback(async () => {
    const todoAPI = new TodoistApi(api);

    const todoRequest = await todoAPI.getTasks({ project_id: id });

    if (todoRequest.length) {
      getItems(sortByDate(filterDate(todoRequest)));
    }
    printConsoleLog('TodoList');
  }, [api, id]);

  useEffect(() => {
    handleTodoAPI();
  }, [handleTodoAPI]);

  useInterval(handleTodoAPI, timeInMinutes(15));

  const getTodoList = (itemsList: ItemType[]) => {
    return itemsList.map(({ id, due, content }: ItemType) => {
      const itemSchedule =
        new Date(due.date).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0)
          ? 'overdue'
          : 'future';
      return (
        <li
          key={id}
          className={`TodoList__block__list__single ${itemSchedule}`}
        >
          <i className="TodoList__block__list__single__icon" />
          <h4 className="TodoList__block__list__single__task">{content}</h4>
        </li>
      );
    });
  };

  return (
    <div className="TodoList">
      <div className="TodoList__block">
        <h2 className="TodoList__block__title">
          <img
            src={todoIcon}
            className="TodoList__block__title__icon"
            alt="todo icon"
          />
          Daily tasks
        </h2>
        <ul className="TodoList__block__list">{getTodoList(items)}</ul>
      </div>
    </div>
  );
};

export default TodoList;
