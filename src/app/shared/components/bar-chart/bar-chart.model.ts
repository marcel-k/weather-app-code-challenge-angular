export class BarChartDataItem {
    constructor(public label: string, public value: number) {

    }
}

export class BarChartModel {
    constructor(public humidity: BarChartDataItem[] = [], public temperature: BarChartDataItem[] = []) {

    }
}

