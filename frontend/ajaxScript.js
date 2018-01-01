// Todolist data array for filling in info box
var todoListData = [];
// It stores the identifier of the currently edited record
var actualID = '';
// DOM Ready ==========================
$(document).ready(() => {
    // Populate the todo table on initial page load
    populateTable();
    $('#btnAddTask').on('click', addTodoTask);
});

// Functions ===============

// Fill table with data 
function populateTable() {

    //Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/todos/all', (data) => {
        // For each item in our JSON add a table row and cells to the content strings
        $.each(data, (index) => {
            if(data[index].completed) {
                tableContent += '<tr>';
                tableContent += '<td class="leftSide"><input type="checkbox" class="completedTask" checked="true" disabled="disabled" id="'+data[index]._id+'" onclick="completeTodoTask(event)"></td>';
                tableContent += '<td><span id="todoContent" class="completedTask">'+data[index].content+'</span>'+
                '<img src="/images/pencil.png" alt="Edit" class="btnEditTask doneImage" id="'+data[index]._id+'"></img>'+
                '<div class="rightImage"><img src="/images/trash.png" alt="Usuń zadanie" class="doneImage" id="'+data[index]._id+'" onclick=deleteTodoTask(event)></img></div></td>';
                tableContent += '</tr>';
            } else {
                tableContent += '<tr>';
                tableContent += '<td class="leftSide"><input type="checkbox" class="activeTask" id="'+data[index]._id+'" onclick="completeTodoTask(event)"></td>';
                tableContent += '<td><span id="todoContent" class="activeTask">'+data[index].content+'</span>'+
                '<img src="/images/pencil.png" alt="Edit" class="btnEditTask activeTask" id="'+data[index]._id+'" onclick="enableEditTodoTask(event)"></img>'+
                '<img src="/images/trash.png" alt="Usuń zadanie" class="rightImage" id="'+data[index]._id+'" onclick=deleteTodoTask(event)></img></td>';
                tableContent += '</tr>';
            }
        });
        // Injest the whole content string into our existing HTML table
        $('#todoTasks').html(tableContent);
    });
}

// Add Todo task
function addTodoTask(event) {
   event.preventDefault();

    // Basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addTask input').each((index, val) => {
        if($('#addTask input').val() === '') { errorCount++; }
    });
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        // If it is, compile all todo task into one object
        var newTodoTask = {
            'content': $('#addTodoTask').val()
        }
        // Use AJAX to post the object to our addTask service
        $.ajax({
            type: 'POST',
            data: newTodoTask,
            url: '/todos/create',
            dataType: 'JSON'
        }).done((response) => {
            // Check for successful (black) response
            if (response) {
                // Clear the form inputs
                $('#addTodoTask').val('');

                //Update the table
                populateTable();
            }
        });
    } else {
        // If errorCount is more than 0, error out
        alert('Prosze o wypełnienie pól');
        return false;
    }
};

// Edit Todo Task
function enableEditTodoTask(event) {
    event.preventDefault();

    getModalWindow();
    actualID = event.target.id;
}

function todoTaskEdit(event, id) {
    event.preventDefault();
    var editingTodoTask = {
        'content': $('#editTodoTask').val()
    }
    $.ajax({
        type: 'PUT',
        data: editingTodoTask,
        url: '/todos/edit/'+ id,
        dataType: 'JSON',
    });

     // Clear the form inputs
     $('#editTodoTask').val('');
     $('#myModal').css('display', 'none');
    //Update the table
    populateTable();
}

function deleteTodoTask(event) {
    event.preventDefault();

    // Popup a confirmation dialog
    var confirmation = confirm('Jesteś pewny że chcesz usunąć to zadanie?');

    // Check and make sure that user confirmed
    if (confirmation === true) {
        //If they did, delete our task
        $.ajax({
            type: 'DELETE',
            url: 'todos/delete/'+ event.target.id
        }).done((response) => {
            if (response) {
                //Update the table
                populateTable();
            } else {
                // If they say no to the confirm do nothing
                return false;
            }
        });
    }
};

function completeTodoTask(event) {

    $.ajax({
        type: 'PUT',
        data: {completed: true},
        url: '/todos/complete/'+ event.target.id,
        dataType: 'JSON',
    });
    populateTable();

}

 function getModalWindow(event) {
         // Get the modal
         var modal = document.getElementById('myModal');

         $('#myModal').css('display', 'block');
    
         // When user clicks on <span> (x), close the modal
         $('.close').on('click', () => {
            $('#myModal').css('display', 'none');
         });
    
         // When the user clicks anywhere outside of the modal, close it
         $(window).on('click', (event) => {
             if(event.target ==  modal) {
                $('#myModal').css('display', 'none');
             }
         });
 }

