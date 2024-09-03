document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const tasksToComplete = document.getElementById('tasksToComplete');
    const completedTasks = document.getElementById('completedTasks');
    const motivationNote = document.querySelector('.motivation-note');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <label>
                    <input type="radio" class="completeTaskBtn" ${task.completed ? 'checked' : ''}>
                    ${task.text}
                </label>
                <button class="deleteBtn">🗑️</button>
            `;
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);

            // Add event listeners for buttons
            taskItem.querySelector('.completeTaskBtn').addEventListener('change', () => toggleTaskCompletion(index));
            taskItem.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(index));
        });
        updateTaskSummary();
    }

    function updateTaskSummary() {
        const totalTasks = tasks.length;
        const completedTaskCount = tasks.filter(task => task.completed).length;
        tasksToComplete.textContent = totalTasks - completedTaskCount;
        completedTasks.textContent = completedTaskCount;

        // Show motivational note if all tasks are completed
        if (totalTasks > 0 && totalTasks === completedTaskCount) {
            motivationNote.textContent = "Great job! You've completed all your tasks 🎉";
        } else {
            motivationNote.textContent = '';
        }
    }

    function addTask() {
        const taskText = taskInput.value;
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initialize
    renderTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
