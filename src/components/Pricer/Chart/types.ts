import { createStyles, Theme, WithStyles } from "@material-ui/core";
import { Item } from "../../../utils/classes";

export interface IChartProps
    extends WithStyles<typeof ChartStyle> {
    serverId: number
    itemList: Item[]
    oneMonthDataOnly?: boolean
    unitPriceDisplayed?: boolean
    sumPrice?: boolean
}

export interface IChartState {
    chart: any
    
}

export const ChartStyle = (theme: Theme) =>
    createStyles({

    })