var form = document.querySelector("#my-form");
var uname = document.getElementById('name');
var udescription = document.getElementById('description');

form.addEventListener("submit", saveToLocalStorage);

async function saveToLocalStorage(e) {
  e.preventDefault();
  const todo = uname.value;
  const description = udescription.value;
  const obj = {
    todo,
    description,
    isdone: false,
  };
 const res = await axios
    .post(
      "https://crudcrud.com/api/d11188ecb66f41eeaf037994aa1006ee/todoData",
      obj
    )
    showTodoRemaining(res.data);

    uname.value = "";
    udescription.value = "";
}

window.addEventListener("DOMContentLoaded", async() => {
   const response = await axios
  .get("https://crudcrud.com/api/d11188ecb66f41eeaf037994aa1006ee/todoData")
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].isdone === false) {
        showTodoRemaining(response.data[i]);
      }
      else{
         showTodoDone(response.data[i]);
      }
    }
});

function showTodoRemaining(user) {
  const parentNode = document.getElementById("users");
  const childNode = document.createElement("li");
  childNode.setAttribute("id", user._id);
  childNode.setAttribute("name", user.todo);
  childNode.setAttribute("description", user.description);
  let del = document.createElement('button');
  let edit = document.createElement('button');
   del.className = 'delete';
   edit.className = 'edit';
   del.appendChild(document.createTextNode('X'));
   edit.appendChild(document.createTextNode('Y'));
   var texttobeput = `${user.todo} - ${user.description}`;
  // childNode.innerHTML = `${user.todo}- ${user.description}
  //             <button class = "delete" onclick=Crossitem('${user._id}')>X</button> 
  //             <button class = "edit"  onclick=TickItem("${user.todo}","${user.description}","${user._id}")>&#x2713</button>`;
  childNode.appendChild(document.createTextNode(texttobeput));
  childNode.appendChild(edit);
  childNode.appendChild(del);
  parentNode.appendChild(childNode);
}

// delete functionality in todos remaining
var itemList = document.getElementById("users");
itemList.addEventListener('click', Crossitem);
async function Crossitem(e) {
    if(e.target.classList.contains('delete')){
       var li = e.target.parentElement;
       itemList.removeChild(li);
    }
    else if(e.target.classList.contains('edit')){
        var parentNode = e.target.parentElement;
        var parentId = parentNode.id;
        let todo = parentNode.getAttribute('name');
        let description = parentNode.getAttribute('description');
       // console.log(todo, description);
        const rest =  await axios.put(`https://crudcrud.com/api/d11188ecb66f41eeaf037994aa1006ee/todoData/${parentId}`, {
           todo : todo, 
           description : description,
           isdone : true
        })
        const res = await findDataId();
        for(let i=0; i<res.length; i++){
          if(res[i].isdone==true){
           var li  = e.target.parentElement;
            itemList.removeChild(li);
            showTodoDone(res[i]);
          }
       }
}
}


// function findDataId logic
async function findDataId() {
  const res = await axios
    .get(
      "https://crudcrud.com/api/d11188ecb66f41eeaf037994aa1006ee/todoData"
    )
    return res.data;
}

// edit details
// function TickItem(itodo, idescription, id) {
//   console.log(itodo, idescription);
//   axios
//     .put(
//       `https://crudcrud.com/api/fe4a0e5d69294747882f5aa214979b21/todoData/${id}`,
//       {
//         todo: itodo,
//         description: idescription,
//         isdone: true
//       }
//     )
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
//   axios
//     .get("https://crudcrud.com/api/fe4a0e5d69294747882f5aa214979b21/todoData")
//     .then((response) => {
//       for (let i = 0; i < response.data.length; i++) {
//           if(response.data[i].isdone==true){
//              showTodoDone(response.data[i])
//           }
//       }
//     })
//     .catch((err) => console.log(err));
// }


function showTodoDone(user) {
  const parentNode = document.getElementById("users2");
  const childNode = document.createElement("li");
  childNode.setAttribute("id", user._id);
   let delbutton = document.createElement('button');
   delbutton.className = 'delete';
   delbutton.appendChild(document.createTextNode('X'));
   let textToBe = `${user.todo} - ${user.description}`;
   childNode.appendChild(document.createTextNode(textToBe));
   childNode.appendChild(delbutton);
  parentNode.appendChild(childNode);
}


// delete functionality in todos done
var itemList2 = document.getElementById("users2");
itemList2.addEventListener('click', Crossitem2);
function Crossitem2(e) {
    if(e.target.classList.contains('delete')){
       var li = e.target.parentElement;
       itemList2.removeChild(li);
    }
}


