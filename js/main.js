let fullName = document.getElementById("full-name");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let address = document.getElementById("address");
let tbody = document.getElementById("body");
let addBtb = document.getElementById("btn-add");
let search = document.getElementById("search");
let userAdd = document.getElementById("user-add");
let mood = "create";
let temp;

let users = [];

userAdd.onclick = () => {
  clearInputs();
  mood = "create";
  addBtb.textContent = "Save";
};

// check if theres task in local storage
if (localStorage.getItem("user")) {
  users = JSON.parse(localStorage.getItem("user"));
}

getDataFromLocalStorage();

addBtb.onclick = () => {
  const objUser = {
    id: users.length + 1,
    fullName: fullName.value.toLowerCase(),
    phone: phone.value,
    email: email.value,
    address: address.value,
  };

  if (mood === "create") {
    users.push(objUser);
  } else {
    objUser.id = temp + 1;
    users[temp] = objUser;
    mood = "create";
    addBtb.textContent = "Save";
  }

  //  show data into webPage
  showData(users);
  // add task to local storage
  addDataToLocalStorage(users);
  // clear input
  clearInputs();
};

// show data into webpage
function showData(users) {
  tbody.innerHTML = "";
  users.forEach((element, index) => {
    let tr = document.createElement("tr");
    tr.setAttribute("data-id", element.id);

    let tdId = document.createElement("td");
    tdId.textContent = element.id;

    let tdFullname = document.createElement("td");
    tdFullname.textContent = element.fullName;

    let tdPhone = document.createElement("td");
    tdPhone.textContent = element.phone;

    let tdEmail = document.createElement("td");
    tdEmail.textContent = element.email;

    let tdAddress = document.createElement("td");
    tdAddress.textContent = element.address;

    let edit = document.createElement("td");
    let buttonEdite = document.createElement("button");
    buttonEdite.textContent = "edit";
    buttonEdite.className = "updata";
    buttonEdite.setAttribute("data-bs-toggle", "modal");
    buttonEdite.setAttribute("data-bs-target", "#exampleModal");
    buttonEdite.setAttribute("data-index", index);
    edit.append(buttonEdite);

    let deletel = document.createElement("td");
    let buttonDel = document.createElement("button");
    buttonDel.textContent = "x";
    buttonDel.className = "del";
    deletel.append(buttonDel);

    tr.append(tdId, tdFullname, tdPhone, tdEmail, tdAddress, edit, deletel);
    tbody.append(tr);
  });
}

// clear inputs
function clearInputs() {
  fullName.value = "";
  phone.value = "";
  address.value = "";
  email.value = "";
}

// add user to local storage
function addDataToLocalStorage(users) {
  window.localStorage.setItem("user", JSON.stringify(users));
}
// get user to local storage
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("user");
  if (data) {
    showData(JSON.parse(data));
  }
}

// search user
function findProduct(value) {
  let table = "";
  users.forEach((element) => {
    if (element.fullName.includes(value.toLowerCase())) {
      table += `<tr>
                <td>${element.id}</td>
                <td>${element.fullName}</td>
                <td>${element.phone}</td>
                <td>${element.email}</td>
                <td>${element.address}</td>    
                <td><button id="edit">edit</button></td>    
                <td><button id="del">x</button></td>    
            </tr>`;
    }
  });
  tbody.innerHTML = table;

  if (value === "") {
    showData(users);
  }
}
// deleted user
tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    e.target.parentElement.parentElement.remove();
  }
});
function deleteTaskWith(elementId) {
  users = users.filter((task) => task.id != elementId);
  addDataToLocalStorage(users);
}

// updata user
tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("updata")) {
    updateUser(e.target.getAttribute("data-index"));
  }
});
function updateUser(elementId) {
  let index = +elementId;
  fullName.value = users[index].fullName;
  phone.value = users[index].phone;
  email.value = users[index].email;
  address.value = users[index].address;
  mood = "update";
  addBtb.textContent = "update";
  temp = index;
}
