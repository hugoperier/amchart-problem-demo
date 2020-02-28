export class Colors {
    private colors: any

    constructor() {
        this.colors = [
            { color: "#4286f4", available: true },
            { color: "#41f441", available: true },
            { color: "#e8f441", available: true },
            { color: "#ef0000", available: true },
            { color: "#b700ef", available: true },
            { color: "#1b00ef", available: true },
            { color: "#004701", available: true },
            { color: "#ff00b6", available: true }
        ]
    }

    public getColor() {
        for (var i = 0; i < this.colors.length; i++) {
            if (this.colors[i].available) {
                this.colors[i].available = false;
                return this.colors[i].color
            }
        }
    }

    public freeColor(colorId: string) {
        for (var i = 0; i < this.colors.length; i++) {
            if (this.colors[i].color === colorId) {
                this.colors[i].available = true;
            }
        }
    }
}