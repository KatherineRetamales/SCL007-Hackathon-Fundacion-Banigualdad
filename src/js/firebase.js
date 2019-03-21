// Initialize Firebase
var config = {
    apiKey: "AIzaSyBLGm3s32hKDjA_djFU_tPWSsd9Xk7xJ7E",
    authDomain: "banigualdad-801b1.firebaseapp.com",
    databaseURL: "https://banigualdad-801b1.firebaseio.com",
    projectId: "banigualdad-801b1",
    storageBucket: "banigualdad-801b1.appspot.com",
    messagingSenderId: "393954630663"
};
firebase.initializeApp(config);
var d = new Date();
var t = d.getTime();
var counter = t;

document.getElementById("form").addEventListener("submit", (e) => {
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    e.preventDefault();
    createName(name, description);
    form.reset();
});

function createName(name, description) {
    counter += 1;

    var emprendedor = {
        nombre: name,
        id: counter,
        descripcion: description
    }
    let db = firebase.database().ref("emprendedor/" + counter);
    db.set(emprendedor);

    document.getElementById("cardSection").innerHTML = "";
    readName();
}

function readName() {
    var emprendedor = firebase.database().ref("emprendedor/");
    emprendedor.on("child_added", function (data) {
        var empValue = data.val();
        console.log(empValue);
        document.getElementById("cardSection").innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${empValue.nombre}</h5>
                    <p>${empValue.descripcion}</p>
                    <button type="submit" style="color:white" class="btn btn-warning"
                    onclick="updateName(${empValue.id},'${empValue.nombre}','${empValue.descripcion}')">
                    <i class="far fa-edit"></i>
                    </button>
                    <button type="submit" class="btn btn-danger" onclick="deleteName(${empValue.id})"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
            `
    });
}

function reset() {
    document.getElementById("firstSection").innerHTML = `
        <form id="form" class="border p-4 mb-4">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" class="form-control" id="name" placeholder="Ingrese el nombre del emprendedor">
        </div>
        <div class="form-group">
          <label>Description</label>
          <input type="text" class="form-control" id="description" placeholder="Ingrese descripcion">
        </div>
        <button type="submit" class="btn btn-primary" id="button1">Agregar</button>
        <button style="display:none" class="btn btn-success" id="button2">Modificar</button>
        <button style="display:none" class="btn btn-danger" id="button3">Cancelar</button>
      </form> `;

    document.getElementById("form").addEventListener("submit", (e) => {
        var name = document.getElementById("name").value;
        var description = document.getElementById("description").value;
        e.preventDefault();
        createName(name, description);
        form.reset();
    });
}

function updateName(id, name, description) {
    document.getElementById("firstSection").innerHTML = `
    <form id="form2" class="border p-4 mb-4">
    <div class="form-group">
      <label>Nombre</label>
      <input type="text" class="form-control" id="name" placeholder="Ingrese el nombre del emprendedor">
    </div>
    <div class="form-group">
      <label>Description</label>
      <input type="text" class="form-control" id="description" placeholder="Ingrese descripcion">
    </div>
    <button style="display:none" class="btn btn-primary" id="button1">Agregar</button>
    <button style="display:inline-block" class="btn btn-success" id="button2">Modificar</button>
    <button style="display:inline-block" class="btn btn-danger" id="button3">Cancelar</button>
  </form> 
    `;

    document.getElementById("form2").addEventListener("submit", (e) => {
        e.preventDefault();
    });
    document.getElementById("button3").addEventListener("click",(e)=>{
        reset();
    });
    document.getElementById("button2").addEventListener("click",(e)=>{
        updateName2(id,document.getElementById("name").value,
        document.getElementById("description").value);
    });
    document.getElementById("name").value=name;
    document.getElementById("description").value=description;
}

function updateName2(id,name,description){
    var nameUpadate ={
        nombre: name,
        id: id,
        descripcion: description
    }
    let db = firebase.database().ref("emprendedor/"+id);
    db.set(nameUpadate);

    document.getElementById("cardSection").innerHTML='';
    readName();
    reset();
}

function deleteName(id){
    var name = firebase.database().ref("emprendedor/"+id);
    name.remove();
    reset();
    document.getElementById("cardSection").innerHTML='';
    readName();
}