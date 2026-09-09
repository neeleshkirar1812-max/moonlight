import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Trash2, Camera, Sparkles } from 'lucide-react';

const defaultTasks = [
  { id: 1, text: 'Charge all Sony NP-FZ100 & Profoto B10 batteries', completed: true, category: 'Gear Preparation' },
  { id: 2, text: 'Format 6x 160GB CFexpress Type A master cards', completed: true, category: 'Gear Preparation' },
  { id: 3, text: 'Calibrate DJI RS3 Pro gimbal with 24-70mm GM lens', completed: false, category: 'Gear Preparation' },
  { id: 4, text: 'Backup Haldi & Mehendi RAW cards to dual NVMe SSDs', completed: false, category: 'Data Ingestion' },
  { id: 5, text: 'Generate 100-Photo Sneak Peek for couple social media', completed: false, category: 'Editing & Grading' },
];

const EmployeeTasks = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('ml_employee_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultTasks;
  });
  const [newTaskText, setNewTaskText] = useState('');

  const updateAndPersist = (newTasks) => {
    setTasks(newTasks);
    try {
      localStorage.setItem('ml_employee_tasks', JSON.stringify(newTasks));
    } catch (e) {}
  };

  const toggleTask = (id) => {
    updateAndPersist(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const updated = [...tasks, { id: Date.now(), text: newTaskText.trim(), completed: false, category: 'Custom Task' }];
    updateAndPersist(updated);
    setNewTaskText('');
  };

  const deleteTask = (id) => {
    updateAndPersist(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl text-neutral-900">
      <div>
        <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block">
          Shoot Day Readiness
        </span>
        <h1 className="font-serif text-3xl font-bold text-neutral-900">Gear & Task Checklist</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-6">
        <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Add new task or gear item..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="flex-1 bg-stone-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-amber-500 focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center shadow-gold-subtle hover:brightness-105"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Task
          </button>
        </form>

        <div className="space-y-3 pt-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                task.completed
                  ? 'bg-stone-100/70 border-neutral-200 text-neutral-400 line-through'
                  : 'bg-stone-50 hover:bg-amber-50/40 border-neutral-200 text-neutral-900 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3 text-xs">
                {task.completed ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-neutral-400 shrink-0" />
                )}
                <span className="font-medium">{task.text}</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-[10.5px] text-amber-900 font-mono font-bold bg-amber-100/60 px-2 py-0.5 rounded border border-amber-300/60">
                  {task.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                  className="text-neutral-400 hover:text-red-600 p-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeTasks;
