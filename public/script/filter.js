import { enableInput, inputEnabled, message, setDiv, token } from "../js/script.js";
import { showTaskTracker } from "./task-tracker.js";


let filterBox = null;
let filterBoxClose = null;
let searchBy = null;
let sortByProiority = null;
let sortByStatus = null;
let filterUrl = null;
let filter= null;
let sortBy = null;
let sortByLetter = null;

export const filterTasks = async () => {
    filterBox = document.getElementById('filter-box');
    searchBy = document.getElementById('searchBy');
    sortByProiority = document.getElementById('sortByProiority');
    sortByStatus = document.getElementById('sortByStatus');
    filterBoxClose = document.getElementById("filter-task-cancel");
    sortBy = document.getElementById('sortBy');
    filter = document.getElementById('filter-task-tracker');

    document.getElementById('task-filter').addEventListener("click", (e) => {
        
        searchBy.value = "";
        sortByProiority.value = "";
        sortByStatus.value = "";
        sortBy.value = "";
        filterUrl = "";
        setDiv(filterBox);

    });

    filterBoxClose.addEventListener("click", (e) => {
        showTaskTracker();

   });

    filter.addEventListener('click', (e) => {

        if(searchBy.value != '') {
            filterUrl = filterUrl + "&search=" +searchBy.value;
        }
    
       if(sortByProiority.value != '') {
            filterUrl = filterUrl + "&proiority=" +sortByProiority.value;
        }
    
        if(sortByStatus.value != '') {
            filterUrl = filterUrl + "&status=" +sortByStatus.value;
        }

        if(sortBy.value != '') {
            filterUrl = filterUrl + "&sortBy=" +sortBy.value;
        }

        if(filterUrl != ""){
            showTaskTracker(filterUrl);
        }
    })

  




}