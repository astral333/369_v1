class Actividad {
    constructor(id,nombre,descripcion,imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}
// array para almacenar las asctividades
let actividades = [];
let siguienteId = 1; //para asignar IDs únicos
// funciones del DOM para crear elementos HTML
function crearElementoLista(actividad,id) {
    const li = document.createElement('li');
    li.dataset.id =id; //almacenar el ID en el elemento
    const img = document.createElement('img');
    img.src = actividad.imagen;
    img.alt = actividad.nombre;
    const h3 = document.createElement('h3');
    h3.textContent=actividad.nombre;
    const p = document.createElement('p');
    p.textContent = actividad.descripcion;
    const editarBtm = document.createElement('button');
    editarBtm.textContent = 'Editar';
    editarBtm.addEventListener('click',()=>editarActividad(actividad.id));
    const eliminarBtm = document.createElement('button');
    eliminarBtm.textContent = 'Eliminar'
    eliminarBtm.addEventListener('click',()=> eliminarActividad(actividad.id));
    li.appendChild(img);
    li.appendChild(h3);
    li.appendChild(p);
    li.appendChild(editarBtm);
    li.appendChild(eliminarBtm);
    return li;
}
function mostrarActividades() {
    const listaActividades = document.getElementById('actividades');
    listaActividades.innerHTML = ''; // Limpia lista
    actividades.forEach((actividad,id) =>{
        const li = crearElementoLista(actividad,id);
        listaActividades.appendChild(li);
    });
}
//funciones CRUD
function agregarActividad() {
    //dstructuraicon para obtener los valores de los imputs
    const {value:nombre} = document.getElementById('nombre');
    const {value:descripcion} = document.getElementById('descripcion');
    const {value:imagen} = document.getElementById('imagen');
    const nuevaActividad = new Actividad(siguienteId++,nombre,descripcion,imagen);
    actividades.push(nuevaActividad);
    mostrarActividades();
    limpiarFormulario();
}
function editarActividad(id) {
    // llenamos el formulario con los datos de la activiadad
    // cambiar el texto del boton Agregar a Guardar CAmbios
    // agregar un listener temporal al boton Guardar Cambios
    //actualizar los datos de la actividad
    // volver a mostrar la lista actualizada
    // limpiar formulario
    // restaurar el texto del boton y remover el event listener temporal
}
function eliminarActividad(id) {
    actividades = actividades.filter(actividad => actividad.id !== id);
    mostrarActividades();
}
function limpiarFormulario(params) {
    document.getElementById('nombre').value='';
    document.getElementById('descripcion').value='';
    document.getElementById('imagen').value='';
}
//Event listeners
document.getElementById('agregarBtn').addEventListener('click', agregarActividad);
// Mostrar Actividades al cargar la pagina - si hay datos almacenados
// logica para cargar datos desde localStorage u otra fuente