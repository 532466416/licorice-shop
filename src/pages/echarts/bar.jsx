import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactECharts from 'echarts-for-react'

export default class Bar extends Component {
    state = {
        sales: [120, 200, 150, 80, 70, 110],
        stores: [98, 65, 120, 150, 20, 88]
    }
    getOption = (sales, stores) => {
        return {
            title: {
                text: ''
            },
            tooltip: {},
            legend: {
                data: ['销量', '库存']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sales
            }, {
                name: '库存',
                type: 'bar',
                data: stores
            }]
        };
    }
    updateOption = () => {
        this.setState(
             state => ({
                sales:state.sales.map(item => item +1),
                stores:state.stores.reduce((pre,item)=>{
                    pre.push(item - 1)
                    return pre
                },[])
            })
        )
           
    }
    render() {
        const { sales, stores } = this.state
        return (
            <>
                <Card>
                    <Button type="primary" onClick={this.updateOption}>更新</Button>
                </Card>
                <Card title="柱状图">
                    <ReactECharts option={this.getOption(sales, stores)} />
                </Card>
            </>
        )
    }
}
