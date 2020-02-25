import { createStyles, Theme, WithStyles } from "@material-ui/core";
import { Item } from "../../../utils/classes";

export interface ISearchBarProps
    extends WithStyles<typeof SearchBarStyle> {
    onlyCraftableItems: boolean
    onSearchBarSelectItem: ((event: any) => void)
}

export interface ISearchBarState {
    itemList: Item[]
}

export const SearchBarStyle = (theme: Theme) =>
    createStyles({
        searchBarContainer: {
            width: "90%",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
            marginBottom: "20px"
        },
        searchBar: {
            borderColor: "#483626",
            backgroundColor: "#564f4c",
            backgroundImage: "url('https://file.dt-price.com/images/searchIcon.svg')",
            backgroundSize: "30px 100%",
            backgroundPosition: "0px 0px",
            backgroundRepeat: "no-repeat",
            color: "white",
            height: "30px",
            paddingLeft: "30px",
            popper: {
                backgroundColor: "blue"
            }

        },
        input: {
            height: "30px",
            position: "relative",
            bottom: "13px",
            "& fieldset": {
                bottom: "13px",
                top: "8px",
                "&:focused": {
                    borderColor: "green"
                }
            }
        },
        option: {
            color: "white",
            background: "#353431",
            "&:nth-child(odd)": {
                background: "#2b2c27"
            },
            backgroundImage: ""
        },
        paper: {
            background: "#2b2c27"
        },
        color: {
            color: "white"
        }
    })