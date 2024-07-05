const foumulario = document.querySelector("#formulario")

const obtenerData =async(moneda)=>{
const res = await fetch("https://mindicador.cl/api/")
const data = await res.json()
console.log(data[moneda])
return data[moneda]
}

const crearGrafico =()=>{
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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

formulario.addEventListener("submit",async(event)=>{
    let monto = document.querySelector("#monto").value
    let moneda = document.querySelector("#moneda").value
    let result = await obtenerData(moneda)
    crearGrafico()
    
})