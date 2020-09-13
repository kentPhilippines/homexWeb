module.exports = {
  drawPie: function (id, totalData, showData) {
    var echarts = require('echarts');
    var myChart = null;
    myChart = echarts.init(document.getElementById(id));
    let tempData = totalData - showData
    var option = {
      tooltip: {
        show: false  
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          startAngle: 0,
          color: ['red', 'white'],
          data: [
            {value: showData},
            {value: tempData},
          ],
          label: {
            show: false
          }
        }
      ]
    }
    myChart.clear()
    myChart.setOption(option);
    window.addEventListener('resize',()=>{ myChart.resize() })
  }
}

