/* eslint-disable */
export const fetchTodos = async (api: string, project_id: number) => {
  const res = await fetch(
    `https://api.todoist.com/rest/v1/tasks${
      project_id ? `?project_id=${project_id}` : ''
    }`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${api}`,
      },
    }
  );
  if (res.status !== 200) {
    throw new Error('Error fetching todos');
  }

  return res.json();
};
