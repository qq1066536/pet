<template>
    <div>
        <el-radio-group v-model="type" @change="showChart">
            <el-radio-button label="销售额统计" border></el-radio-button>
            <el-radio-button label="销售额占比统计" border></el-radio-button>
            <el-radio-button label="各个城市门店分布图" border></el-radio-button>
        </el-radio-group>
        <div class="total" id="myChart" ref="myChart"></div>
    </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/extension/bmap/bmap";
import axios from "axios";
export default {
  data() {
    return {
      type: "销售额统计"
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showChart();
    });
  },
  methods: {
    showChart() {
      let myChart = echarts.init(this.$refs.myChart);
      if (this.type == "销售额统计") {
        // axios({
        //   url: "/classes/classesTotal",
        //   method: "get"
        // }).then(res => {
        //   this.classAxisData = res.data.axisData;
        //   this.classSeriesData = res.data.seriesData;
        //   myChart.setOption(this.classesOptions, true);
        // });
      } else if (this.type == "销售额占比统计") {
        // axios({
        //   url: "/students/ageTotal",
        //   method: "get"
        // }).then(res => {
        //   this.ageAxisData = res.data.axisData;
        //   this.ageSeriesData = res.data.seriesData;
        //   myChart.setOption(this.ageOpitons, true);
        //   console.log(this.ageAxisData, this.ageSeriesData);
        // });
      } else {
        axios({
          url: "/platform/counts",
          method: "get"
        }).then(res => {
          this.shopsCountData = res.data;
          myChart.setOption(this.mapOptions, true);
        });
        myChart.on("finished", () => {
          // 从echarts对象中获取bmap对象
          var bmap = myChart
            .getModel()
            .getComponent("bmap")
            .getBMap();

          // 设置最小缩放值
          bmap.setMinZoom(5);
          // 设置最大缩放值
          // bmap.setMaxZoom(15);
          // 缩放结束后的事件
          bmap.addEventListener("zoomend", e => {
            let zoom = this.zoom;
            this.zoom = bmap.getZoom();
            // 打印出当前缩放值
            if (zoom < bmap.getZoom() && bmap.getZoom() == 10) {
              axios({
                url: "/platform/city",
                method: "get"
              }).then(res => {
                this.shopsData = res.data;
                let options = this.mapOptions;
                options.bmap.zoom = 10;
                myChart.setOption(this.mapOptions, false);
              });
            } else if (zoom > bmap.getZoom() && bmap.getZoom() <= 10) {
              this.shopsData = [];
              let options = this.mapOptions;
              myChart.setOption(this.mapOptions, false);
            }
          });
        });
      }
    }
  },
  computed: {
    mapOptions() {
      return {
        title: {
          text: "全国门店统计",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item"
        },
        bmap: {
          center: [104.072259, 30.663403],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#044161"
                }
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry",
                stylers: {
                  color: "#064f85"
                }
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#005b96",
                  lightness: 1
                }
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#00508b"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  color: "#056197",
                  visibility: "off"
                }
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  visibility: "on"
                }
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  visibility: "on"
                }
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "on"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry.fill",
                stylers: {
                  color: "#029fd4"
                }
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#1a5787"
                }
              },
              {
                featureType: "city",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "district",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "town",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              }
            ]
          }
        },
        series: [
          {
            name: "门店数",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.shopsCountData,
            symbolSize: function(val) {
              return val[2] * 2;
            },
            itemStyle: {
              normal: {
                color: "#ddb926"
              }
            },
            tooltip: {
              formatter: function(params, ticket, callback) {
                return (
                  "城市：" + params.data[3] + "<br>门店数：" + params.data[2]
                );
              }
            }
          },
          {
            name: "门店位置",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.shopsData,
            symbol: "pin",
            symbolSize: 20,
            itemStyle: {
              normal: {
                color: "red"
              }
            },
            tooltip: {
              formatter: function(params, ticket, callback) {
                return (
                  "店铺名称：" + params.data[2] + "<br>地址：" + params.data[3]
                );
              }
            }
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.total {
  width: 100%;
  height: 500px;
}
</style>
