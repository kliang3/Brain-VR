(function(){ 

	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

var reader = new FileReader(); 
var file; 
var db, brainFiles; 

$("#wavefrontobj").change(function() {
      file = document.getElementById("wavefrontobj");
      reader.readAsDataURL(file.files[0]);

      reader.onload = function (evt) {
	      	var resultdata = evt.target.result;
	      	if (!indexedDBOk()) return; 
	      	var request = window.indexedDB.open("objfilez",1);
	      	brainFiles = {
	      		id:"00-01"
	      	};
	      	brainFiles.URL=reader.result; 
	      	console.log(brainFiles.URL.length)


	      	request.onerror = function(event) {
 				 console.log("error: ");
			};

			request.onsuccess = function(event) {
  				db = request.result;
			};

			request.onupgradeneeded = function(event) {
 				var db = event.target.result;
 				var objectStore = db.createObjectStore("customers", {keyPath: "id"});
                	objectStore.add(brainFiles);      
		}
      }

});




function indexedDBOk(){
	return "indexedDB" in window; 
}

}) ();