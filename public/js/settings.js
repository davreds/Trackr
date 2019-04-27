var changePass = document.getElementById('#change');
var password = document.getElementById('password');
change.addEventListener('click', function(event) {
  event.stopPropagation();
  password.classList.toggle('hidden');
});
