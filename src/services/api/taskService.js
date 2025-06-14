import taskData from '../mockData/tasks.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let tasks = [...taskData];

const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.id === id);
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(250);
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(200);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    tasks[index] = { ...tasks[index], ...updates };
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    tasks.splice(index, 1);
    return true;
  },

  async bulkDelete(ids) {
    await delay(300);
    tasks = tasks.filter(t => !ids.includes(t.id));
    return true;
  },

  async toggleComplete(id) {
    await delay(150);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    tasks[index].completed = !tasks[index].completed;
    return { ...tasks[index] };
  },

  async search(query) {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.category.toLowerCase().includes(searchTerm) ||
      (task.notes && task.notes.toLowerCase().includes(searchTerm))
    );
  },

  async getByFilter(filter) {
    await delay(200);
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    switch (filter) {
      case 'today':
        return tasks.filter(task => task.dueDate === today);
      case 'upcoming':
        return tasks.filter(task => task.dueDate && task.dueDate > today);
      case 'overdue':
        return tasks.filter(task => task.dueDate && task.dueDate < today && !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return [...tasks];
    }
  }
};

export default taskService;