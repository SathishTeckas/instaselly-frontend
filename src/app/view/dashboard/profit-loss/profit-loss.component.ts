import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import * as echarts from 'echarts';
import { convertNumber } from 'src/app/shared/helper/number.helper';
import { iProfitAnalysis } from 'src/app/shared/interface/dashboard/profit-loss.interface';
import { formatDateToMonthDay } from 'src/app/shared/helper/date.helper';

@Component({
  selector: 'profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.scss']
})
export class ProfitLossComponent {

  @Input() profitAnalysis: iProfitAnalysis[] = [];

  @ViewChild('echart') echart: ElementRef<NgxEchartsDirective> | undefined;

  public option: Partial<EChartsOption> = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Expense', 'Profit', 'Loss'],
      align: 'auto',
      left: -3
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: [],
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
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
      }
    ],
    series: [
      {
        name: 'Expense',
        type: 'bar',
        barGap: 0.2,
        barWidth: 15,
        itemStyle: {
          borderRadius: 2
        },
        emphasis: {
          focus: 'series'
        },
        data: [],
        color: '#0095B2',
        stack: 'ad'
      },
      {
        name: 'Profit',
        type: 'bar',
        barGap: 0.2,
        barWidth: 15,
        emphasis: {
          focus: 'series'
        },
         itemStyle: {
          borderRadius: 2
        },
        data: [],
        color: '#037AFA',
        stack: 'ad'
      },
      {
        name: 'Loss',
        type: 'bar',
        barGap: 0.2,
        barWidth: 15,
        emphasis: {
          focus: 'series'
        },
         itemStyle: {
          borderRadius: 2
        },
        data: [],
        color: '#FF8F07',
        stack: 'ad'
      }
    ],
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true
    }
  };
  
  

  public chartInstance: ECharts | undefined;
  public width: number = 0;

  public onChartInit(event: ECharts): void {
    this.chartInstance = event;
  }

  public ngOnChanges(changes: SimpleChanges): void { 
    if (changes && changes['profitAnalysis'] && changes['profitAnalysis'].currentValue && this.profitAnalysis && this.profitAnalysis.length > 0) {

      if (this.chartInstance) {
        this.updateChartData(this.profitAnalysis);
      } else {
        setTimeout(() => {
          this.updateChartData(this.profitAnalysis);
        }, 1000);
      }
    }
  }


  public updateChartData(report: iProfitAnalysis[]): void {
    this.chartInstance?.appendData({ seriesIndex: 0, data: report.map(data => data.expense) });
    this.chartInstance?.appendData({ seriesIndex: 1, data: report.map(data => data.profit) });
    this.chartInstance?.appendData({ seriesIndex: 2, data: report.map(data => data.loss) });
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
}
