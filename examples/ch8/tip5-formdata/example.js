;(function (){
var myForm = new FormData();

myForm.append("username", "johndoe");
myForm.append("books", 7);

var xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:8080/hi");
xhr.send(myForm);
}());
