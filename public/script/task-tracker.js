import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "../js/script.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit, deleteTask } from "./addEditTaskTracker.js";

let taskTrackerDiv = null;
let taskTrackerTable = null;
let taskTrackerTableHeader = null;
let taskTrackerBody = null;

export const handleTaskTracker = () => {
  taskTrackerDiv = document.getElementById("task-box");
  const logoff = document.getElementById("logoff");
  const addTaskTracker = document.getElementById("add-task-tracker");
  taskTrackerBody = document.getElementById('task-wrapper')


  taskTrackerDiv.addEventListener("click", (e) => {
    console.log('I am here');
        const taskTrackerId = e.target.getAttribute('data-id');
        const button = e.target.getAttribute('action');

    if (inputEnabled && e.target.nodeName === "A" || inputEnabled && e.target.nodeName === "LABEL") {
      if (e.target === addTaskTracker) {
        showAddEdit(null);

      } else if (e.target === logoff) {
        showLoginRegister();

      } else if(taskTrackerId != null && button == 'edit') {
        showAddEdit(taskTrackerId);
      } else if(taskTrackerId != null && button == 'complete') {
        showAddEdit(taskTrackerId);
      } else if(taskTrackerId != null && button == 'delete') {
        deleteTask(taskTrackerId);
      }
    }
  });
};

export const showTaskTracker = async () => {
  try {
    enableInput(false);

    const response = await fetch("/api/v1/task-tracker", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const {data} = await response.json();
     
    let children = [taskTrackerTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        console.log('true')
        taskTrackerTable.replaceChildren(...children); // clear this for safety
      } else {
        let tableData = "";
        // let {data} = data;
        for (let i = 0; i < data.length; i++) {
          tableData += `<div class="card">
                  <input type="checkbox" id="card${i}" class="more" aria-hidden="true">
                  <div class="content">
                  
                    <div class="front" >
                    
                      <div class="inner">
                        <h2>${data[i].title}</h2>
                        <div class="rating">
                          <P> ${data[i].description}</P>
                        </div>
                        <label for="card${i}" class="button" aria-hidden="true">
                          Details
                        </label>
                      </div>
                    </div>
                    <div class="back">
                      <div class="inner">
                        <div class="prorioty">
                            <span>Proiority</span> <br>
                            ${data[i].proiority}
                        </div>
                        <div class="status">
                            <span>Status</span> <br>
                          ${data[i].status}
                        </div>

                        <div class="description">
                          <p> ${data[i].description}</p>
                        </div>
                        <div class="location">
                            <span>Create At</span> <br>
                            ${data[i].createdAt}
                        </div>
                        <div class="price">
                            <span>Deadline</span> <br>
                            ${data[i].deadline}
                        </div>
                        
                        <label for="card${i}" class="button return" aria-hidden="true">Back</label>
                        <label for="" class="button return edit" action="edit" aria-hidden="true" data-id=${data[i]._id} >Edit</label>
                        <label for="" class="button delete" action="delete" aria-hidden="true" data-id=${data[i]._id}>Delete</label>
                        <label for="" class="button complete" action="complete" aria-hidden="true" data-id=${data[i]._id}>Complete</label>
                        
                      </div>
                    </div>
                  </div>
                </div>`;
        }
        taskTrackerBody.innerHTML = tableData;
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
  setDiv(taskTrackerDiv);
};