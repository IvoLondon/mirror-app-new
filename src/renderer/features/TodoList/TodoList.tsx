import React, { useState, useEffect } from 'react';
import './TodoList.scss';
import todoIcon from './assets/memo.png';
import useInterval from '../../utilities/customHooks';
import { filterDate, sortByDate } from './utilities';
import { printConsoleLog, timeInMinutes } from '../../utilities/utilities';
import { fetchTodos } from '../../utilities/apiRequest';
import { ItemType, PropType } from './TodoList.d';

const TodoList = ({ api, project_id }: PropType) => {
  const [items, getItems] = useState<[] | ItemType[]>([]);

  const handleTodoAPI = async () => {
    const todoRequest = await fetchTodos(api, project_id);
    if (todoRequest.length) {
      getItems(sortByDate(filterDate(todoRequest)));
    }
    printConsoleLog('TodoList');
  };

  useEffect(() => {
    handleTodoAPI();
  }, []);

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
