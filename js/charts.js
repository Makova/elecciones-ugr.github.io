
// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Candidatura');
    data.addColumn('number', 'Porcentaje de votos');
    for ( var c in resultados ) {
        data.addRow([c, parseFloat(resultados[c]['Total'])]);
    }
    
    // Set chart options
    var options = {'title':'Resultados elecciones rectorado',
                   'width':'95%',
                   'is3D' : true,
                   'fontSize' : 24,
                   'height':400,
                   'legend': {'position':'bottom'}};
    
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('total'));
    chart.draw(data, options);
    
    // Create the data table.
    var sectores = new google.visualization.DataTable();
    sectores.addColumn('string', 'Sector - %');
    var columnas = new Object;
    for ( var c in resultados ) {
	sectores.addColumn('number', '% '+c);
	sectores.addColumn({type:'number',role:'annotation'});
	for ( var s in resultados[c]['Sector'] ) {
	    columnas[resultados[c]['Sector'][s]["Sector"]] = [];
        }
    }
    console.log( columnas );
    for ( var c in resultados ) {
        for ( var s in resultados[c]['Sector'] ) {
	    columnas[resultados[c]['Sector'][s]["Sector"]].push(parseFloat(resultados[c]['Sector'][s]['Resultado']));
	    columnas[resultados[c]['Sector'][s]["Sector"]].push(parseFloat(resultados[c]['Sector'][s]['Votos']));
	}
    }

    for (var c in columnas ) {
	console.log( columnas[c] );
	sectores.addRow([c,columnas[c][0],columnas[c][1],columnas[c][2],columnas[c][3]]);
    }
	
    // Set chart options
    options = {'title':'Resultados elecciones rectorado - Sectores',
               'width':'95%',
               'fontSize' : 18,
               'height':500,
               'legend': {'position':'bottom'} };
    
    // Instantiate and draw our chart, passing in some options.
    var chart_sectores = new google.visualization.BarChart(document.getElementById('sectores'));
    chart_sectores.draw(sectores, options);
}

window.onresize = drawChart;
