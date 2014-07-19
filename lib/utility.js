function drawChart(elem, dataLabels, series, config){
  var dataSeries = _.map(Object.keys(series), function(key){
  	return {data: series[key], name: key};
  });
	elem.highcharts({
        chart: {type: 'column'},
        tooltip:{enabled:false},
        title: {
            text: config.title
        },
        xAxis: {
            categories: dataLabels,
            title:""
        },
        yAxis:{
            title:"",
            gridLineWidth:0
        },
        plotOptions: {
            column: {
                cursor: 'pointer',
                dataLabels: {
                    enabled: true
                },
                showInLegend:true
            }
        },
        series: dataSeries,
        credits:{enabled: false}
	});
};
