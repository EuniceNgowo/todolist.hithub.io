document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const showAllBtn = document.getElementById('showAllBtn');
    const showCompletedBtn = document.getElementById('showCompletedBtn');
    const showPendingBtn = document.getElementById('showPendingBtn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            if (filter === 'completed' && !task.completed) return;
            if (filter === 'pending' && task.completed) return;

            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }

            const completeBtn = document.createElement('button');
            completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
            completeBtn.onclick = () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks(filter);
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks(filter);
            };

            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskBtn.onclick = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    };

    showAllBtn.onclick = () => renderTasks('all');
    showCompletedBtn.onclick = () => renderTasks('completed');
    showPendingBtn.onclick = () => renderTasks('pending');

    renderTasks();
});