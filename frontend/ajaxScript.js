// Todolist data array for filling in info box
var todoListData = [];

// DOM Ready ==========================
$(document).ready(() => {

    // Populate the todo table on initial page load
    populateTable();
});

// Functions ===============

// Fill table with data 
function populateTable() {

    //Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/todos/all', (data) => {
        // For each item in our JSON add a table row and cells to the content strings
        $.each(data, () => {
            tableContent += '<tr>';
            tableContent += '<td><input type="checkbox"></td>';
            tableContent += '<td><span id="todoContent">'+this.content+'</span></td>';
        });

        // Injest the whole content string into our existing HTML table
        $('#todoList table tbody').html(tableContent);
    });
}

// Add Todo task
function addTodoTask(event) {
    event.preventDefault();

    // Basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addTodoTask').each((index, val) => {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        // If it is, compile all todo task into one object
         newTodoTask = {
            'content': $('#addTodoTask').val()
        }
        // Use AJAX to post the object to our addTask service
        $.ajax({
            type: 'POST',
            data: newTodoTask,
            url: '/todos/insert',
            dataType: 'JSON'
        }).done((response) => {
            // Check for successful (black) response
            if (response.msg === '') {
                // Clear the form inputs
                $('input#addTodoTask').val('');

                //Update the table
                populateTable();
            } else {
                // If something goes wrong, alert the error message that our service returned
                alert('Błąd: '+ response.msg);
            }
        });
    } else {
        // If errorCount is more than 0, error out
        alert('Prosze o wypełnienie pól');
        return false;
    }
};
$('#btnAddTask').on('click', addTodoTask);