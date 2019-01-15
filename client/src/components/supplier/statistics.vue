<template>
    <div id="main" ref="test"></div>
</template>

<script>
import echarts from "echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
// import "echarts/extension/bmap/bmap";
import Axios from "axios";
export default {
    data() {
        return {
            list: {
                yAxis: [],
                xAxis: []
            }
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.showChart();
        });
    },
    created() {},
    computed: {
        echartOption() {
            return {
                title: {
                    text: "销量统计图"
                },
                tooltip: {},
                xAxis: {
                    data: this.list.xAxis
                },
                yAxis: {
                    // data: [100,300,1000,2000]
                },
                visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [
                        {
                            gt: 0,
                            lte: 50,
                            color: "#096"
                        },
                        {
                            gt: 50,
                            lte: 100,
                            color: "#ffde33"
                        },
                        {
                            gt: 100,
                            lte: 150,
                            color: "#ff9933"
                        },
                        {
                            gt: 150,
                            lte: 200,
                            color: "#cc0033"
                        },
                        {
                            gt: 200,
                            lte: 300,
                            color: "#660099"
                        },
                        {
                            gt: 300,
                            lte: 600,
                            color: "#7e0023"
                        },
                        {
                            gt: 600,
                            color: "#5e2"
                        }
                    ],
                    outOfRange: {
                        color: "#999"
                    }
                },
                dataZoom: [
                    {
                        startValue: "2014-06-01"
                    },
                    {
                        type: "inside"
                    }
                ],
                series: [
                    {
                        name: "销量",
                        type: "line",
                        data: this.list.yAxis
                        // markLine: {
                        //     silent: true,
                        //     data: [
                        //         {
                        //             yAxis: 50
                        //         },
                        //         {
                        //             yAxis: 100
                        //         },
                        //         {
                        //             yAxis: 150
                        //         },
                        //         {
                        //             yAxis: 200
                        //         },
                        //         {
                        //             yAxis: 300
                        //         }
                        //     ]
                        // }
                    }
                ]
            };
        }
    },
    methods: {
        getMonthBetween(begin, end) {
            let result = [];
            let btime = new Date(Date.parse(this.strToDate(begin)));
            let etime = new Date(Date.parse(this.strToDate(end)));
            var curr = btime;

            while (curr <= etime) {
                var month = curr.getMonth();
                //month=month==0?12:month;
                var str =
                    month + 1 < 10
                        ? curr.getFullYear() + "0" + (Number(month) + 1)
                        : curr.getFullYear() + "" + (Number(month) + 1);
                var s = curr.getFullYear() + "-0";
                if (str == s) {
                    str = curr.getFullYear() + "-12";
                }
                result.push(str);
                // console.log(str);

                curr.setMonth(month + 1);
            }
            // console.log(result)
            return result;
        },
        strToDate(str) {
            return [str.slice(0, 4), str.slice(4, 6)];
        },
        showChart() {
            var myChart = echarts.init(this.$refs.test);

            let that = this;
            Axios({
                url: "/supplier/info",
                method: "get",
                params: {
                    id: JSON.parse(window.localStorage.getItem("session"))._id
                }
            }).then(({ data }) => {
                Axios({
                    url: "/supplierreport/AllorderBySupplier/" + data[0]._id,
                    method: "get"
                }).then(({ data }) => {
                    let arr1 = [];
                    // console.log(Object.keys(data[0])[0]);
                    // console.log(Object.keys(data[data.length - 1])[0]);
                    let allmonth = this.getMonthBetween(
                        Object.keys(data[0])[0],
                        Object.keys(data[data.length - 1])[0]
                    );
                    console.log(data);
                    for (let j in allmonth) {
                        let hasdata = false;
                        for (let i in data) {
                            if (Object.keys(data[i])[0] == allmonth[j]) {
                                // console.log(data[i][allmonth[j]]);
                                console.log(j, i);

                                arr1.push(data[i][allmonth[j]]);
                                // continue
                                hasdata = true;
                                break;
                            }
                        }
                        if (!hasdata) {
                            arr1.push(0);
                        }
                    }
                    // console.log(arr1)
                    // console.log(that)
                    that.list.xAxis = [].concat(allmonth);
                    that.list.yAxis = [].concat(arr1);
                    console.log(that.list.yAxis);
                    myChart.setOption(this.echartOption, true);
                });
            });
            console.log(this.list);
        }
    }
};
</script>

<style>
#main {
    width: 100%;
    height: 400px;
    background-color: #e2e2e2;
}
</style>
