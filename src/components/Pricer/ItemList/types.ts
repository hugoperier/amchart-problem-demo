import { createStyles, Theme, WithStyles } from "@material-ui/core";
import { Item, ItemOption } from "../../../utils/classes";

export interface IItemListProps
    extends WithStyles<typeof ItemListStyle> {
        itemList: Item[]
        onItemRemoved: ((id: number) => void)
        onItemOptionChanged: ((id: number, option: ItemOption) => void)
        onCheckBoxChanged: ((id: number, range: number) => void)
        onGlobalOptionsChanged: ((type: string, value: boolean) => void)
        onAllItemsRemoved: (() => void)
        oneMonthDataOnly: boolean
        unitPriceDisplayed: boolean
        sumPrice: boolean
}

export interface IItemListState {
    itemInSetting?: Item | null
    modalOpened: boolean
    globalOptionModalOpened: boolean
}

export const ItemListStyle = (theme: Theme) =>
    createStyles({
        root: {
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: "#121210",
            border: "5px solid #564f4c",
            width: "90%",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
            marginBottom: "20px"
        },
        gridItemBar: {
            width: "90%"
        },
        gridTile: {
            height: "184px",
            width: "300px"
        },
        iconSize: {
            height: "30px",
            width: "30px"
        },
        generalSettings: {
            border: "2px solid #564f4c",
            marginLeft: "10px"
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        generalButtonBar: {
            display: "block"
        },
        title: {
            color: "white",
        },
        imgIcon: {
            top: "40%",
            width: "100px",
            height: "100px"
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          paper: {
            border: '2px solid #000',
            backgroundColor: "#121210",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            outline: 0
          },
    })