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
    editarBtm.addEventListener('click', () => editarActividad(parseInt(li.dataset.id)));
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
    const actividad = actividades.find(a => a.id === id);
    if (!actividad) {
        console.error("Actividad no encontrada con el ID", id);
        return;
    }
    // llenamos el formulario con los datos de la actividad
    document.getElementById('nombre').value = actividad.nombre
    document.getElementById('descripcion').value = actividad.descripcion
    document.getElementById('imagen').value = actividad.imagen
    // cambiar el texto del boton Agregar a Guardar CAmbios
    document.getElementById('agregarBtn').textContent = 'Guardar Cambios';
    // Remover el event listener original del botón "Agregar"
    agregarBtn.removeEventListener('click', agregarActividad);
    // agregar un listener temporal al boton Guardar Cambios
    document.getElementById('agregarBtn').addEventListener('click', function guardarCambios() {
    //actualizar los datos de la actividad
    actividad.nombre = document.getElementById('nombre').value;
    actividad.descripcion = document.getElementById('descripcion').value;
    actividad.imagen = document.getElementById('imagen').value;
    // volver a mostrar la lista actualizada
    mostrarActividades();
    // limpiar formulario
    limpiarFormulario();
    // restaurar el texto del boton y remover el event listener temporal
    document.getElementById('agregarBtn').textContent = 'Agregar';
    document.getElementById('agregarBtn').removeEventListener('click',guardarCambios);
    // document.getElementById('agregarBtn').addEventListener('click', agregarActividad);
},{ once:true});
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