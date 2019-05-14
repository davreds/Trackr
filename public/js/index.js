//Function to signup / create a new user
function signUp(){
  var aError = false;
  var name = document.getElementById("userName");
  var email = document.getElementById("userEmail");
  var pass1 = document.getElementById("userPassword1");
  var pass2 = document.getElementById("userPassword2");
  var errFrase = document.getElementById("errorFrase");
  errFrase.classList.add("hidden");

  if (validateEmail(email.value) == true){
    email.classList.remove("is-danger");
    email.classList.add("is-success");
  }
  else{
    email.classList.remove("is-success");
    email.classList.add("is-danger");
    aError = true;
  }

  if(validatePassword(pass1.value, pass2.value) == true){
    pass1.classList.remove("is-danger");
    pass1.classList.add("is-success");
    pass2.classList.remove("is-danger");
    pass2.classList.add("is-success");
  }
  else{
    pass1.classList.remove("is-success");
    pass1.classList.add("is-danger");
    pass2.classList.remove("is-success");
    pass2.classList.add("is-danger");
    aError = true;
  }

  if(aError == false){
    json_to_send = {
      "username" : name.value,
      "email": email.value,
      "password": pass1.value
    };

    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
      url: 'http://trackr-tec.herokuapp.com/users/',// url: 'https://tuapp.herokuapp.com/users',
      headers: {
          'Content-Type':'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        window.location = './login.html'
      },
      error: function(error_msg) {
        //console.log(error_msg.responseText);
        var errFrase = document.getElementById("errorFrase");
        errFrase.classList.remove("hidden");
        pass1.classList.add("is-danger");
        pass2.classList.add("is-danger");
      }
    });

  }

}

//Funciton to validate is passwords are the same
function validatePassword(pass1, pass2){
  if(pass1 == pass2 && (pass1 != '' || pass2 != '')){
    return true;
  }
  return false;
}


//Function to validate id a email is a email.
function validateEmail(email){
  var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
  if (email == '' || !re.test(email))
  {
    return false;
  }
  return true;
}
