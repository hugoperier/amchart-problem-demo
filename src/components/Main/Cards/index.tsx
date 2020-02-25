import React from "react";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import PriceImage from "../../../resources/pricer.png"
import CrafterImage from "../../../resources/crafter.png"
import MapImage from "../../../resources/map.png"
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router';

import {
    ICardProps,
    ICardState,
    CardStyle
} from "./types"
import { withStyles } from "@material-ui/core";

class Cards extends React.Component<ICardProps, ICardState> {
    
    LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((props, ref) => (
        <RouterLink ref={ref} to="/visualizer" {...props} />
    ));
    
    render() {
        const { classes } = this.props
        
        return (
            <Grid
                container
                spacing={10}
                direction="row"
                alignItems="center"
                justify="center"
                className={classes.cardContainer}
            >
                <Grid item xs className={classes.card}>
                    <Card className={classes.root}>
                        <Router>
                            <CardActionArea
                                component={this.LinkBehavior}
                                color="inherit"
                                onClick={() => this.LinkBehavior}
                            >
                                <CardHeader
                                    title="Visualiseur de prix"
                                    subheader="Analyser l'HDV et l'évolution des prix"
                                    titleTypographyProps={{ variant: 'h3' }}
                                    subheaderTypographyProps={{ variant: 'h6' }}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={PriceImage}
                                    title="Visualiseur de prix"
                                />
                                <CardContent>
                                    <Typography variant="subtitle1" color="textSecondary" component="p">
                                        Avec le visualiseur de prix vous pouvez observer les évolutions des prix du jeu d'une facilité déconcertantes.<br></br>
                                        Prévoyez vos achats, analysez les évolutions des prix et a vous les kamas
                             </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Router>
                    </Card>
                </Grid>
                <Grid item xs className={classes.card}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardHeader
                                title="Crafter"
                                subheader="Un item est il rentable ou non a fabriquer ?"
                                titleTypographyProps={{ variant: 'h3' }}
                                subheaderTypographyProps={{ variant: 'h6' }}
                            />
                            <CardMedia
                                image={CrafterImage}
                                className={classes.media}
                                title="Crafter"
                            />
                            <CardContent>
                                <Typography variant="subtitle1" color="textSecondary" component="p">
                                    Avec le crafter, rien de plus facile de savoir si un item est plus rentable a la fabrication ou en hotel des vents.<br />
                                    Observez le detail du prix de chacune des ressources et faites le bon choix.
                             </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs className={classes.card}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardHeader
                                title="La carte intéractive"
                                subheader="A venir"
                                titleTypographyProps={{ variant: 'h3' }}
                                subheaderTypographyProps={{ variant: 'h6' }}
                            />
                            <CardMedia
                                className={classes.media}
                                image={MapImage}
                                title="La carte intéracticve"
                            />
                            <CardContent>
                                <Typography variant="subtitle1" color="textSecondary" component="p">
                                    A venir prochainement ! N'hésitez pas a rejoindre le discord pour suivre les avancés du site ! <br></br> Le bouton se trouve en haut a gauche
                             </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(CardStyle)(Cards)