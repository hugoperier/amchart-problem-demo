import React from "react";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import "./topbar.css";

import {
    ITopBarProps,
    ITopBarState,
    Server,
    TopBarStyle
} from "./types";

class TopBar extends React.Component<ITopBarProps, ITopBarState> {
    constructor(props: ITopBarProps) {
        super(props);
        this.state = {
            servers: [
                new Server(1, "Oshimo"),
                new Server(2, "Terra Cogita"),
                new Server(3, "Herdegrize")
            ],
            serverSelected: props.serverSelected
        }
    }

    handleSelectServer = (event: any) => {
        this.props.onChangeServer(event)
        this.setState({ serverSelected: event.target.value })
    }

    render() {
        //const { servers, serverSelected } = this.state;
        const { classes } = this.props;
        const serverList = this.state.servers.map(item => {
            return (
                <option value={item.id.toString()} key={item.id}>
                    {item.name}
                </option>
            )
        })

        return (
            <AppBar position="static" className={classes.appbar}>
                <Toolbar className={classes.toolbar}>                    
                    <div className={classes.discordLogo }>
                        <a
                            href="https://discord.gg/NvruPar"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Viens dire bonjour 😄"
                        >
                            <img
                                src="https://file.dt-price.com/images/Discord-Logo-White.svg"
                                alt="discord"
                            />
                        </a>
                    </div>
                    <Grid container spacing={5} direction="row" alignItems="center" justify="center">
                        <Grid item>
                            <Link to="/" title="Retourner a l'acceuil" className={classes.logo} />
                        </Grid>
                        <Grid>
                            <Typography variant="h3" className={classes.title}>
                                Dt-Price
                        </Typography>
                        </Grid>

                    </Grid>
                    <div className="wrap">
                        <div className="select">
                            <select
                                className="select-text"
                                value={this.state.serverSelected.toString()}
                                onChange={this.handleSelectServer}
                                required
                            >
                                {serverList}
                            </select>
                            <span className="select-highlight" />
                            <span className="select-bar" />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        )

    }
}

export default withStyles(TopBarStyle)(TopBar)