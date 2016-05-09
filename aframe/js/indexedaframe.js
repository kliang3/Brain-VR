(function(){ 
var db;
var brain = document.querySelector("#brain"); 
console.log(brain);
var openRequest; 

function indexedDBOk() {
	return "indexedDB" in window;
}

document.addEventListener("DOMContentLoaded", function() {

	//No support? Go in the corner and pout.
	if(!indexedDBOk()) return;

	openRequest = window.indexedDB.open("objfilez",1);

	openRequest.onupgradeneeded = function(e) {
		var thisDB = e.target.result;
	}

	openRequest.onsuccess = function(e) {
		console.log("running onsuccess");
		db = e.target.result;
		getObjs(); 
	}	

	openRequest.onerror = function(e) {
		//Do something for the error
	}


},false);


	function getObjs() {
		 var transaction = db.transaction(["customers"]);
         var objectStore = transaction.objectStore("customers");
         var request = objectStore.get("00-01");

         request.onerror = function(event) {
          	alert("Unable to retrieve daa from database!");
         };

        request.onsuccess = function(event) {
          // Do something with the request.result!
          if(request.result) {
          		brain.setAttribute('src', request.result.URL)
          } else {
                alert("Error with IndexedDB, no results!"); 
          }
        };



		
	}
})();