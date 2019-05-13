function updatePassword(){
  var email = document.getElementById("userEmail");
  var pass1 = document.getElementById("newPassword");
  var pass2 = document.getElementById("newPassConfirm");
  var errorFlag = false;

  if (validateEmail(email.value) == true){
    email.classList.remove("is-danger");
    email.classList.add("is-success");
  }
  else{
    email.classList.remove("is-success");
    email.classList.add("is-danger");
    errorFlag = true;
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
    errorFlag = true;
  }

  if(errorFlag == false){

    json_to_send = {
      "email": email.value,
      "password": pass1.value
    };

    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
      url: '',// url: 'https://tuapp.herokuapp.com/users',
      headers: {
          'Content-Type':'application/json'
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        alert("Password changed");
        console.log('success: '+ data);
        window.location = './index.html';
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
  }

}


function validatePassword(pass1, pass2){
  if(pass1 == pass2 && (pass1 != '' || pass2 != '')){
    return true;
  }
  return false;
}

function validateEmail(email){
  var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
  if (email == '' || !re.test(email))
  {
    return false;
  }

  return true;
}
