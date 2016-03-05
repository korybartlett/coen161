
$(document).ready(function() {
	$('#submitButton').click(checkValues);
});

function checkValues(){
	var account = {
		'uname': $('#uname').val(),
		'pword': "",
		'address': $('#address').val(),
		'email': $('#email').val(),
		'phone': $('#phone').val(),
		'memberCode': ''
	};

	/*
	account.uname = document.getElementById("uname").value;
	//account.pword = document.getElementById("pword").value;
	account.pword = "";
	account.address = document.getElementById("address").value;
	account.email = document.getElementById("email").value;
	account.phone = document.getElementById("phone").value;	
	*/

	var user = account.uname.slice(0,2);
	accounts.memberCode = user;

	console.log(accounts);

	if(account.uname == ""){
		alert("Enter your Name");
		document.getElementById("uname").focus();
		return;
	}

	if (account.uname.match(/^[a-zA-Z]+[\s][a-zA-Z]+$/) == null){
		alert("Letters only in name field");
		document.getElementById("uname").focus();
		return;
	}

	if (account.address == ""){
		alert("Enter address");
		return;
	}

	if(account.address.match(/^[\d]+[\.]+$/)){
		alert("enter vaild address");
		return;
	}

	if (email == "") {
		alert("enter vaild email");
		return;
	}

	if (account.email.match(/^[\w]+[@]{1}[a-zA-Z]+[\.]{1}[a-zA-Z]+ $/) == null) {
		alert("enter valid email");
		document.getElementById("email").focus();
		return;
	}


	if (account.phone) {
		alert("Enter phone number");
		return;
	}

	if(account.phone.match(/[0-9]{10}/) == null){
		alert("Digits only in Phone Number field");
		return;
	}

}