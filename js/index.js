/*
 name: todolist
 version: 1.0
 author: Yu Jae Jun
 date: 5/20/2018
*/
window.onload = function() {
	//variables
	var form = document.getElementById("form");
	var inputTitle = document.getElementById("inputTitle"); //제목
    var inputContent = document.getElementById("inputContent"); //내용
    var inputPriority = document.getElementById("inputPriority"); //우선순위
    var inputDuedate = document.getElementById("inputDuedate"); //마감기한
    
	var btn = document.getElementById("btn");
	var list = document.getElementById("list");	
	var btnClr = document.getElementById("btnClr");
    var btnDel = document.getElementById("btnDel");
    var btnAlarm = document.getElementById("btnAlarm");
    
	var id = 1;
	// listItem = {item: "todo item", checked: flase}
	var liItem = "";
	var todoList = [];

	//button event listener
	btn.addEventListener("click", addTodoItem);

	//list event listener
	list.addEventListener("click", boxChecked);

	//event listener for clear list
	btnClr.addEventListener("click", clearList);
    
    //remove event listener
    list.addEventListener("click", delItem);
    
    btnAlarm.addEventListener("click", calculate);
    

	if(localStorage.length <= 0) {
		btnClr.style.display = "none"; //hide clear btn	
		console.log("button");
	}

	//checking localstorage has data
	if(localStorage.length > 0) {
		displayList();
	}


	//add todo item to list
	function addTodoItem() {
        countTime();
		if(inputTitle.value === "") {
			alert("할 일의 제목이 비어있습니다!");
		}
		else {
			if(list.style.borderTop === "") {
				console.log("here!")
				list.style.borderTop = "2px solid white";
				btnClr.style.display = "inline";
			}
			var title = inputTitle.value;
            var content = inputContent.value;
            var priority = inputPriority.value;
            if(priority === "우선 순위(미지정 시 기본 값(-)으로)"){
                priority = "-";
            }
            var duedate = inputDuedate.value;
            if(duedate === ""){
                duedate = "-";
            }
			var itemTitle = `<li id="li-${id}" href="#" class="list-group-item list-group-item-action">
                <div id="list" class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">${title}</h5>
                    <small class="text-muted">
                      <span class="badge badge-primary badge-pill">`;
            var itemContent = `${content}</p>
                  <small class="text-muted">`;
            var itemPriority = `${priority}</span>
                    </small>
                </div>
                  <input id="box-${id}" class="checkboxes" type="checkbox">
                <p class="mb-1">`;
            var itemDuedate = `${duedate}</small>
                  <div align="right">
                  <button type="button" id="btnDel-${id}" class="btn btn-danger btn-sm">삭제</button></div>
              </li>`;
            console.log(itemTitle);
            
			list.insertAdjacentHTML('beforeend', itemTitle + itemPriority + itemContent + itemDuedate);
			liItem = {
                itemId: id,
                itemTitle: title,
                itemContent: content,
                itemPriority: priority,
                itemDuedate: duedate,
                checked: false
            };
            console.log("SSS"+id);
			todoList.push(liItem);		
			id++;
			addToLocalStorage();
			form.reset();
		}
	}

	//adding string through style to list itme
	function boxChecked(event) {
		const element = event.target;
        console.log(element);
		if(element.type === "checkbox") {
			element.parentNode.style.textDecoration = "line-through";
			todoList = JSON.parse(localStorage.getItem("todoList"));
            console.log("CHECK"+element.id.split('-')[1]-1);
			todoList[element.id.split('-')[1]-1].checked = element.checked.toString();            
            console.log("CHECK2"+todoList[element.id.split('-')[1]-1]);
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
	}
    
    //리스트에서 삭제.
    function delItem(event){
        const element = event.target;
        console.log(element);
        if(element.type === "button"){
            todoList = JSON.parse(localStorage.getItem("todoList"));
            todoList.splice(element.id.split('-')[1]-1, 1);
            localStorage.setItem("todoList", JSON.stringify(todoList));
            console.log("CHECK2");
            history.go(0);
        }
    }

	//adding data to local storage
	function addToLocalStorage() {
		if(typeof(Storage) !== "undefined") {
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
		else {
			alert("browser doesn't support local storage!");
		}
	}

	//display all todo list
	function displayList() {
		list.style.borderTop = "2px solid white";
		todoList = JSON.parse(localStorage.getItem("todoList"));
		todoList.forEach(function(element) {
			var title = element.itemTitle;
            var content = element.itemContent;
            var priority = element.itemPriority;
            var duedate = element.itemDuedate;
            
			var itemTitle = `<li id="li-${id}" href="#" class="list-group-item list-group-item-action">
                <div id="list" class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">${title}</h5>
                    <small class="text-muted">
                      <span class="badge badge-primary badge-pill">`;
            var itemContent = `${content}</p>
                  <small class="text-muted">`;
            var itemPriority = `${priority}</span>
                    </small>
                </div>
                  <input id="box-${id}" class="checkboxes" type="checkbox">
                <p class="mb-1">`;
            var itemDuedate = `${duedate}</small>
                  <div align="right">
                  <button type="button" id="btnDel-${id}" class="btn btn-danger btn-sm">삭제</button></div>
              </li>`;
            list.insertAdjacentHTML('beforeend', itemTitle + itemPriority + itemContent + itemDuedate);
            
            
			//if we got a checked box, then style
			if(element.checked) {
				var li = document.getElementById("li-"+id);
				li.style.textDecoration = "line-through";
				li.childNodes[1].checked = element.checked;
			}
			id++;
		});
	}

	//clear list event listener
	function clearList() {
		todoList = [];
		localStorage.clear();
		list.innerHTML = "";
		btnClr.style.display = "none";
		list.style.borderTop = "";
        id=1;
	}
    
    function countTime(){
//        var nowTime = new Date();
//        console.log(nowTime.getHours()+":"+nowTime.getMinutes()+":"+nowTime.getSeconds());
        
    }
    
    function calculate() {
        if(window.Notification){
            Notification.requestPermission();
        }
        setTimeout(function (){
            notify();
        }, 5000);
    }
    
    function notify(){
        
        if (Notification.permission !== "granted"){
            alert("notification is disabled");
        }
        else {
            todoList = JSON.parse(localStorage.getItem("todoList"));
            todoList.forEach(function(element){
                
                var title = element.itemTitle;
                var content = element.itemContent;
                var duedate = element.itemDuedate;
                var dueYear = Number(duedate.substring(0,4));
                var dueMonth = Number(duedate.substring(5,7));
                var dueDate = Number(duedate.substring(8,10));
                var dueHr = Number(duedate.substring(11,13));
                var dueMn = Number(duedate.substring(14,16));
                
                var currentDateTime = new Date();
                var currentYear = currentDateTime.getFullYear();
                var currentMonth = (currentDateTime.getMonth()+1);
                var currentDate = currentDateTime.getDate();
                var currentHr = currentDateTime.getHours();
                var currentMn = currentDateTime.getMinutes();
                var due = new Date(dueYear, dueMonth, dueDate, dueHr, dueMn);
                var cur = new Date(currentYear, currentMonth, currentDate, currentHr, currentMn);
                if(due.getTime()-currentDateTime.getTime() >= 0){
                    console.log("ALARM!!!!!!!!!!!!!!!");
                    var notification = new Notification(title+" 의 기간이 만료됐습니다.", {
                        icon: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
                        body: content,
                    });
                    notification.onclick = function(){
                        window.open("https://jaden2208.github.io/Jtodolist/");
                    };                        
                }
            });
        }
    }

}
