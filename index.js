let inputData = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let textContent = "";
let taskArray = [];

// Load tasks from localStorage when the page loads
if (window.localStorage.getItem("tasks")) {
    taskArray = JSON.parse(window.localStorage.getItem("tasks"));
    displayTasks(taskArray);
} else {
    console.log("No tasks found in localStorage");
}

// Get input data when user types in the input field
inputData.addEventListener("input", (e) => {
    textContent = e.target.value.trim();
});

// Add task when the "Add Task" button is clicked
add.addEventListener("click", () => {
    if (textContent !== "") {
        // Create a task object
        const task = { content: textContent, id: new Date().getTime() };

        // Add task to taskArray and save to localStorage
        taskArray.push(task);
        window.localStorage.setItem("tasks", JSON.stringify(taskArray));

        // Clear the input field
        inputData.value = "";
        textContent = "";

        // Update the displayed tasks
        displayTasks(taskArray);
    }
});

// Display tasks
function displayTasks(taskArray) {
    tasks.innerHTML = "";  // Clear the existing tasks

    taskArray.forEach((task) => {
        // Create task element
        let myElement = document.createElement("div");
        myElement.className = "element";
        myElement.setAttribute("data-id", task.id); // Store unique ID to track task

        let para = document.createElement("p");
        let text = document.createTextNode(task.content);
        para.className = "para";
        para.appendChild(text);

        let btn = document.createElement("button");
        btn.className = "btn";
        btn.innerHTML = "Delete";

        // Append para and button to the task element
        myElement.appendChild(para);
        myElement.appendChild(btn);

        // Append the task element to the tasks container
        tasks.appendChild(myElement);

        // Add event listener to delete button
        btn.addEventListener("click", () => {
            // Remove the task from the array
            taskArray = taskArray.filter((t) => t.id !== task.id);
            // Update localStorage
            window.localStorage.setItem("tasks", JSON.stringify(taskArray));
            // Remove the task element from the DOM
            myElement.remove();
        });
    });
}
