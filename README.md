# Task Board

I have created a simple task board application that allows a team to manage project tasks by modifying starter code. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

I used [Day.js](https://day.js.org/en/) library to work with dates. 

PLEASE SEE IMAGE FILES FOR SCREENSHOTS

## User Story

```md
AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly
```

## Acceptance Criteria Followed

```md

I created  a task board to manage a project,
When the task board is opened, the list of project tasks is displayed in columns representing the task progress, this includes To-Do, In progress and Done
When the task board is viewed, each task is color coded to indicate whether it is nearing the deadline (yellow, red and green)
When the user clicks a button to define a new task, the user can enter a title, description and deadline date for the new task into a modal dialog
When the save button is clicked for a task, the properties for the task are saved in localStorage
When the user drags a task into a different progress column, the tasks progress state is updated accordingly and will stay in the new column after refreshing
When the delete button is clicked, the task is removed from the board and will not be updated after refreshing
WHen the page is refreshed, the saved tasks persist

SOURCES + ACKNOWLEWDGEMENTS
Modal resources
https://www.youtube.com/watch?v=kjIS3JnrE9E&themeRefresh=1
https://www.freecodecamp.org/news/how-to-build-a-modal-with-javascript/
https://www.w3schools.com/howto/howto_css_modals.asp
https://docs.joomla.org/creating_a_modal_form_field
https://getbootstrap.com/docs/4.0/components/modal/
https://mdbootstrap.com/docs/standard/extended/modal-form/ 
https://day.js.org/en/ 
https://jqueryui.com/droppable/
https://www.tutorialspoint.com/jqueryui/jqueryui_droppable.htm
https://stackoverflow.com/questions/22195065/how-to-send-a-json-object-using-html-form-data
https://stackoverflow.com/questions/67088439/what-event-handler-should-i-use-for-modal-form-to-send-an-email
https://getbootstrap.com/docs/3.4/javascript/
https://getbootstrap.com/docs/3.4/javascript/#modals


## Screenshots

<img width="738" alt="Screenshot 2024-07-06 at 12 59 17 PM" src="https://github.com/chrispychips12/personal-task-board/assets/94519893/8deff5d6-08b1-4254-b2a4-dde938a85bd9">
<img width="1470" alt="Screenshot 2024-07-06 at 12 58 51 PM" src="https://github.com/chrispychips12/personal-task-board/assets/94519893/b7df915e-fdec-4cd5-81df-c73f9c1f0860">
<img width="1470" alt="Screenshot 2024-07-06 at 1 06 28 PM" src="https://github.com/chrispychips12/personal-task-board/assets/94519893/888542b7-2f57-4d7d-b92b-ecffa492e43b">
