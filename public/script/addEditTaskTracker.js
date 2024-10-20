import { enableInput, inputEnabled, message, setDiv, token } from "../js/script.js";
import { showTaskTracker } from "./task-tracker.js";


let addEditDiv = null;
let title = null;
let description = null;
let status = null;
let proiority = null;
let deadlineDate = null;
let deadlineTime = null;
let addigTaskTracker = null;

export const handleAddEdit = () => {

  addEditDiv = document.getElementById("new-task-box");
  title = document.getElementById("title");
  description = document.getElementById("description");
  status = document.getElementById("status");
  proiority = document.getElementById("proiority");
  deadlineDate = document.getElementById("deadlineDate");
  deadlineTime = document.getElementById("deadlineTime");
  addigTaskTracker = document.getElementById("adding-task-tracker");
  const editCancel = document.getElementById("task-tracker-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addigTaskTracker) {
        enableInput(false);
        
        let method = "POST";
        let url = "/api/v1/task-tracker";
        
        if (addigTaskTracker.textContent === "UPDATE") {
            method = "PATCH";
            url = `/api/v1/task-tracker/${addEditDiv.dataset.id}`;
        }
        
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title : title.value, 
                    description: description.value,
                    status: status.value,
                    proiority: proiority.value, 
                    deadline: deadlineDate.value 
                }),

            });
        
            const data = await response.json();
            if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
                // a 200 is expected for a successful update
                message.textContent = "The task entry was updated.";
            } else {
                // a 201 is expected for a successful create
                message.textContent = "The task entry was created.";
            }
        
            title.value = "";
            description.value = "";

            showTaskTracker();
            } else {
                document.getElementById('task-tracker-validation-error').innerHTML = `<pre>${JSON.stringify(data.err.errors, undefined, 2)}</pre>`;
                message.textContent = data.msg;
            }
        } catch (err) {
            console.log(err);
            message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      } else if (e.target === editCancel) {
        showTaskTracker();
      }
    }
  });
};

export const showAddEdit = async (taskTrackerId) => {

  if (!taskTrackerId) {
    title.value = "";
    description.value = "";
    message.textContent = "";

    setDiv(addEditDiv);
    
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/task-tracker/${taskTrackerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        title.value = data.taskTracker.title;
        description.value = data.taskTracker.description;
        deadlineDate.value = data.taskTracker.deadline;
        status.value = data.taskTracker.status;
        proiority.value = data.taskTracker.proiority;

        addigTaskTracker.textContent = "UPDATE";
        message.textContent = "";
        addEditDiv.dataset.id = taskTrackerId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The jobs entry was not found";
        showTaskTracker();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showTaskTracker();
    }

    enableInput(true);
  }
};


export const deleteTask = async (taskTrackerId) => {

    try {
      const response = await fetch(`/api/v1/task-tracker/${taskTrackerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        showTaskTracker();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showTaskTracker();
    }

    enableInput(true);
  
};