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
      alert("error al recargar dashboards");
    }
  });
}
loadDashboards()


//Function to read one dashboard
function loadDashboard(id) {
  $.ajax({
    url: 'http://trackr-tec.herokuapp.com/boards/' + id,
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      addDashboardHTML(data);
    },
    error: function(error_msg) {
      alert("Error al cargar un solo dashboard");
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
      alert("Error al crear un dashboard");
    }
  });

  hideModal();
}

//Function to save and create a new dashboard
function createProject(id){
  var modal = document.getElementById("addProjectModal");
  var projectName = document.getElementById("newProjectName").value;
  var projectDescription = document.getElementById("NewProjectDescription").value;

  json_to_send = {
    "title" : projectName,
    "description" : projectDescription,
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
    url: 'http://trackr-tec.herokuapp.com/boards/addProject/' + id,
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'PATCH',
    dataType: 'json',
    data: json_to_send,
    success: function(){
      loadDashboard(id);
    },
    error: function(error_msg) {
      alert("Error al crear un proyecto");
    }
  });

  hideModal();
}

//Function to create a task
function createTask(dashID, projID){
  var modal = document.getElementById("addTask");
  var taskName = document.getElementById("taskName").value;
  var taskDescription = document.getElementById("taskDescription").value;

  json_to_send = {
    "name" : taskName,
    "projectId": projID,
    "description" : taskDescription
  };

  console.log(json_to_send);
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
    url: 'http://trackr-tec.herokuapp.com/boards/addTask/' + dashID,
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'PATCH',
    dataType: 'json',
    data: json_to_send,
    success: function(){
      loadDashboard(dashID);
    },
    error: function(error_msg) {
      alert("error al crear un task");
    }
  });
  hideModal();
}

//Function to add new contributor to a dashboard
  function addContributor(dashID){
  var modal = document.getElementById("addContributorModal");
  var email = document.getElementById("contributorEmail").value;

  json_to_send = {
    "dashboardId" : dashID,
    "email": email
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
    url: 'http://trackr-tec.herokuapp.com/users/addBoard/',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'PATCH',
    dataType: 'json',
    data: json_to_send,
    success: function(user){
      console.log(user._id)
      json_to_send2 = {
        userId: user._id
      }
      json_to_send2 = JSON.stringify(json_to_send2);

      $.ajax({
        url: 'http://trackr-tec.herokuapp.com/boards/addMember/' + dashID,
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'PATCH',
        dataType: 'json',
        data: json_to_send2,
        success: function(board){
          addContributorHTML(board.members);
        },
        error: function(error_msg) {
          alert("not ok");
        }
      });
    },
    error: function(error_msg) {
      alert("buuu");
    }
  });
  loadDashboard(dashID);
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
  function deleteTask(dashID, projID, taskID){
    var modal = document.getElementById("taskConfigModal");

    json_to_send = {
      "projectId" : projID,
      "taskId": taskID
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'http://trackr-tec.herokuapp.com/boards/removeTask/' + dashID,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(){
        loadDashboard(dashID);
      },
      error: function(error_msg) {
        alert("error al eliminar tarea");
      }
    });
    hideModal();
  }

//Function to log out
function logout(){
  $.ajax({
    url: 'http://trackr-tec.herokuapp.com/users/logout/',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'Post',
    dataType: 'json',
    success: function(){
      window.location = './index.html'
    },
    error: function(error_msg) {
      alert("Error al salir de sesion");
    }
  });
  window.location = './index.html'
}
/*---------- Extra functions for dont make a mess ------*/
function addDashboardToNavBar(dashboard){
  var dashboardNames = document.getElementById("yourDashboards");
  dashboardNames.innerHTML = "";
  for (var i = 0; i < dashboard.length; i++) {
    dashboardNames.innerHTML += '<a class="navbar-item" id="'+ dashboard[i]._id + '"onclick="loadDashboard('+ '\'' + dashboard[i]._id + '\'' + ')">' + dashboard[i].name + '</a>';
  }
}

function addDashboardHTML(dashboard){
  var dashboardName = document.getElementById("actualProject");
  dashboardName.innerHTML = dashboard.name;
  var dashboardDescription = document.getElementById("actualProjectDescription");
  dashboardDescription.innerHTML = dashboard.description;

  var addContrib = document.getElementById("contribution");
  params1 = "addContributor(" + "'" + dashboard._id + "'" + ")";
  addContrib.setAttribute("onclick", params1);
  var functionToDO = document.getElementById("currentBoard");
  params = "createProject(" + "'" + dashboard._id + "'" + ")";
  functionToDO.setAttribute("onclick", params);
  addProjectHTML(dashboard.projects, dashboard._id);
  addContributorHTML(dashboard.members)
}

function addProjectHTML(projects, dashboardID){
  var projectSection = document.getElementById('dashboard')
  projectSection.innerHTML = "";
  for (var i = 0; i < projects.length; i++) {
    var html = '<div id="'+ projects[i]._id +'" class="tile is-parent is-2">'+
      '<div class="tile is-child box" style=" border-radius: 15px; background-color: hsl(0, 0%, 1%, 30%);">'+
        '<div class="level-right">'+
          '<a onclick="updateProjectModal()">'+
              '<figure class="image is-16x16">'+
                '<img class="is-rounded" src="./img/threeDotsWhite.png">'+
              '</figure>'+
            '</a>'+
        '</div>'+
        '<p class="title is-4 has-text-white">' + projects[i].title + '</p>'+
        '<p class="subtitle is-6 has-text-white">' + projects[i].description +'</p>'+
        '<div id="tasks'+ projects[i]._id + '" class="projectCard">'+
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
    projectSection.innerHTML += html;
    var functionToDO = document.getElementById("createTask");
    params = "createTask(" + "'" + dashboardID + "'" + "," + "'" + projects[i]._id + "'" +")";
    functionToDO.setAttribute("onclick", params);
    addTaskHTML(projects[i].tasks, projects[i]._id, dashboardID)
  }
}

function addTaskHTML(tasks, projectId, dashboardID){
  elementID = "tasks" + projectId
  var taskSection = document.getElementById(elementID)
  taskSection.innerHTML = "";
  for (var i = 0; i < tasks.length; i++) {
    var html = '<div id="' + tasks[i]._id +'" class="is-child box" name="dbTask">'+
                '<div class="level-right">'+
                  '<a onclick="updateTaskModal()">'+
                    '<figure class="image is-16x16">'+
                      '<img class="is-rounded" src="./img/threeDots.png">'+
                        '</figure>'+
                          '</a>'+
                        '</div>'+
                      '<p id="taskNameDB" class="title is-5">'+ tasks[i].name +'</p>'+
                      '<p id="taskDescriptionDB" class="subtitle is-7">'+ tasks[i].description + '</p>'+
                '</div>';
    taskSection.innerHTML += html;
  }
}



function addContributorHTML(contributors){
  console.log(contributors);
  var contributorSection = document.getElementById("colleagues")
  contributorSection.innerHTML = "";
  for (var i = 0; i < contributors.length; i++) {
    var html = '<p class="dropdown-item">'+ contributors[i] + '</p>';
    contributorSection.innerHTML += html;
  }
}
