import React, { Fragment } from "react";
import Cookies from 'universal-cookie';
import TopBar from "../TopBar"
import { withStyles } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Particles from 'react-particles-js';
import { IMainProps, IMainState, MainPageStyle } from "./types"
import BackgroundImage from "../../resources/kama.png"
import Cards from "./Cards"


import './particles.css';

const cookies = new Cookies();

class Main extends React.Component<IMainProps, IMainState> {
    constructor(props: IMainProps) {
        super(props)

        this.state = {
            serverSelected: 2
        }

        const serverSelected = cookies.get('server')
        if (serverSelected)
            this.state = {
                serverSelected
            }
    }

    handleServerChange = (event: any) => {
        this.setState({serverSelected:event.target.value})
        cookies.set('server', event.target.value.toString(), { path: '/', maxAge: 31536000 });
    }


    render() {
        const { classes } = this.props

        console.log("Le serveur séléctionné est " + this.state.serverSelected)
        return (
            <Fragment>
                <div>
                    <Paper className={classes.backgroundMenu} />
                    <div className={classes.topBar}>
                        <TopBar serverSelected={this.state.serverSelected} onChangeServer={this.handleServerChange}/>
                    </div>
                    <Cards />
                    <div className={classes.particles}>
                        <Particles
                            className="particle-canvas"
                            params={{
                                "particles": {
                                    "number": {
                                        "value": 20,
                                        "density": {
                                            "enable": true,
                                            "value_area": 800
                                        }
                                    },
                                    "line_linked": {
                                        "enable": false
                                    },
                                    "move": {
                                        "direction": "top",
                                        "speed": 10,
                                        "out_mode": "out"
                                    },
                                    "shape": {
                                        "type": [
                                            "images"
                                        ],
                                        "images": [
                                            {
                                                "src": BackgroundImage,
                                                "height": 10,
                                                "width": 10
                                            },
                                        ]
                                    },
                                    "color": {
                                        "value": "#CCC"
                                    },
                                    "size": {
                                        "value": 20,
                                        "random": false,
                                        "anim": {
                                            "enable": true,
                                            "speed": 20,
                                            "size_min": 10,
                                            "sync": false
                                        }
                                    }
                                },
                                "retina_detect": false
                            }} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withStyles(MainPageStyle)(Main);