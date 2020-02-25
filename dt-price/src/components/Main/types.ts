import { createStyles, Theme, WithStyles } from "@material-ui/core";
import BackgroundImage from "../../resources/bg_menu2.png"

export interface IMainProps 
    extends WithStyles<typeof MainPageStyle> {

    }

export interface IMainState {
    serverSelected: number;
}

export const MainPageStyle = (theme: Theme) =>
    createStyles({
        backgroundMenu: {
            backgroundImage: `url(${BackgroundImage})`,
            backgroundPosition: "40% 50%",
            position: "absolute",
            height: "300px",
            width: "100%",
            backgroundSize: "cover",
            zIndex: 2
        },        
        particles: {
          zIndex: 1
        },
        topBar: {
            zIndex: 2
        },
    })