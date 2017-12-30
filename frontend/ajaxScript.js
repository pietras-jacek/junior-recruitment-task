// Todolist data array for filling in info box
var todoListData = [];

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
            tableContent += '<td><span id="todoContent">'+data[index].content+'</span></td>';
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
        console.log(newTodoTask.content);
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
