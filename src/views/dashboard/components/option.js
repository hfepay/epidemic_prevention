const red = '#D60000'
const green = '#4FB809'
export const getOption = (value = 50, count) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 10,
      itemWidth: 30,
      itemHeight: 20,
      textStyle: {
        fontSize: 15,
        lineHeight: 30,
        color: 'white'
      },
      data: ['正常率', '异常率']
    },
    color: [green, red],
    series: [
      {
        name: '体温测量',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            formatter: '{b}: {d}%',
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 80, name: '正常率' },
          { value: 20, name: '异常率' }
        ]
      }
    ]
  }
}
