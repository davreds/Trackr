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

//function to show the new dashboard Modal
function newDashboardModal(){
  var modal = document.getElementById("addDashboardModal");
  event.stopPropagation();
  modal.classList.toggle('is-active');
}


//Function to show the add new project modal
function newProjectModal(){
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

//Function to show the project configuration modal
function projectConfigModal(){
  var modal = document.getElementById("dashboardConfigModal");
  event.stopPropagation();
  modal.classList.toggle('is-active');
}

//Function to show the modal of adding a new task to a projectPage
function addNewTask(){
  var modal = document.getElementById("addTask");
  event.stopPropagation();
  modal.classList.toggle('is-active');
}

//Funtion to show the project in fullscreen as a modal
function showAll(){
  var modal = document.getElementById("showAllTasks");
  event.stopPropagation();
  modal.classList.toggle('is-active');
  //Function to display the whole project.
}

//Function to save and create a new dashboard
function newDashboard(){
  var modal = document.getElementById("addDashboardModal");
  var dashboardName = document.getElementById("newDashboardName").value;
  var dashboardDescription = document.getElementById("newDashboardDescription").value;
  event.stopPropagation();
  modal.classList.toggle('is-active');
  //Function to create new dashboard
}

//Function to save and create a new dashboard
function newProject(){
  var modal = document.getElementById("addProjectModal");
  var projectName = document.getElementById("newProjectName").value;
  var projectDescription = document.getElementById("NewProjectDescription").value;
  event.stopPropagation();
  modal.classList.toggle('is-active');
  //Function to create new project

}

//Function to add new contributor to a dashboard
  function addContributor(){
  var modal = document.getElementById("addContributorModal");
  var email = document.getElementById("contributorEmail").value;
  event.stopPropagation();
  modal.classList.toggle('is-active');
  //Function to add person.
}

//Function to make changes to the projectName
  function openDashboardConfig(){
    var modal = document.getElementById("dashboardConfigModal");
    var dashboardName = document.getElementById("dashboardName").value;
    var dashboardDescription = document.getElementById("dashboardDescription").value;
    event.stopPropagation();
    modal.classList.toggle('is-active');
    //Function to update Dashboard
  }

  //Function to create a task
  function createTask(){
    var modal = document.getElementById("addTask");
    var taskName = document.getElementById("taskName").value;
    var taskDescription = document.getElementById("taskDescription").value;
    event.stopPropagation();
    //Function to create new task1
    modal.classList.toggle('is-active');
  }


//Quit dashboard
function quitDashboard(){
  var modal = document.getElementById("dashboardConfigModal");
  event.stopPropagation();
  //Funcion de salir del dashboard.
  modal.classList.toggle('is-active');
}
