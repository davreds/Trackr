var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

/*---------- HTML Functions ------*/

//Function for dropdowns to work
var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});

//Function to hide Modales
function hideModal(){
  var modal = document.querySelector('.is-active');
  event.stopPropagation();
  modal.classList.toggle('is-active');
}


//Modals are in order 'Create' , 'Update' , 'Show' ,and 'Delete'

//function to show the create new dashboard Modal
function createDashboardModal(){
  var modal = document.getElementById("addDashboardModal");
  event.stopPropagation();
  modal.classList.toggle('is-active');
}

//Function to show the add create new project modal
function createProjectModal(){
  var modal = document.getElementById("addProjectModal");
  event.stopPropagation();
  modal.classList.toggle('is-active');
}

//Function to show the add new contributor modal
function newContributorModal(){
  var modal = document.getElementById("addContributorModal");
  var dropdown = document.getElementById("contributorDropdown");
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
  modal.classList.toggle('is-active');
}

//Function to show the modal of adding a new task to a project
function createTaskModal(){
  var modal = document.getElementById("addTask");
  event.stopPropagation();
  modal.classList.toggle('is-active');
}

//Function to show the dashboard configuration modal
function updateDashboardModal(){
  var modal = document.getElementById("dashboardConfigModal");
  event.stopPropagation();
  modal.classList.toggle('is-active');
}

//Function to show the modal of edit project
function updateProjectModal(){
  var modal = document.getElementById("projectConfigModal");
  event.stopPropagation();
  modal.classList.toggle('is-active');
}

//Function to show the modal of edit task
function updateTaskModal(){
  var modal = document.getElementById("taskConfigModal");
  event.stopPropagation();
  modal.classList.toggle('is-active');
}

//Function to show the project in fullscreen as a modal
function showAll(){
  var modal = document.getElementById("showAllTasks");
  event.stopPropagation();
  modal.classList.toggle('is-active');
  //Function to display the whole project.
}

/*---------- DB Functions ------*/

//Function to read Dashboards
function loadDashboards() {
  $.ajax({
    url: 'http://trackr-tec.herokuapp.com/boards',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      addDashboardToNavBar(data);
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}
loadDashboards()


//Function to read one dashboard
function loadDashboard(id) {
  console.log(id);
  $.ajax({
    url: 'http://trackr-tec.herokuapp.com/boards/' + id,
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data);
      addDashboardHTML(data);
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}


//Function to save and create a new dashboard
function createDashboard(){
  var modal = document.getElementById("addDashboardModal");
  var dashboardName = document.getElementById("newDashboardName").value;
  var dashboardDescription = document.getElementById("newDashboardDescription").value;
  event.stopPropagation();

  json_to_send = {
    "name" : dashboardName,
    "description" : dashboardDescription,
  };
  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'http://trackr-tec.herokuapp.com/boards',
    // url: 'https://tuapp.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(){
      loadDashboards();
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });

  hideModal();
}

//Function to save and create a new dashboard
function createProject(){
  var modal = document.getElementById("addProjectModal");
  var projectName = document.getElementById("newProjectName").value;
  var projectDescription = document.getElementById("NewProjectDescription").value;
  event.stopPropagation();
  //Function to create new project
  hideModal();
}

//Function to create a task
function createTask(){
  var modal = document.getElementById("addTask");
  var taskName = document.getElementById("taskName").value;
  var taskDescription = document.getElementById("taskDescription").value;
  event.stopPropagation();
  //Function to create new task
  hideModal();
}

//Function to add new contributor to a dashboard
  function addContributor(){
  var modal = document.getElementById("addContributorModal");
  var email = document.getElementById("contributorEmail").value;
  event.stopPropagation();
  //Function to add person.
  hideModal();
}

//Function to make changes to the dashboard
  function updateDashboard(){
    var modal = document.getElementById("dashboardConfigModal");
    var dashboardName = document.getElementById("dashboardName").value;
    var dashboardDescription = document.getElementById("dashboardDescription").value;
    event.stopPropagation();
    //Function to update Dashboard
    hideModal();
  }

//Function to make changes to the project
  function updateProject(){
    var modal = document.getElementById("projectConfigModal");
    var projectName = document.getElementById("projectName").value;
    var projectDescription = document.getElementById("projectDescription").value;
    event.stopPropagation();
    //Function to update Dashboard
    hideModal();
  }

//Function to make changes to the task
  function updateTask(){
    var modal = document.getElementById("taskConfigModal");
    var taskName = document.getElementById("taskName").value;
    var taskDescription = document.getElementById("taskDescription").value;
    event.stopPropagation();
    //Function to update Dashboard
    hideModal();
  }

//Delete selected dashboard
  function deleteDashboard(){
    var modal = document.getElementById("dashboardConfigModal");
    event.stopPropagation();
    //Funcion de salir/eliminar del dashboard.
    hideModal();
  }

//Delete selected project
  function deleteProject(){
    var modal = document.getElementById("projectConfigModal");
    event.stopPropagation();
    //Funcion de eliminar del proyecto.
    hideModal();
  }

//Delete selected project
  function deleteTask(){
    var modal = document.getElementById("taskConfigModal");
    event.stopPropagation();
    //Funcion de eliminar del task.
    hideModal();
  }

/*---------- Extra functions for dont make a mess ------*/
function addDashboardToNavBar(dashboard){
  var dashboardNames = document.getElementById("yourDashboards");
  dashboardNames.innerHTML = "";
  for (var i = 0; i < dashboard.length; i++) {
    console.log(dashboard[i].name);
    dashboardNames.innerHTML += '<a class="navbar-item" id="'+ dashboard[i]._id + '"onclick="loadDashboard('+ '\'' + dashboard[i]._id + '\'' + ')">' + dashboard[i].name + '</a>';
  }
}

function addDashboardHTML(dashboard){
  var dashboardName = document.getElementById("actualProject");
  dashboardName.innerHTML = dashboard.name;
  var dashboardDescription = document.getElementById("actualProjectDescription");
  dashboardDescription.innerHTML = dashboard.description;
}

function addProjectHTML(dashboardID, projectID, projectName, projectDescription){
  var html = '<div id="'+ projectID +'" class="tile is-parent is-2">'+
    '<div class="tile is-child box" style=" border-radius: 15px; background-color: hsl(0, 0%, 1%, 30%);">'+
      '<div class="level-right">'+
        '<a onclick="updateProjectModal()">'+
            '<figure class="image is-16x16">'+
              '<img class="is-rounded" src="./img/threeDotsWhite.png">'+
            '</figure>'+
          '</a>'+
      '</div>'+
      '<p class="title is-4 has-text-white">' + projectName + '</p>'+
      '<p class="subtitle is-6 has-text-white">' + projectDescription +'</p>'+
      '<div id="tasks'+ projectID + '" class="projectCard">'+
      '</div>'+
      '<hr />'+
      '<div class="is-fixed footerCard">'+
        '<div class="columns">'+
          '<div class="column">'+
            '<a onclick="createTaskModal()" class="has-text-white is-5 modal-button" name="addTask">Add task</a>'+
          '</div>'+
          '<div class="column">'+
            '<p class="is-5"> <a onclick="showAll()" class="has-text-white modal-button" name="showProjects">Show all</a></p>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>';
}

function addTaskHTML(projectID, taskID, taskName, taskDescription){
  var html = '<div id="' + taskID +'" class="is-child box" name="dbTask">'+
              '<div class="level-right">'+
                '<a onclick="updateTaskModal()">'+
                  '<figure class="image is-16x16">'+
                    '<img class="is-rounded" src="./img/threeDots.png">'+
                      '</figure>'+
                        '</a>'+
                      '</div>'+
                    '<p id="taskNameDB" class="title is-5">'+ taskName +'</p>'+
                    '<p id="taskDescriptionDB" class="subtitle is-7">'+ taskDescription + '</p>'+
              '</div>';
}

function addContributorHTML(contributorName){
  var html = '<p class="dropdown-item">'+ contributorName + '</p>';
}
