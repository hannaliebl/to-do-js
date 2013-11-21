var tasksToDo = [];
var tasksCompleted = [];

// model Task
var Task = {
    addNewTask: function(task_description) {
        this.task_description = tasksToDo.push({
                                                title: task_description,
                                                status: "unfinished",
                                                });
    },
    finishTask: function(task_description) {
        var l = tasksToDo.length;
        this.task_description = tasksCompleted.push({
                                                     title: task_description,
                                                     status: "finished"
                                                     })
        while (l--) {
            if (tasksToDo[l].title === task_description) {
                tasksToDo.splice(l, 1);
            }
        }
    }
}

var reducedBy = 0;
var total = 0;
var percentComplete = 0;

//model Count
var Count = {
    reduce: function() {
        var reducedBy = tasksCompleted.length;
        return reducedBy;
    },
    total: function() {
        var total = tasksCompleted.length + tasksToDo.length;
        return total;
    },
    percent: function() {
        var percentComplete = ((Count.reduce()/Count.total()) * 100).toFixed(2);
        return percentComplete;
    }
}

// Controllers
$(function(){
    $("#to-do-form").on("click", "button", function() {
        var newTask = $("input#new-task").val();
        $("input#new-task").val("");
        Task.addNewTask(newTask);
        $("ul#tasks-to-do").empty();
        $("span#total-tasks-count").empty();
        for (i = 0; i < tasksToDo.length; i++) {
            $("ul#tasks-to-do").append('<li>' + tasksToDo[i].title + '</li></a>');
        }
        $("span#total-tasks-count").append(Count.total);
        return false;
    });
});
// removeCompletedTasks
$(function() {
    $("ul#tasks-to-do").on("click", "li", function() {
        var clickedTask = $(this).text();
        $(this).slideUp();
        Task.finishTask(clickedTask);
        $("ul#completed-tasks").empty();
        $("span#tasks-completed-count").empty();
        $("span#percent-number").empty();
        for (i = 0; i < tasksCompleted.length; i++) {
            $("ul#completed-tasks").append('<li>' + tasksCompleted[i].title + '</li></a>');
        }
        $("span#tasks-completed-count").append(Count.reduce);
        $("span#percent-number").append(Count.percent);
    });
});