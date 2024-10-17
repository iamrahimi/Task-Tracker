import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "../js/script.js";
import { showAddEdit, deleteTask } from "./addEditTaskTracker.js";
import { showLogin } from "./login.js";

let taskTrackerDiv = null;
let taskTrackerBody = null;
let pagination = null;
let pageNumber = 1;
let limit = 6;
let total = 0;
let loginDiv = null;
export const handleTaskTracker = () => {
  taskTrackerDiv = document.getElementById("task-box");
  pagination = document.getElementById('pagination');
  const loginDiv = document.getElementById("login-register-box");
  const addTaskTracker = document.getElementById("add-task-tracker");
  taskTrackerBody = document.getElementById('task-wrapper')


  taskTrackerDiv.addEventListener("click", (e) => {

      const taskTrackerId = e.target.getAttribute('data-id');
      const button = e.target.getAttribute('action');

    if (inputEnabled && e.target.nodeName === "A" || inputEnabled && e.target.nodeName === "LABEL") {
      if (e.target === addTaskTracker) {
        showAddEdit(null);

      }  else if(taskTrackerId != null && button == 'edit') {
        showAddEdit(taskTrackerId);
      } else if(taskTrackerId != null && button == 'complete') {
        showAddEdit(taskTrackerId);
      } else if(taskTrackerId != null && button == 'delete') {
        deleteTask(taskTrackerId);
      } 
    }

    if(inputEnabled && e.target.nodeName == "DIV"){
      if( button == 'next-page') {

        if(pageNumber < total)
        {
          pageNumber++;
          showTaskTracker();
        }
        
      }

      if( button == 'previous-page') {
        if(pageNumber > 1 ){
          pageNumber = pageNumber - 1;
          showTaskTracker();
        }
          
      }
    }
  });
};

export const showTaskTracker = async (filter = null) => {
  try {
    enableInput(false);
    let url = `/api/v1/task-tracker?limit=${limit}&page=${pageNumber}`;
    if(filter != null && filter != "" )
    {
      url = url+ filter;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });


    if(response.statusText == "Unauthorized"){
      setToken(null);
      message.textContent = "You have been logged off.";
      showLogin();

      System.exit(0)

    }

    const {data, totalTask} = await response.json();     

    if (response.status === 200) {
      if (data.count === 0) {
        taskTrackerBody.replaceChildren(...children); // clear this for safety
      } else {
        let tableData = "";
        
        
        for (let i = 0; i < data.length; i++) {
          let createdAt = new Date(data[i].createdAt).toLocaleDateString();
          let deadline = new Date(data[i].deadline).toLocaleDateString();
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
                            ${createdAt}
                        </div>
                        <div class="price">
                            <span>Deadline</span> <br>
                            ${deadline}
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
        if(totalTask > 6){
          total = Math.round(totalTask / 6);
        }else {
          total = 1;
        }
        
        let paginationNumber = `
                <div class='text' action="previous-page">Previous </div>
                  <div class='counter'>
                      <span class='number' >${pageNumber}</span>
                      <div class='background'></div>
                      <span class='number'>${total}</span>
                  </div>
                <div class='text' action="next-page">Next</div>`;
        pagination.innerHTML = paginationNumber;
        taskTrackerBody.innerHTML = tableData;
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    message.textContent = "Something went wrong, please logout/login";
  }
  enableInput(true);
  setDiv(taskTrackerDiv);
};