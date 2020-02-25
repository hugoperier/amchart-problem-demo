import { createStyles, Theme, WithStyles } from "@material-ui/core";

export interface ICardProps 
    extends WithStyles<typeof CardStyle> {

    }

export interface ICardState {

}

export const CardStyle = (theme: Theme) => 
    createStyles({
        cardContainer: {
            position: "relative",
            top:"27%",
            zIndex: 2,
            scale: 0.8,
          },
          root: {
            outline: "8px solid grey",
            '&:hover': {
                 outline: "8px solid black",
                'transform': 'scale(1.01)',
                'transition': 'all .2s ease-in-out'
            }
          },
          media: {
            height: 140,
            paddingTop: "18.25%"
          },
          card: {
            width:"100%",
            paddingBottom: "75%"
          }
    })