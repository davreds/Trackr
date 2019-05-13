function logIn(){
  var username = document.getElementById("userName");
  var password = document.getElementById("userPass");

    json_to_send = {
      "username": username.value,
      "password" : password.value
    };

    json_to_send = JSON.stringify(json_to_send);

    $.ajax({
      url: 'http://trackr-tec.herokuapp.com/users/login', // url: 'https://tuapp.herokuapp.com/users/login'
      headers: {
          'Content-Type':'application/json'
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        // guardar token en localstorage o cookie
        localStorage.setItem('token', data.token);
        window.location = './dashboard.html';
      },
      error: function(error_msg) {

        var err = (error_msg.responseText)

        if(err == '{\"error\":\"User does not exist\"}'){
          username.classList.remove("is-success");
          username.classList.add("is-danger");
        }
        else{
          username.classList.remove("is-danger");
          username.classList.add("is-success");
        }

        if(err == '{\"error\":\"Wrong password!\"}'){
          password.classList.remove("is-success");
          password.classList.add("is-danger");
        }
        else{
          password.classList.remove("is-danger");
          password.classList.add("is-success");
        }

      }
    });

}

/*

*/
