// JavaScript Document
//stuff
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */   

var make = null
var model = null
var modelName = null
var webLink = null


function searchIt(){
	var query = document.getElementById('textBox').value.toLowerCase()
	var output = ""
	if(query){
		for(var i = 0; i < searchList.length; i++){
			if((searchList[i].indexOf(query) > -1)){
				output += "<p>"+searchList[i]+"</p>"
			}
		}
	}
	document.getElementById('searchResults').innerHTML = output;
}

$('#search').submit(function () {
	searchIt();
	return false;
});

function revealSearch(){
	if(document.getElementById("search").style.visibility != "hidden"){
		searchIt()	
	}
	else{
		document.getElementById('desc').style.visibility = "hidden";
		document.getElementById('link').style.innerHTML = "";
		document.getElementById('yearsBox').innerHTML = "";
		document.getElementById('textBox').value = "";
		document.getElementById('searchResults').innerHTML = "";
		document.getElementById("search").style.visibility = "visible";
		document.getElementById("searchResults").style.visibility = "visible";
	}
}


function populateMakes(){
	var output = "";
	for(i = 0; i < makeArray.length; i++){
		output += "<p id = "+makeArray[i]+" onclick = 'changeMake("+i+")'>"+makeArray[i]+"</p>"
	}
	document.getElementById("makeDropdown").innerHTML = output;	
}

function populateModels(){
	var curModelArray = modelArray[make]
	var output = "";
	if(make || make == 0){
		for(i = 0; i < modelArray[make].length; i++){
			if(output.indexOf(curModelArray[i][0]) == -1){
				output += "<p id = "+curModelArray[i][0]+" onclick = 'changeModel("+i+")'>"+curModelArray[i][0]+"</p>";
			}
		}
	}
	else{
		for(var i = 0; i < modelArray.length; i++){
			for(var o = 0; o < modelArray[i].length; o++){
				output += "<p id = "+modelArray[i][o][0]+" onclick = 'changeModelFull("+i+","+o+")'>"+modelArray[i][o][0]+"</p>";
			}
		}
	}
	document.getElementById("modelDropdown").innerHTML = output;		
}

function changeModelFull(imake, omodel){
	make = imake
	model = omodel
	modelName = modelArray[make][model][0]
	document.getElementById('makeButton').innerHTML = makeArray[make].toUpperCase()
	document.getElementById('modelButton').innerHTML = modelArray[make][model][0].toUpperCase()
	populateYears()
}

function populateYears(){
	var output = ""
	var keeper = 0
	for(i = 0; i < modelArray[make].length; i++){
		var nameOfModel = modelArray[make][model][0]
		var nameOfOtherModel = modelArray[make][i][0]
		if(nameOfModel == nameOfOtherModel){
			var modelIF = modelArray[make][i]
			for(var o = 0; o <= modelIF[2] - modelIF[1]; o++,keeper++){
				output += "<div class = 'year' style = 'left:"+ ((keeper%2) * 47.5 + 5) +"%;top:"+(Math.floor(keeper*.5) * 70) +"px' "+
				         "onclick = chooseYear("+(modelIF[1] + o)+")>"+(modelIF[1] + o)+"</div>"
			}
		}
	}
	document.getElementById('yearsBox').innerHTML = output
}

function chooseYear(year){
	for(i = 0; i < modelArray[make].length; i++){
		if((modelName == modelArray[make][i][0]) && 
		   (year >= modelArray[make][i][1]) &&
		   (year <= modelArray[make][i][2])){
			   document.getElementById('desc').style.visibility = 'visible'
			   document.getElementById('desc').style.top = ($(window).height() - 120) + 'px';
				document.getElementById('price').innerHTML = "Price: $" + modelArray[make][i][3]
				document.getElementById('link').innerHTML = "Buy It"
				webLink = modelArray[make][i][4]
		  } 
	}
}

function linkClick(){
	window.open(webLink,'_blank','location=yes','closebuttoncaption=Return')
}

function makeDD() {
	if(document.getElementById('modelDropdown').classList.contains('show')){
		document.getElementById('modelDropdown').classList.remove('show');
	}
    document.getElementById("makeDropdown").classList.toggle("show");
	document.getElementById("search").style.visibility = "hidden";
	document.getElementById("searchResults").style.visibility = "hidden";
}
function modelDD(){
	if(document.getElementById('makeDropdown').classList.contains('show')){
		document.getElementById('makeDropdown').classList.remove('show');
	}
	populateModels();
    document.getElementById("modelDropdown").classList.toggle("show");
	document.getElementById("search").style.visibility = "hidden";
	document.getElementById("searchResults").style.visibility = "hidden";
}
function changeMake(newMake){
	make = newMake
	document.getElementById("makeButton").innerHTML = makeArray[make].toUpperCase();
	document.getElementById("modelButton").innerHTML = "MODEL";
	document.getElementById("yearsBox").innerHTML = "";
	document.getElementById("price").innerHTML = "";
	document.getElementById("link").innerHTML = "";
}

function changeModel(newModel){
	model = newModel
	modelName = modelArray[make][model][0]
	document.getElementById("modelButton").innerHTML = modelArray[make][model][0].toUpperCase();
	populateYears()
	document.getElementById("price").innerHTML = "";
	document.getElementById("link").innerHTML = "";
}

function arrayToDropDownOptions(array){
	var modelString = "";
	for(i = 0; i < array.length; i++){
		modelString += "<p id = "+array[i]+">"+array[i]+"</p>";	
	}
	return modelString;
}

var ref = null;
function openInAppBrowserBlank(url)
{
    try {
ref = window.open(encodeURI(url),'_blank','location=no'); //encode is needed if you want to send a variable with your link if not you can use ref = window.open(url,'_blank','location=no');
         ref.addEventListener('loadstop', LoadStop);
         ref.addEventListener('exit', Close);
    }
    catch (err)    
    {
        alert(err);
    }
}
function LoadStop(event) {
         if(event.url == "http://www.mypage.com/closeInAppBrowser.html"){
            // alert("fun load stop runs");
             ref.close();
         }    
    }
function Close(event) {
         ref.removeEventListener('loadstop', LoadStop);
         ref.removeEventListener('exit', Close);
    } 

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


populateMakes()

