// ****select Items****
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editId ="";

//Event Listernrs
//submit form
form.addEventListener('submit', addItem);

//clear items
clearBtn.addEventListener('click', claerItems);
//load items
window.addEventListener('DOMContentLoaded', setupItems)

//functions
function addItem(e){                        // e=event
e.preventDefault();                         // preventdafault() method cancels the default event belongs to this event.
const value = grocery.value[0].toUpperCase() + grocery.value.slice(1);
const id = new Date().getTime().toString(); //added to give the specific id to each item but can't be used in the larg projects

if(value !=='' && editFlag === false){       //can also right like this (value && !editFlag) 
//     const element = document.createElement('article');
//     // add class
//     element.classList.add('grocery-items');
//     // add id
//     const attr = document.createAttribute('data-id');
//     attr.value = id;
//     element.setAttributeNode(attr);
//     element.innerHTML = `<p class="title">${value}</p>
//     <div class="btn-container">
//         <button type="button" class="edit-btn">
//             <i class="fas fa-edit"></i>
//         </button>
//         <button type="button" class="delete-btn">
//             <i class="fas fa-trash"></i>
//         </button>
//     </div>`;
// //document.getElementById('grocery').innerHTML='';
//    const deteleBtn = element.querySelector('.delete-btn');
//    const editBtn = element.querySelector('.edit-btn');
//    deteleBtn.addEventListener('click', deleteItem);
//    editBtn.addEventListener('click', editItem);



//   //append child
//   list.appendChild(element);
createListItem(id, value);

  //display alert
  displayAlert("items added to the list", "success"); 
  //show container
   container.classList.add("show-container");
   //add to local storage
  addToLocalStorage(id,value);
   //set back to default
   setBackToDefault();

}
else if(value !=='' && editFlag === true) {
    editElement.innerHTML = value;
    displayAlert("Item Edited Successfully", "success");
    //edit local storage
    editLocalStorage(editId, value);

    setBackToDefault();
}
else{
    //console.log('empty value');
    displayAlert("Please add item", "danger");
}
}
//display alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

//remove alert
    setTimeout(function(){
        alert.textContent = ``;
        alert.classList.remove(`alert-${action}`);
    },2000);
}

//clear items
function claerItems(){
    const items = document.querySelectorAll('.grocery-items');
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });

    }
    container.classList.remove("show-container");
    displayAlert("Items cleared", "danger");
    setBackToDefault();
    localStorage.removeItem('list');
}


//delete function
function deleteItem(e){
const element = e.currentTarget.parentElement.parentElement;
const id = element.dataset.id;
list.removeChild(element);
if(list.children.length === 0){
    container.classList.remove("show-container");
}
displayAlert("Item removed", "danger");
setBackToDefault();
//remove from local storage
removeFromLocalStorage(id);
}

//edit function
function editItem(e){
const element = e.currentTarget.parentElement.parentElement;
//set edit item
editElement = e.currentTarget.parentElement.previousElementSibling;
//set form value
grocery.value = editElement.innerHTML;
editFlag = true;
editId = element.dataset.id;
submitBtn.textContent = "Edit";
}


//set back to default

function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editId = "";
    submitBtn.textContent = "Submit";

}
//local storage
function addToLocalStorage(id,value){
    const grocery = {id: id, value: value};  //can also write {id, value}; bcoz same value as property name
    let items = getLocalstorage();
    //console.log('items before push', items)
    items.push(grocery);
    //console.log('items after push', items)
    // items.previousElementSibling;
    localStorage.setItem('list', JSON.stringify(items));

    //console.log("added to local storage");
}
function removeFromLocalStorage(id){
    let items = getLocalstorage();

    items = items.filter(function (item){
        if (item.id !==id) {
            return item;
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value){
    let items = getLocalstorage();
    items = items.map(function(item){
        if (item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));
}

function getLocalstorage(){
    return localStorage.getItem('list')?JSON.parse
    (localStorage.getItem('list')):[];
}

//localStorage API

//localStorage.setItem('orange',JSON.stringify(['item', 'item2']));
//constoranges = JSON.parse(localStorage.getItem("orange"));

//localStorage.removeItem("orange");


//****setup Items *****/

function setupItems(){
    let items = getLocalstorage();
    if (items.length>0){
items.forEach(function(item){
    createListItem(item.id, item.value);
})
container.classList.add('show-container')
    }
}


function createListItem(id, value){

const element = document.createElement('article');
// add class
element.classList.add('grocery-items');
// add id
const attr = document.createAttribute('data-id');
attr.value = id;
element.setAttributeNode(attr);
element.innerHTML = `<p class="title">${value}</p>
<div class="btn-container">
    <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
    </button>
</div>`;
//document.getElementById('grocery').innerHTML='';
const deteleBtn = element.querySelector('.delete-btn');
const editBtn = element.querySelector('.edit-btn');
deteleBtn.addEventListener('click', deleteItem);
editBtn.addEventListener('click', editItem);



//append child
list.appendChild(element);
}