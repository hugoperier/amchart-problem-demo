import React, { Fragment } from "react";
import {
    ISearchBarProps,
    ISearchBarState,
    SearchBarStyle    
} from "./types"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { withStyles } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Item } from "../../../utils/classes";
import items from "../../../utils/items.json"

class SearchBar extends React.PureComponent<ISearchBarProps, ISearchBarState> {
    constructor(props: ISearchBarProps) {
        super(props)

        this.state = {
            itemList: [],
        }
    }

    async componentDidMount() {
        const response = items
        const itemList = response.map((item: any) => new Item(item.identifier, item.name, item.imgUrl))

        // Sorting items from smaller to bigger to improve the search
        itemList.sort(function (a: Item, b: Item) {
            return a.label.length - b.label.length
        })
        this.setState({ itemList })
    }

    onSearchBarSelectItem = (event: any, value: any) => {
        if (event.type === "click" || event.type === "keydown") {
            this.props.onSearchBarSelectItem(value)
        }
    }

    render() {
        const { classes } = this.props
        const { itemList } = this.state

        const loading = (itemList.length === 0)
        const filterOptions = createFilterOptions({
            limit: 40,
        })

        return (
            <div className={classes.searchBarContainer}>
                <Autocomplete
                    className={classes.searchBar}
                    classes={{
                        option: classes.option,
                        paper: classes.paper,
                    }}
                    options={itemList}
                    filterOptions={filterOptions}
                    getOptionLabel={(option: any) => ""}
                    onChange={this.onSearchBarSelectItem}
                    debug
                    renderOption={(option: any) => (
                        <Fragment>
                            {option.imgUrl && (
                                <img
                                    width="40px"
                                    height="40px"
                                    style={{ marginRight: "14px" }}
                                    src={`https://file.dt-price.com/images/items/${option.id}.png`}
                                    alt={option.label}
                                />
                            )}
                            {option.label}
                        </Fragment>
                    )}
                    renderInput={params => (
                        <TextField
                            key={params.id}
                            {...params}
                            className={classes.input}
                            variant="outlined"
                            label="Rechercher un objet"
                            fullWidth
                            InputLabelProps={{ style: { color: "white" } }}
                            InputProps={
                                {
                                    ...params.InputProps,
                                    type: 'search',
                                    className: classes.color,
                                    endAdornment: (
                                        <Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        </Fragment>
                                    )
                                }}
                        />
                    )}
                />
            </div>
        )
    }
}

export default withStyles(SearchBarStyle)(SearchBar)