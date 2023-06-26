
// --------------------------------------get ids-----------------------------------------------------
var popup=document.getElementById("tablePop");

var data = []; 
var deletedIds = []; 
var selectedRow = null; 


var idInput = document.getElementById("id");
var nameInput = document.getElementById("name");
var ageInput = document.getElementById("age");
var genderInput = document.getElementById("gender");


var idError = document.getElementById("idError");
var nameError = document.getElementById("nameError");
var ageError = document.getElementById("ageError");
var genderError = document.getElementById("genderError");

// ---------------------------------------------get ids end----------------------------------------

// -----------------------------------------------storing data----------------------------------------
function storeData() {
  
  clearValidationErrors();

  
  var id = idInput.value;
  var name = nameInput.value.trim();
  var age = ageInput.value;
  var gender = genderInput.value;

  
  var isValid = true;

  if (id === "") {
    idError.textContent = "ID is required";
    isValid = false;
  } else if (isIdExists(id) || isIdDeleted(id)) {
    idError.textContent = "ID is already taken. Please enter a unique ID.";
    isValid = false;
  }

  if (name === "") {
    nameError.textContent = "Name is required";
    isValid = false;
  } else if (!isAlphabet(name)) {
    nameError.textContent = "Name must contain only alphabets";
    isValid = false;
  }

  if (age === "") {
    ageError.textContent = "Age is required";
    isValid = false;
  } else if (!isInteger(age) || !isAgeInRange(age)) {
    ageError.textContent = "Age must be an integer between 18 and 60";
    isValid = false;
  }

  if (gender === "") {
    genderError.textContent = "Gender is required";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  var entry = {
    id: id,
    name: name,
    age: age,
    gender: gender
  };

  if (selectedRow === null) {

    data.push(entry);

    var table = document.getElementById("dataTable");
    var tbody = table.getElementsByTagName("tbody")[0];

    var newRow = tbody.insertRow();
    var idCell = newRow.insertCell();
    var nameCell = newRow.insertCell();
    var ageCell = newRow.insertCell();
    var genderCell = newRow.insertCell();
    var actionsCell = newRow.insertCell();

    idCell.textContent = id;
    nameCell.textContent = name;
    ageCell.textContent = age;
    genderCell.textContent = gender;

    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", function() {
      popup.style.display="none";
      editData(newRow);
    });

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function() {
      deleteData(newRow);
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  } else {
    var rowIndex = selectedRow.rowIndex;
   
    data[rowIndex - 1] = entry; 

    var idCell = selectedRow.cells[0];
    var nameCell = selectedRow.cells[1];
    var ageCell = selectedRow.cells[2];
    var genderCell = selectedRow.cells[3];

    idCell.textContent = id;
    nameCell.textContent = name;
    ageCell.textContent = age;
    genderCell.textContent = gender;

    selectedRow = null; // Reset selectedRow after updating
    var addButton = document.getElementById("addButton");
    addButton.textContent = "Add";
    popup.style.display="block";
    document.getElementById("cancelButton").style.display = "none";
  }

  resetForm();
}


// ----------------------------------------storing data end----------------------------------------


function isIdExists(id) {
  return data.some(function(entry) {
    return entry.id === id;
  });
}

function isIdDeleted(id) {
  return deletedIds.includes(id);
}

// ----------------------------------------edit -- delet and  cancel edid data----------------------------------
function editData(row) {
  selectedRow = row;
  var rowIndex = selectedRow.rowIndex;

  var entry = data[rowIndex - 1]; 
  if (!entry) return;

  var id = entry.id;
  var name = entry.name;
  var age = entry.age;
  var gender = entry.gender;

  idInput.value = id;
  nameInput.value = name;
  ageInput.value = age;
  genderInput.value = gender;

  var addButton = document.getElementById("addButton");
  addButton.textContent = "Update";

  document.getElementById("cancelButton").style.display = "inline-block";
}

function deleteData(row) {
  var rowIndex = row.rowIndex;
  var idCell = row.cells[0];
  var id = idCell.textContent;

  data.splice(rowIndex - 1, 1); 
  deletedIds.push(id);
  var table = document.getElementById("dataTable");
  table.deleteRow(rowIndex);

  if (row === selectedRow) {
    selectedRow = null; 
    var addButton = document.getElementById("addButton");
    addButton.textContent = "Add";
    document.getElementById("cancelButton").style.display = "none";
  }
}

function cancelEdit() {
  selectedRow = null; 
  var addButton = document.getElementById("addButton");
  addButton.textContent = "Add";
  document.getElementById("cancelButton").style.display = "none";
  popup.style.display="block";
  resetForm();
}

function resetForm() {
  clearValidationErrors();
  document.getElementById("myForm").reset();
}

// --------------------------------------end edit-delet and cancel-edit ---------------------------
function clearValidationErrors() {
  idError.textContent = "";
  nameError.textContent = "";
  ageError.textContent = "";
  genderError.textContent = "";
}

function isAlphabet(value) {
  var regex = /^[a-zA-Z\s]*$/;
  return regex.test(value);
}

function isInteger(value) {
  var regex = /^\d+$/;
  return regex.test(value);
}

function isAgeInRange(value) {
  var age = parseInt(value);
  return age >= 18 && age <= 60;
}

