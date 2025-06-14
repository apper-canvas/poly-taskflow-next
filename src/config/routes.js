import TaskManager from '@/components/pages/TaskManager';

export const routes = {
  tasks: {
    id: 'tasks',
    label: 'Tasks',
    path: '/tasks',
    icon: 'CheckSquare',
    component: TaskManager
  }
};

export const routeArray = Object.values(routes);
export default routes;