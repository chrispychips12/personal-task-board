// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {const id = nextId; 
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

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
