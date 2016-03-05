var total = 0;
var done = 0;

var countries = 
		[
			{country: "argentina", capitol: "buenos aires", flag:0 },
			{country: "australia", capitol: "canberra", flag:0 },
			{country: "netherlands", capitol: "amsterdam", flag:0 },
			{country:"brazil", capitol:"brasilia", flag:0},
			{country:"canada", capitol:"ottawa", flag:0},
			{country:"china", capitol:"beijing", flag:0},
			{country:"egypt", capitol:"cairo", flag:0},
			{country:"france", capitol:"paris", flag:0},
			{country:"greece", capitol:"athens", flag:0},
			{country:"japan", capitol:"tokyo", flag:0},
			{country:"mexico", capitol:"mexico city", flag:0},
			{country:"peru", capitol:"lima", flag:0},
			{country:"united Kingdom", capitol:"london", flag:0 }
		]

function selectCountry()
{
	var i = Math.floor(Math.random()*13);
	if(countries[i].flag == 1)
	{
		selectCountry();
	}
	else
	{
		document.getElementById("Country").value = capitalizeFirstLetter(countries[i].country);
		selected(i);
	}

}

function checkAnswer()
{
	var cap = document.getElementById("Capitol").value.toLowerCase();
	var place = lcFirstLetter(document.getElementById("Country").value);
	var answer = "Wrong";

	if(cap == "" || cap.match(/[a-z]/) == null)
	{
		alert("Please Enter Valid Answer");
		return;
	}

	for (var i = 0; i < countries.length; i++) {
		if(countries[i].country === place)
		{
			if(countries[i].flag === 1)
			{
				if(countries[i].capitol === cap)
				{		
					total++;
					answer = "correct";
				}
				countries[i].flag++;
			}

			else
			{
				alert("Question already attempted");
				return;
			}
		}
	}

	alert(answer+"\n"+"Your Score is: "+total);
}

function selected(x)
{
	done++;
	if(done === 13)
	{
		alert("Please Refresh Page To Start Over");
	}
	countries[x].flag = 1;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lcFirstLetter (string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}

function registerEvents(){
	var b1 = document.getElementById("b1");
	b1.onclick = selectCountry;
	var b2 = document.getElementById("b2");
	b2.onclick = checkAnswer;
}
