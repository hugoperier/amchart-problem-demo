import { createStyles, Theme, WithStyles } from "@material-ui/core";
import { Item } from "../../utils/classes";
import { Colors } from "../../utils/Colors";

export interface IPricerProps
    extends WithStyles<typeof PricerStyle> {
        serverSelected: number
    }

export interface IPricerState {
    serverSelected: number
    itemList: Item[]
    oneMonthDataOnly: boolean
    unitPriceDisplayed: boolean
    sumPrice: boolean
    colorPicker: Colors
}

export const PricerStyle = (theme: Theme) =>
    createStyles({
       optionContainer: {
           margin:"auto",
           width:"50%"
       }
    })