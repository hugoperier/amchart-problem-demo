import React from "react";
import {
    IItemListProps,
    IItemListState,
    ItemListStyle
} from "./types"
import { withStyles, Grid, Modal, Fade, Backdrop, Switch } from "@material-ui/core";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import SettingsIcon from '@material-ui/icons/Settings';
import "../optionPanel.css"

class ItemList extends React.PureComponent<IItemListProps, IItemListState> {

    constructor(props: IItemListProps) {
        super(props)

        this.state = {
            itemInSetting: null,
            modalOpened: false,
            globalOptionModalOpened: false
        }
    }

    removeItem = (id: number) => {
        this.props.onItemRemoved(id)
    }

    onItemOptionChanged = (id: number | undefined, type: string, value: boolean) => {
        //switch case type
        const item = this.props.itemList.filter(itm => itm.id === id)[0]
        switch (type) {
            case "mean": {
                item.options.mean = value
                break;
            }
            case "median": {
                item.options.median = value
                break;
            }
            case "min": {
                item.options.min = value
                break;
            }
            case "max": {
                item.options.max = value
                break;
            }
        }
        this.setState({ itemInSetting: item })
        if (id)
            this.props.onItemOptionChanged(id, item.options)
    }

    handleSwitchChangeMin = (event: any) => {
        this.onItemOptionChanged(this.state.itemInSetting?.id, "min", event.target.checked)
    }

    handleSwitchChangeMax = (event: any) => {
        this.onItemOptionChanged(this.state.itemInSetting?.id, "max", event.target.checked)
    }

    handleSwitchChangeMedian = (event: any) => {
        this.onItemOptionChanged(this.state.itemInSetting?.id, "median", event.target.checked)
    }

    handleSwitchChangeMean = (event: any) => {
        this.onItemOptionChanged(this.state.itemInSetting?.id, "mean", event.target.checked)
    }

    handleOneMonthDataOnly = (event:any) => {
        this.props.onGlobalOptionsChanged("onemonthdataonly", event.target.checked)
    }

    handleUnitPriceDisplayed = (event:any) => {
        this.props.onGlobalOptionsChanged("unitpricedisplayed", event.target.checked)
    }

    handleSumPrice = (event:any) => {
        this.props.onGlobalOptionsChanged("sumprice", event.target.checked)
    }

    onCheckBoxChange = (id: number, range: number) => {
        this.props.onCheckBoxChanged(id, range)
    }

    render() {
        const { classes, itemList } = this.props
        if (itemList.length === 0)
            return (<div></div>)

        return (
            <div className={classes.root}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item classes={{ item: classes.gridItemBar }}>
                        <GridList className={classes.gridList} cols={0}>
                            {itemList.map(item => (
                                <GridListTile key={item.id} classes={{ root: classes.gridTile, imgFullWidth: classes.imgIcon }}>
                                    <img
                                        style={{ marginRight: "14px" }}
                                        src={`https://file.dt-price.com/images/items/${item.id}.png`}
                                        alt={item.label}
                                    />
                                    <div className="main-content-right_range">
                                        <label className="main-content-right_range-item">
                                            1
                                   <input
                                                type="checkbox"
                                                checked={item.options.range[1]}
                                                disabled={(item.price?.unit?.length === 0)}
                                                onChange={() => this.onCheckBoxChange(item.id, 1)}
                                            />
                                            <span className="checkmark" />
                                        </label>
                                        <label className="main-content-right_range-item">
                                            10
                                  <input
                                                type="checkbox"
                                                disabled={(item.price?.decade?.length === 0)}
                                                checked={item.options.range[10]}
                                                onChange={() => this.onCheckBoxChange(item.id, 10)}
                                            />
                                            <span className="checkmark" />
                                        </label>
                                        <label className="main-content-right_range-item">
                                            100
                                    <input
                                                type="checkbox"
                                                disabled={(item.price?.hundred?.length === 0)}
                                                checked={item.options.range[100]}
                                                onChange={() => this.onCheckBoxChange(item.id, 100)}
                                            />
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                    <GridListTileBar
                                        title={item.label.slice(0, 20) + (item.label.length > 20 ? "..." : "")}
                                        classes={{
                                            title: classes.title,
                                        }}
                                        actionIcon={
                                            <div>
                                                <IconButton
                                                    aria-label={`setting ${item.label}`}
                                                    onClick={() => this.setState({ itemInSetting: item, modalOpened: true })}
                                                    title="Modifier les parametre d'affichage de l'élément"
                                                >
                                                    <SettingsIcon className={classes.title} />
                                                </IconButton>
                                                <IconButton
                                                    aria-label={`delete ${item.label}`}
                                                    onClick={() => this.removeItem(item.id)}
                                                    title="Supprimer cet élément"
                                                >
                                                    <CancelIcon className={classes.title} />
                                                </IconButton>
                                            </div>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </Grid>
                    <Grid item className={classes.generalSettings}>
                        <IconButton aria-label={`setting button general`} classes={{ root: classes.generalButtonBar }} title="Reglages généraux des courbes" onClick={() => this.setState({globalOptionModalOpened: true})}>
                            <SettingsIcon className={classes.title} classes={{ root: classes.iconSize }} />
                        </IconButton>
                        <IconButton aria-label={`deleteall`} classes={{ root: classes.generalButtonBar }} title="Supprimer tout les élements" onClick={this.props.onAllItemsRemoved} >
                            <CancelIcon className={classes.title} classes={{ root: classes.iconSize }} />
                        </IconButton>
                    </Grid>
                </Grid>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.modalOpened}
                    onClose={() => this.setState({ modalOpened: false })}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.modalOpened}>
                        <div className={classes.paper}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={10}
                            >
                                <Grid item>
                                    <h1>{this.state.itemInSetting?.label}</h1>
                                    <img
                                        width="100px"
                                        height="100px"
                                        style={{ marginRight: "14px" }}
                                        src={`https://file.dt-price.com/images/items/${this.state.itemInSetting?.id}.png`}
                                        alt={this.state.itemInSetting?.label}
                                    />
                                </Grid>
                                <Grid item>
                                    Médiane
                                    <Switch
                                        checked={!!this.state.itemInSetting?.options?.median}
                                        color="primary"
                                        onChange={this.handleSwitchChangeMedian}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                    Moyenne
                                    <Switch
                                        checked={!!this.state.itemInSetting?.options?.mean}
                                        onChange={this.handleSwitchChangeMean}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                    <br></br>
                                    Minimum
                                    <Switch
                                        checked={!!this.state.itemInSetting?.options?.min}
                                        color="primary"
                                        onChange={this.handleSwitchChangeMin}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                    Maximum
                                    <Switch
                                        checked={!!this.state.itemInSetting?.options?.max}
                                        onChange={this.handleSwitchChangeMax}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.globalOptionModalOpened}
                    onClose={() => this.setState({ globalOptionModalOpened: false })}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.globalOptionModalOpened}>
                        <div className={classes.paper}>
                            <h1>Options générales</h1>
                            Afficher les derniers prix
                                    <Switch
                                checked={!!this.props.oneMonthDataOnly}
                                onChange={this.handleOneMonthDataOnly}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            <br></br>
                            Addition de courbe
                                    <Switch
                                checked={!!this.props.sumPrice}
                                color="primary"
                                onChange={this.handleSumPrice}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            Afficher les prix à l'unité
                                    <Switch
                                checked={!!this.props.unitPriceDisplayed}
                                onChange={this.handleUnitPriceDisplayed}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </div>
                    </Fade>
                </Modal>
            </div>
        )
    }

}

export default withStyles(ItemListStyle)(ItemList)