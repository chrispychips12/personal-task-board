// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

console.log('Initial taskList:', taskList);
console.log('Initial nextId:', nextId);

// Todo: create a function to generate a unique task id
function generateTaskId() {
    console.log('Generating task ID');
    const id = nextId;
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId)); // Save the updated nextId to localStorage
    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    console.log('Creating task card:', task);
    const card = $('<div>').addClass('card mb-3').attr('data-id', task.id);
    const cardBody = $('<div>').addClass('card-body');
    const cardTitle = $('<h5>').addClass('card-title').text(task.title);
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDeadline = $('<p>').addClass('card-text').text('Deadline: ' + task.deadline);
    const deleteButton = $('<button>').addClass('btn btn-danger btn-sm').text('Delete');

    // Determine the card color based on the deadline
    // https://day.js.org/en/ 
    const today = dayjs().startOf('day');
    const deadline = dayjs(task.deadline).startOf('day');
    if (task.status === 'done') {
        card.addClass('bg-white');
    } else if (deadline.isBefore(today)) {
        card.addClass('bg-danger text-white');
    } else if (deadline.isSame(today)) {
        card.addClass('bg-warning');
    } else {
        card.addClass('bg-success text-white');
    }

    // All the variables created as per HTML, and Acceptance Criteria
    // Different styling added to each class for visual element, can distinguish each section clearly
    cardBody.append(cardTitle, cardDescription, cardDeadline, deleteButton);
    card.append(cardBody);
    return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    console.log('Rendering task list');
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    // Iteration over taskList + create new task cards
    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        console.log('Appending task to column:', task.status);
        if (task.status === 'to-do') {
            $('#todo-cards').append(taskCard);
        } else if (task.status === 'in-progress') {
            $('#in-progress-cards').append(taskCard);
        } else if (task.status === 'done') {
            $('#done-cards').append(taskCard);
        }
    });

    // Made task cards draggable
    // https://jqueryui.com/draggable/
    // https://api.jqueryui.com/draggable/
    // https://www.tutorialspoint.com/jqueryui/jqueryui_draggable.htm
    $('.card').draggable({
        revert: "invalid",
        helper: "clone",
        start: function (event, ui) {
            $(this).css('z-index', 1000); // Keep the dragged element on top
            $(this).hide();
        },
        stop: function (event, ui) {
            $(this).css('z-index', ''); // Reset z-index
            $(this).show();
        }
    });

    // + also droppable
    // https://jqueryui.com/droppable/
    // https://www.tutorialspoint.com/jqueryui/jqueryui_droppable.htm
    $('.lane').droppable({
        accept: ".card",
        drop: function (event, ui) {
            handleDrop(event, ui);
        }
    });
}

// Todo: create a function to handle adding a new task
// https://stackoverflow.com/questions/22195065/how-to-send-a-json-object-using-html-form-data
// https://stackoverflow.com/questions/67088439/what-event-handler-should-i-use-for-modal-form-to-send-an-email

function handleAddTask(event) {
    event.preventDefault();
    console.log('Adding new task');

    // Collection of task details from the form
    const title = $('#taskTitle').val();
    const description = $('#taskDescription').val();
    const deadline = $('#taskDeadline').val();
    console.log('Form values:', title, description, deadline);
    const id = generateTaskId(); // Generate new task ID
    const newTask = { // Create new object
        id: id,
        title: title,
        description: description,
        deadline: deadline,
        status: 'to-do'
    };

    taskList.push(newTask); // Add task
    console.log('Updated taskList:', taskList);
    localStorage.setItem('tasks', JSON.stringify(taskList)); // Save new task 
    renderTaskList(); // Render new task

    $('#taskForm')[0].reset();
    $('#formModal').modal('hide');
}

// Attach the submit event handler to the form
$(document).on('submit', '#taskForm', handleAddTask);

// Todo: create a function to handle deleting a task
// https://getbootstrap.com/docs/3.4/javascript/
// https://getbootstrap.com/docs/3.4/javascript/#modals
function handleDeleteTask(event) {
    console.log('Deleting task');
    const taskId = $(event.target).closest('.card').data('id');
    taskList = taskList.filter(task => task.id !== taskId);
    console.log('Updated taskList after deletion:', taskList);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}
$(document).on('click', '.btn-danger', handleDeleteTask);

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    console.log('Dropping task');
    const taskId = ui.draggable.data('id');
    const newStatus = $(event.target).attr('id');
    const task = taskList.find(task => task.id === taskId);
    if (task) {
        task.status = newStatus;
    }

    console.log('Updated task status:', task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    console.log('Document ready');
    renderTaskList();
    $('.lane').droppable({
        accept: ".card",
        drop: handleDrop
    });
});
