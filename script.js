// Task data structure
let tasks = [
    { id: 1, description: "Buy groceries", status: "pending", priority: false },
    { id: 2, description: "Complete homework", status: "pending", priority: true },
    { id: 3, description: "Clean the house", status: "completed", priority: false }
  ];
  
  // DOM Elements
  const pendingTasksDiv = document.getElementById('pending-tasks');
  const completedTasksDiv = document.getElementById('completed-tasks');
  const priorityTasksDiv = document.getElementById('priority-tasks');
  const taskInput = document.getElementById('task-input');
  
  // Display Tasks
  function displayTasks() {
    // Clear the previous task lists
    pendingTasksDiv.innerHTML = '';
    completedTasksDiv.innerHTML = '';
    priorityTasksDiv.innerHTML = '';
  
    // Loop through tasks and categorize them
    tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task-item');
      
      if (task.status === "pending") {
        taskDiv.innerHTML = `
          <span>${task.description}</span>
          <div class="task-actions">
            <button onclick="completeTask(${task.id})">
              <img src="assets/check-icon.svg" alt="Complete Task">
            </button>
            <button onclick="setPriority(${task.id})">
              <img src="assets/star-icon.svg" alt="Set Priority">
            </button>
          </div>
        `;
        if (task.priority) {
          taskDiv.classList.add('priority');
        }
        pendingTasksDiv.appendChild(taskDiv);
      } else if (task.status === "completed") {
        taskDiv.classList.add('completed');
        taskDiv.innerHTML = `
          <span>${task.description}</span>
        `;
        completedTasksDiv.appendChild(taskDiv);
      } else if (task.status === "priority") {
        taskDiv.classList.add('priority');
        taskDiv.innerHTML = `
          <span>${task.description}</span>
          <button onclick="completeTask(${task.id})">
            <img src="assets/check-icon.svg" alt="Complete Task">
          </button>
        `;
        priorityTasksDiv.appendChild(taskDiv);
      }
    });
  }
  
  // Add Task
  function addTask() {
    const taskDescription = taskInput.value.trim();
    if (taskDescription) {
      const newTask = {
        id: Date.now(),
        description: taskDescription,
        status: 'pending',
        priority: false
      };
      tasks.push(newTask);
      taskInput.value = '';  // Clear input
      displayTasks();  // Re-render the tasks
    }
  }
  
  // Complete Task
  function completeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.status = task.priority ? 'priority' : 'completed';  // Priority tasks can skip the completed status
      displayTasks();  // Re-render the tasks
    }
  }
  
  // Set Priority
  function setPriority(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.priority = !task.priority;
      task.status = task.priority ? 'priority' : 'pending';
      displayTasks();  // Re-render the tasks
    }
  }
  
  // Initialize
  displayTasks();
  