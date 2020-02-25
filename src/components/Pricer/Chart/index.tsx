import React, { Fragment } from "react";
import {
  IChartProps,
  IChartState,
  ChartStyle
} from "./types"
import { withStyles } from "@material-ui/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_fr_FR from "@amcharts/amcharts4/lang/fr_FR";
import { Item } from "../../../utils/classes";

am4core.useTheme(am4themes_animated);

const dayIntervall = 30

class Chart extends React.Component<IChartProps, IChartState> {

  constructor(props: IChartProps) {
    super(props)

    this.state = {
      chart: undefined
    }
  }

  componentWillUnmount() {
    if (this.state.chart) {
      this.state.chart.dispose();
    }
  }

  componentDidUpdate(prevProps: IChartProps) {
    if (prevProps.itemList !== this.props.itemList) {
      this.onUpdateOnItems(prevProps.itemList)
    }
  }

  onUpdateOnItems(prevItems: Item[]) {
    if (prevItems.length > this.props.itemList.length) {
      const itemToRemove = prevItems.filter(d => !this.props.itemList.includes(d))[0];
      this.removeItem(itemToRemove)
    }
    else if (prevItems.length < this.props.itemList.length){
      const newItem = this.props.itemList.filter(d => !prevItems.includes(d))[0];
      if (!this.state.chart)
        this.initChart(newItem)      
      else
        this.addItem(newItem)
    }
    else {
      console.log("on item option changed")
    }
  }

  removeItem = (item:Item) => {
    for (const serie of this.state.chart.series) {
      if (serie && (item.id.toString() === serie.id)) {
        this.state.chart.series.removeIndex(this.state.chart.series.indexOf(serie)).dispose()
        console.log("I just have removed the serie with id " + item.id + " the number of series of the chart is now ", this.state.chart.series.length)
      }
    }
    if (this.state.chart.series.length === 0) {
      this.state.chart.dispose();
      this.setState({chart: undefined}) // If I only dispose the chart I cannot create it again, thats why I set it do undefined after disposing it
    }
  }

  addItem = (item: Item) => {
    if (item.options.range[1]) // for now only this one is used
      this.addItemSpline(item, "unite")
    else if (item.options.range[10])
      this.addItemSpline(item, "dizaine")
    else if (item.options.range[100])
      this.addItemSpline(item, "centaine")
  }

  addItemSpline = (item: Item, type: string) => {
    const serie = this.state.chart.series.push(new am4charts.LineSeries())
    serie.id = item.id.toString()
    serie.dataFields.dateX = "date";
    serie.dataFields.valueY = "value";

    if (type === "unite" && item.price) { // it goes through here
      serie.data = item.price.unit;
      serie.bullets.push(new am4charts.CircleBullet());
    } else if (type === "dizaine" && item.price) { // not used for the moment
      serie.data = item.price.decade;
      const bullet = serie.bullets.push(new am4charts.Bullet());
      const square = bullet.createChild(am4core.Rectangle);
      square.width = 10;
      square.height = 10;
      square.horizontalCenter = "middle";
      square.verticalCenter = "middle";
    } else if (type === "centaine" && item.price) { // not used for the moment
      serie.data = item.price.hundred;
      const bullet = serie.bullets.push(new am4charts.Bullet());
      const arrow = bullet.createChild(am4core.Triangle);
      arrow.horizontalCenter = "middle";
      arrow.verticalCenter = "middle";
      arrow.stroke = am4core.color("#fff");
      arrow.direction = "top";
      arrow.width = 10;
      arrow.height = 10;
      bullet.createChild(am4core.Triangle);
    }
    if (this.props.oneMonthDataOnly) { // it goes through here
      serie.data = serie.data.filter((data: any) => {
        return (+new Date() - data.date) / (1000 * 3600 * 24) <= dayIntervall;
      });
    }

    serie.tooltip.getFillFromObject = false;
    serie.tooltipText = item.label + " (" + type + ") : {valueY.value}";

    serie.minBulletDistance = 15;
    this.state.chart.scrollbarX.series.push(serie);
    console.log("I just have created a series with id: " + serie.id + " the number of series of the chart is now ", this.state.chart.series.length)
  }

  initChart = (itemToAdd: Item) => {
    const chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;
    chart.language.locale = am4lang_fr_FR;
    chart.fill = am4core.color("#fff");
    chart.stroke = am4core.color("#fff");

    /* Create date, values axis and cursor */
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.tooltipDateFormat = "dd/MM HH:mm";
    dateAxis.baseInterval = {
      timeUnit: "minute",
      count: 30
    };
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    dateAxis.renderer.labels.template.fill = am4core.color("#fff");
    valueAxis.renderer.labels.template.fill = am4core.color("#fff");
    if (valueAxis.tooltip)
      valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    chart.cursor = new am4charts.XYCursor();

    const scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX = scrollbarX;
    this.setState({ chart }, () => this.addItem(itemToAdd))
  }

  render() {
    return (
      <Fragment>
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      </Fragment>
    );
  }
}

export default withStyles(ChartStyle)(Chart)