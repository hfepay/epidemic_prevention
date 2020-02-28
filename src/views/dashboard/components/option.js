const red = '#D60000'
const green = '#4FB809'
export const getPieOption = (data = [
  { value: 80, name: '正常' },
  { value: 20, name: '异常' }
]) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 10,
      itemWidth: 20,
      itemHeight: 15,
      textStyle: {
        fontSize: 13,
        lineHeight: 20,
        color: 'white'
      },
      data: data.map(item => item.name)
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
            formatter: '{b}: {d}人',
            textStyle: {
              fontSize: 20,
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: data
      }
    ]
  }
}

export const getLineOption = (options) => {
  return {
    tooltip: {
      trigger: 'axis',
      formatter: '{c}'
    },
    xAxis: {
      type: 'category',
      data: ['02.01', '02.02', '02.03', '02.04', '02.05', '02.06', '02.07'],
      axisLine: {
        lineStyle: {
          color: '#057AC5'
        }
      },
      //  改变x轴字体颜色和大小
      axisLabel: {
        textStyle: {
          color: 'white',
          fontSize: 12
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#057AC5'
        }
      },
      //  改变x轴字体颜色和大小
      axisLabel: {
        textStyle: {
          color: 'white',
          fontSize: 12
        }
      }
    },
    grid: {
      top: 10
    },
    series: [
      {
        data: [172, 187, 213, 240, 220, 190, 300],
        type: 'line',
        symbolSize: 10,
        itemStyle: {
          normal: {
            color: 'white',
            borderWidth: 2,
            borderColor: options.color,
            lineStyle: {
              color: options.color
            }
          }
        }
      }]
  }
}
