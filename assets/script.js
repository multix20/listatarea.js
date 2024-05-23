// Seleccionamos los elementos del DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Función para añadir una tarea
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('complete-checkbox');
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const span = document.createElement('span');
        span.textContent = taskText;
        span.classList.add('task-text'); // Añadimos la clase para aplicar estilos

        span.addEventListener('dblclick', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    span.textContent = input.value;
                    li.removeChild(input);
                    li.insertBefore(checkbox, li.firstChild);
                    li.insertBefore(span, li.childNodes[1]);
                    saveTasks();
                }
            });
            li.insertBefore(input, span);
            li.removeChild(span);
            input.focus();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = '';

        saveTasks();
    }
}

// Función para guardar tareas en el almacenamiento local
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach((li) => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde el almacenamiento local
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach((task) => {
            const li = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('complete-checkbox');
            checkbox.addEventListener('change', () => {
                li.classList.toggle('completed');
                saveTasks();
            });

            if (task.completed) {
                li.classList.add('completed');
                checkbox.checked = true;
            }

            const span = document.createElement('span');
            span.textContent = task.text;
            span.classList.add('task-text'); // Añadimos la clase para aplicar estilos

            span.addEventListener('dblclick', () => {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = span.textContent;
                input.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        span.textContent = input.value;
                        li.removeChild(input);
                        li.insertBefore(checkbox, li.firstChild);
                        li.insertBefore(span, li.childNodes[1]);
                        saveTasks();
                    }
                });
                li.insertBefore(input, span);
                li.removeChild(span);
                input.focus();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                li.remove();
                saveTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
}

// Event listener para el botón de añadir tarea
addTaskBtn.addEventListener('click', addTask);

// Event listener para añadir la tarea presionando "Enter"
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Cargar tareas al inicio
loadTasks();
