var socket = io();

$.get("/meta",(msg)=>{msg = JSON.parse(msg); $("#ptitle").html(msg['unit'])})
$("#setbut").click(()=>{$.get(`/setpoint/${$("#setbox").val()}`)})

var layout = {
      xaxis: {tickfont:{family:'Courier New, monospace'}},
      yaxis: {
        title: {text: 'Temperature (˚C)', font: { family: 'Courier New, monospace', size: 18, color: '#7f7f7f'}},
        tickfont:{family:'Courier New, monospace'} 
      },    
    legend:{font:{family:'Courier New, monospace'}}
    };

    var config = {responsive: true}
plist = "setpoint,T13,T14,T15,TC";
probes = plist.split(",");
function makestruct(ll)
{
  oo = []
  for (i in ll)
      {
      oo[oo.length] = {x:[],y:[],name:ll[i]}
      }
  return oo
}


ss = makestruct(probes)        
TESTER = document.getElementById('tester');
Plotly.newPlot( TESTER, ss , layout,config );


socket.on('data', function(msg){
  opt = {trailingComma:false}
  $("#data").html(prettyPrintJson.toHtml(msg,opt))
  var time = new Date();

  xs = []
  for (i in probes){xs[xs.length] = [time]}
  ys = []
  for (i in probes){ys[ys.length] = [msg[probes[i]]]}
  ps = []
  for (i in probes){ps[ps.length] = parseInt(i)}
  Plotly.extendTraces('tester', {x:xs,y:ys}, ps)


})

