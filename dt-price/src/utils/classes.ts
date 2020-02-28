export class Item {
    public id: number;
    public label: string;
    public imgUrl: string;
    public price?: Price
    public color: string
    public options: ItemOption

    constructor(id: number, label: string, imgUrl: string, color: string = "#fff") {
        this.id = id;
        this.label = label;
        this.imgUrl = imgUrl;
        this.price = new Price()
        this.options = new ItemOption()
        this.color = color
    }

    setColor = (color: string) => {
        this.color = color
    }

    setPrice = (price: any) => {
        this.price = {
            unit: [],
            decade: [],
            hundred: []
        }

        if (this.price && this.price.unit && this.price.decade && this.price.hundred) {
            for (const row of price) {
                if (row.unit > 0) {
                    this.price.unit.push({
                        date: new Date(row.date),
                        value: row.unit
                    })
                }
                if (row.decade > 0) {
                    this.price.decade.push({
                        date: new Date(row.date),
                        value: row.decade
                    })
                }
                if (row.hundred > 0) {
                    this.price.hundred.push({
                        date: new Date(row.date),
                        value: row.hundred
                    })
                }
            }
        }
        else {
            console.error("Error: price is not declared (classes.ts:32)")
        }
    }
}

export class Price {
    public unit?: Object[];
    public decade?: Object[];
    public hundred?: Object[];

    constructor() {
        this.unit = []
        this.decade = []
        this.hundred = []
    }
}

export class ItemOption {
    public mean: boolean;
    public median: boolean;
    public min: boolean;
    public max: boolean;
    public range: any;

    constructor() {
        this.mean = false;
        this.median = false;
        this.min = false;
        this.max = false;
        this.range = {
            1: true,
            10: false,
            100: false
        }
    }
}