// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const id = nextId;
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId)); // Save the updated nextId to localStorage
    return id;
}


// Todo: create a function to create a task card
// Function to create a task card
function createTaskCard(task) {
    const card = $('<div>').addClass('card mb-3').attr('data-id', task.id);
    const cardBody = $('<div>').addClass('card-body');
    const cardTitle = $('<h5>').addClass('card-title').text(task.title);
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDeadline = $('<p>').addClass('card-text').text('Deadline: ' + task.deadline);
    const deleteButton = $('<button>').addClass('btn btn-danger btn-sm').text('Delete');
    // All  the variables created as per HTML, and Acceptance Criteria
    // Different styling added to each class for visual element, can distinguish each section clearly
    cardBody.append(cardTitle, cardDescription, cardDeadline, deleteButton);
    card.append(cardBody);

    return card;
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // FOr clearing existing task cards
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    // Iteratation over taskList + create new task cards
    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
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
            $(this).hide();
        },
        stop: function (event, ui) {
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

    // Collection of task details from the form
    const title = $('#taskTitle').val();
    const description = $('#taskDescription').val();
    const deadline = $('#taskDeadline').val();
    const id = generateTaskId(); // Generate new task ID
    const newTask = { // Create new object
        id: id,
        title: title,
        description: description,
        deadline: deadline,
        status: 'to-do'
    };


    taskList.push(newTask); // Add task
    localStorage.setItem('tasks', JSON.stringify(taskList)); // Save new task 
    renderTaskList(); // Redner new task

    $('#taskForm')[0].reset();
    $('#formModal').modal('hide');
}
$('#taskForm').on('submit', handleAddTask);


// Todo: create a function to handle deleting a task
// https://getbootstrap.com/docs/3.4/javascript/
// https://getbootstrap.com/docs/3.4/javascript/#modals
function handleDeleteTask(event) {
    const taskId = $(event.target).closest('.card').data('id');
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

$(document).on('click', '.btn-danger', handleDeleteTask);


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.data('id');
    const newStatus = $(event.target).attr('id');
    const task = taskList.find(task => task.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  
    // Save updated taskList to localStorage
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
  }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
