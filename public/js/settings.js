//Show/hide change password
var changePass = document.getElementById('change');
var password = document.getElementById('password');
change.addEventListener('click', function(event) {
  event.stopPropagation();
  password.classList.toggle('hidden');
});

//Function to create a task
function changeName(){
  var name = document.getElementById("username");
  name.classList.remove('is-danger');
  name.classList.remove('is-success');
  //Function to update name
  console.log(name);
  if(name.value == ""){
    name.classList.toggle('is-danger');
  }
  else{
    name.classList.toggle('is-success');
  }

}

//Funtion to cancel change name
function changeNameCancel(){
  var name = document.getElementById("username");
  name.classList.remove('is-danger');
  name.classList.remove('is-success');
  name.value = "";
}

//Function to create a task
function changeEmail(){
  var email = document.getElementById("useremail");
  email.classList.remove('is-danger');
  email.classList.remove('is-success');
  //Function to update email
  if(email.value == ""){
    email.classList.toggle('is-danger');
  }
  else{
    email.classList.toggle('is-success');
  }
}

function changeEmailCancel(){
  var email = document.getElementById("useremail");
  email.classList.remove('is-danger');
  email.classList.remove('is-success');
  email.value = "";

}

function changePassword(){
  var newPassword = document.getElementById("newPassword");
  var newPassConfirm = document.getElementById("newPassConfirm");
  var actualPass = document.getElementById("actualPass");
  newPassword.classList.remove('is-danger');
  newPassConfirm.classList.remove('is-danger');
  actualPass.classList.remove('is-danger');
  newPassword.classList.remove('is-success');
  newPassConfirm.classList.remove('is-success');
  actualPass.classList.remove('is-success');
  //Function to update email
  if(newPassword.value != newPassConfirm.value || (newPassword.value == "" || newPassConfirm.value == "")){
    newPassword.classList.toggle('is-danger');
    newPassConfirm.classList.toggle('is-danger');
    actualPass.classList.toggle('is-danger');
  }
  else {
    newPassword.classList.toggle('is-success');
    newPassConfirm.classList.toggle('is-success');
    actualPass.classList.toggle('is-success');
  }
}

function changePasswordCancel(){
  var newPassword = document.getElementById("newPassword");
  var newPassConfirm = document.getElementById("newPassConfirm");
  var actualPass = document.getElementById("actualPass");
  newPassword.classList.remove('is-danger');
  newPassConfirm.classList.remove('is-danger');
  actualPass.classList.remove('is-danger');
  newPassword.classList.remove('is-success');
  newPassConfirm.classList.remove('is-success');
  actualPass.classList.remove('is-success');
  newPassword.value = newPassConfirm.value = actualPass.value = "";
}
