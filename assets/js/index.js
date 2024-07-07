const btnBuscar = document.querySelector("#btnBuscar")
const resultado= document.querySelector("#resultado")
const canvasContainer = document.getElementById('canvasContainer');

var monedas=[
  {codigo:"dolar",valor:"Dólar observado"},
  {codigo:"dolar_intercambio",valor:"Dólar acuerdo"},
  {codigo:"euro",valor:"Euro"},
  {codigo:"libra_cobre",valor:"Libra de Cobre"},
  {codigo:"bitcoin",valor:"Bitcoin"}
];



pintarOpciones = (monedas)=>{
  let select = document.querySelector("#moneda")
  let option = document.createElement("option")
    option.value =""
    option.innerHTML = "Seleccione una moneda"
    select.appendChild(option)
  for (let i = 0; i < monedas.length; i++) {
    let option = document.createElement("option")
    option.value = monedas[i].codigo
    option.innerHTML = monedas[i].valor
    select.appendChild(option)
  }
}

const crearGrafico =(etiquetas,valores)=>{
  const ctx = document.getElementById('myChart').getContext('2d');


  myChart= new Chart(ctx, {
    type: 'line',
    data: {
      labels:etiquetas,
      datasets: [{
        label: 'Historial',
        data: valores,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
}

const resetDatos = () => {

  canvasContainer.innerHTML = '<canvas id="myChart"></canvas>';
  resultado.innerHTML = '';
};


pintarOpciones(monedas);


btnBuscar.addEventListener("click",async(event)=>{
    let monto = document.querySelector("#monto").value
    let moneda = document.querySelector("#moneda").value
    
    let dataMoneda= await obtenerData(moneda);
    
    let precio= dataMoneda.serie[0].valor;
    
    let total = monto/precio;
    resultado.innerHTML = `Resultado: <strong> ${total.toFixed(2)} </strong>`;

    etiquetas = dataMoneda.serie.map((item)=>item.fecha.substring(0,10))
    valores = dataMoneda.serie.map((item)=>item.valor)

    crearGrafico(etiquetas,valores);
 })

const obtenerData = async(moneda)=>{
  const res = await fetch(`https://mindicador.cl/api/${moneda}`)
  if (res.status !== 200) {
    alert("Error al obtener los datos")
    return [];
  }
  else{
    return await res.json()
  }
}