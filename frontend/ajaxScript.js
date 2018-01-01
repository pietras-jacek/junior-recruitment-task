// Todolist data array for filling in info box
var todoListData = [];
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
            tableContent += '<tr>';
            tableContent += '<td><input type="checkbox"></td>';
            tableContent += '<td><span id="todoContent">'+data[index].content+'</span>'+
            '<button class="btnEditTask" id="'+data[index]._id+'" onclick="enableEditTodoTask(event)">Edytuj zadanie</button>'+
            '<img src="/images/trash.png" alt="Usuń zadanie" id="'+data[index]._id+'" onclick=deleteTodoTask(event)></img></td>';
            tableContent += '</tr>';
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