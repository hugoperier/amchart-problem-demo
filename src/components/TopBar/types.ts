import { createStyles, Theme, WithStyles } from "@material-ui/core";

export interface ITopBarProps     
    extends WithStyles<typeof TopBarStyle> {
        serverSelected: number
        onChangeServer: ((event: any) => void)
    }

export interface ITopBarState {
    serverSelected: number
    servers: Server[]
}

export class Server {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name
    }
}

export const TopBarStyle = (theme: Theme) => 
    createStyles({
          title: {
            flexGrow: 1,
          },
          toolbar: {
            minHeight: 100,
          },
          appbar: {
            backgroundColor: "rgba(35,35,35,0.95)"
          },
          logo: {
            display: "inline-block",
            backgroundImage: "url('https://file.dt-price.com/images/logo.svg')",
            height: "83px",
            width: "63px"
          },
          discordLogo: {
              width: "80px"
          }
    })















    /*
    navBar: {
            backgroundColor: "#323232",
            height: "100px",
            width: "100%",
            display: "flex",
            fontSize: "25px",
            color: "white"
        },
        navBarBackgroundLeft: {
            backgroundImage: "url('https://file.dt-price.com/images/topbar-left.jpg')",
            height: "100px",
            width: "110px"
        },
        navBarBackgroundMiddle: {
            backgroundImage: "url('https://file.dt-price.com/images/topbar-middle.jpg')",
            height: "100px",
            flexGrow: 1
        },
        navBarBackgroundRight: {
            backgroundImage: "url('https://file.dt-price.com/images/topbar-right.jpg')",
            height: "100px",
            width: "110px"
        },
        navBarContent: {
            position: "absolute",
            height: "100px"
        },
        navBarLogoContent: {
            fontSize: "6vw",
            height: "100px",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",                        
        },
        navBarLogo: {
            height: "70px",
            width: "80px",
            marginTop: "15px"
        },
        titleTopbar: {
            fontSize: "6vw",
            marginBlockStart: 0,
            marginBlockEnd: 0,
            fontWeight: 400,
            color: "white"
        },
        topBarButtonCrafter: {
            textDecoration: "none",
            position: "relative",
            marginLeft: "20%",
            backgroundColor: "rgb(174, 210, 42)",
            border: "3px solid #564f4c",
            alignItems: "center",
            borderRadius: "5px",
            display: "inline-block",
            padding: "10px",
            color: "#4D6100",
            marginTop: "25px",
            "&:hover": {
                borderColor: "#fc8222"
            }
        }*/