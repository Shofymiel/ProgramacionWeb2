const calendario = document.getElementById("calendario")
const mesActualTexto = document.getElementById("mesActual")
const diasSemana = ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"]

let fecha = new Date()
let mes = fecha.getMonth()
let año = fecha.getFullYear()
let diaSeleccionado = null

function generarCalendario(){

    calendario.innerHTML=""

    const primerDia = new Date(año,mes,1).getDay()
    const totalDias = new Date(año,mes+1,0).getDate()

    mesActualTexto.innerText =
    fecha.toLocaleString("default",{month:"long"})+" "+año

    for(let i=0;i<primerDia;i++){
        const espacio = document.createElement("div")
        calendario.appendChild(espacio)
    }

    for(let d=1; d<=totalDias; d++){
        const dia = document.createElement("div")
        dia.classList.add("dia")
        dia.innerText=d
        dia.onclick=()=>seleccionarDia(d)
        calendario.appendChild(dia)
    }

}

function cambiarMes(valor){
    mes+=valor

    if(mes<0){mes=11;año--}
    if(mes>11){mes=0;año++}

    fecha = new Date(año,mes)
    generarCalendario()
}

function seleccionarDia(d){
    diaSeleccionado=`${año}-${mes+1}-${d}`

    document.getElementById("fechaSeleccionada").innerText=
    "Tareas del "+d+"/"+(mes+1)+"/"+año

    cargarTareas()
}

function agregarTarea(){

    if(!diaSeleccionado) return
    const texto=document.getElementById("nuevaTarea").value

    if(texto==="") return
    let tareas=JSON.parse(localStorage.getItem(diaSeleccionado))||[]

    tareas.push({texto:texto,done:false})
    localStorage.setItem(diaSeleccionado,JSON.stringify(tareas))

    document.getElementById("nuevaTarea").value=""

    cargarTareas()
}

function cargarTareas(){

    const lista=document.getElementById("listaTareas")

    lista.innerHTML=""

    let tareas=JSON.parse(localStorage.getItem(diaSeleccionado))||[]

    tareas.forEach((t,i)=>{

    const li=document.createElement("li")

    const check=document.createElement("input")
    check.type="checkbox"
    check.checked=t.done

    check.onclick=()=>completarTarea(i)

    const span=document.createElement("span")
    span.innerText=t.texto

    if(t.done) span.classList.add("completada")

    li.appendChild(check)
    li.appendChild(span)

    lista.appendChild(li)

    })
}

function completarTarea(i){

    let tareas=JSON.parse(localStorage.getItem(diaSeleccionado))

    tareas[i].done=true

    localStorage.setItem(diaSeleccionado,JSON.stringify(tareas))

    let premios=parseInt(localStorage.getItem("premios"))||0
    premios++

    localStorage.setItem("premios",premios)

    document.getElementById("premios").innerText=
    premios+" descuentos disponibles"

    cargarTareas()
}

generarCalendario()

let premios=parseInt(localStorage.getItem("premios"))||0
document.getElementById("premios").innerText=
premios+" descuentos disponibles"