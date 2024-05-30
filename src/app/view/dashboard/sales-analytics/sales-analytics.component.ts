import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import * as echarts from 'echarts';
import { convertNumber } from 'src/app/shared/helper/number.helper';
import { iDailySaleReport } from 'src/app/shared/interface/dashboard/daily-sale-report.interface';
import { formatDateToMonthDay } from 'src/app/shared/helper/date.helper';

@Component({
  selector: 'sales-analytics',
  templateUrl: './sales-analytics.component.html',
  styleUrls: ['./sales-analytics.component.scss']
})
export class SalesAnalyticsComponent implements OnChanges {

  @Input() saleReport: iDailySaleReport[] = [];

  @ViewChild('echart') echart: ElementRef<NgxEchartsDirective> | undefined;

  public option: Partial<EChartsOption> = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: 'rgb(255, 56, 92, 1)'
        }
      }
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLine: {
       show: false
      },
      axisTick: { show: false },
      axisPointer: {
        lineStyle: {
          opacity: 0.3
        }
      }
    },
    yAxis: {
      type: 'value',
      axisPointer: {
        lineStyle: {
          opacity: 0.3
        }
      },
      splitLine: {
        lineStyle: {
          opacity: 1,
          type: 'dashed'
        }
      },
      axisLabel: {
        formatter: (value: any) => {
          return convertNumber(value);
        }
      }
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          color: 'rgb(255, 56, 92, 1)'
        },
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 56, 92, 0.3)'
            },
            {
              offset: 1,
              color: 'rgb(255, 255, 255, 0)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        animationDelay: function (idx) {
          return idx * 10 + 100;
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx *100;
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true
    }
  };


  public chartInstance: ECharts | undefined;
  public width: number = 0;


  public ngOnChanges(changes: SimpleChanges): void { 
    if (changes && changes['saleReport'] && changes['saleReport'].currentValue && this.saleReport && this.saleReport.length > 0) {

      if (this.chartInstance) {
        this.updateChartData(this.saleReport);
      } else {
        setTimeout(() => {
          this.updateChartData(this.saleReport);
        }, 1000);
      }
    }
  }


  public updateChartData(report: iDailySaleReport[]): void {
    this.chartInstance?.appendData({ seriesIndex: 0, data: report.map(data => data.amount) });
    this.chartInstance?.setOption({
      xAxis: {
        type: 'category',
        data: report.map(data => formatDateToMonthDay(data.date)),
        axisLine: {
         show: false
        },
        axisTick: { show: false },
        axisPointer: {
          lineStyle: {
            opacity: 0.3
          }
        }
      }
    });
  }

  public onChartInit(event: ECharts): void {
    this.chartInstance = event;
  }

}
