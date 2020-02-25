import React, { Fragment } from "react";
import Cookies from 'universal-cookie';
import {
  IPricerProps,
  IPricerState,
  PricerStyle
} from "./types"
import TopBar from "../TopBar"
import Searchbar from "./Searchbar"
import { withStyles } from "@material-ui/core";
import Chart from "./Chart"
import "./optionPanel.css"
import ItemList from "./ItemList"
import { Item, ItemOption } from "../../utils/classes";

const cookies = new Cookies();

class Pricer extends React.Component<IPricerProps, IPricerState> {
  constructor(props: IPricerProps) {
    super(props)

    this.state = {
      serverSelected: cookies.get('server') ? cookies.get('server') : 2,
      itemList: [],
      oneMonthDataOnly: true,
      unitPriceDisplayed: false,
      sumPrice: false,
    }
  }

  onItemOptionChanged = (itemId: number, option: ItemOption) => {
      const {itemList} = this.state

      for (const itm of itemList) {
        if (itm.id === itemId) {
          itm.options = option
        }
      }
      this.setState({itemList})
  }

  onAllItemsRemoved = () => {
    const itemList: Item[] = []
    this.setState({itemList})
  }

  onGlobalOptionsChanged = (type: string, value: boolean) => {
    switch (type) {
      case "onemonthdataonly": {
        this.setState({oneMonthDataOnly: value})
        break
      }
      case "unitpricedisplayed": {
        this.setState({unitPriceDisplayed: value})
        break
      }
      case "sumprice": {
        this.setState({sumPrice: value})
        break
      }
    }
  }

  onNewItemSelected = async (item: Item) => {
    if (this.state.itemList.filter(itm => itm.id === item.id).length === 0) {
      const itemPrice = this.getRandomPrice(item.id)
      console.log(itemPrice)
      item.setPrice(itemPrice)
      this.setState({ itemList: [...this.state.itemList, item] })
    }
  }

  getRandomPrice = (itemId: number, size: number = 32) => {
      var price = []
      var date = new Date()

      for (let i = 0; i < size; i++) {
        price.push({
          item_identifier: itemId,
          date,
          unit: Math.floor(Math.random() * 10000),
          decade: 0,
          hundred: 0 
        })
        date = new Date(date.getTime() + (1000 * 60 * 60))
      }
      return price
  }

  onItemRemoved = (itemId: number) => {
    const { itemList } = this.state

    const itemListCleaned = itemList.filter(itm => itm.id !== itemId)
    this.setState({ itemList: itemListCleaned })
  }

  handleServerChange = (event: any) => {
    this.setState({ serverSelected: event.target.value })
    cookies.set('server', event.target.value.toString(), { path: '/', maxAge: 31536000 });
  }

  onCheckBoxChanged = (id: number, range: number) => {
    const {itemList} = this.state

      for (const itm of itemList) {
        if (itm.id === id) {
          itm.options.range =  {...itm.options.range, [range]: !itm.options.range[range]}
        }
      }
      this.setState({itemList})
  }

  render() {
    //const {classes} = this.props

    return (
      <Fragment>
        <div>
          <TopBar serverSelected={this.state.serverSelected} onChangeServer={this.handleServerChange} />
          <Searchbar
            onlyCraftableItems={false}
            onSearchBarSelectItem={this.onNewItemSelected}
          />
          <Chart
            serverId={this.state.serverSelected}
            itemList={this.state.itemList}
            oneMonthDataOnly={this.state.oneMonthDataOnly}
            unitPriceDisplayed={this.state.unitPriceDisplayed}
            sumPrice={this.state.sumPrice}
          />
          <ItemList
            itemList={this.state.itemList}
            onItemRemoved={this.onItemRemoved}
            onItemOptionChanged={this.onItemOptionChanged}
            onCheckBoxChanged={this.onCheckBoxChanged}
            onAllItemsRemoved={this.onAllItemsRemoved}
            oneMonthDataOnly={this.state.oneMonthDataOnly}
            unitPriceDisplayed={this.state.unitPriceDisplayed}
            sumPrice={this.state.sumPrice}
            onGlobalOptionsChanged={this.onGlobalOptionsChanged}
          />
        </div>
      </Fragment>
    )
  }

}

export default withStyles(PricerStyle)(Pricer)