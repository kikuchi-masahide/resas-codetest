export interface PropsType {
    title: string;
    xAxisTitle: string;
    xAxisCategories: number[];
    yAxisTitle: string;
    yAxisSeries: Array<{
        name: string;
        color: string;
        // 線の種類(Solid:実線/Dash:点線)
        dashStyle?: "Solid" | "Dash";
        data: Array<{
            x: number;
            y: number;
        }>;
        // グラフ下部に凡例を表示するかどうか
        showInLegend: boolean;
    }>;
}

export interface GraphOptionsType {
    chart: {
        type: "line";
    };
    title: {
        text: string;
    };
    xAxis: {
        title: {
            text: string;
        };
        categories: number[];
    };
    yAxis: {
        title: {
            text: string;
        };
    };
    plotOptions: {
        line: {
            marker: {
                symbol: "circle";
            };
        };
    };
    responsive: {
        rules: Array<{
            chartOptions: {
                line: {
                    dataLabels: {
                        enabled: boolean;
                    };
                    enableMouseTracking: boolean;
                };
            };
            condition: {
                maxWidth?: number;
                minWidth: number;
            };
        }>;
    };
    series: Array<{
        name: string;
        color: string;
        dashStyle: "Solid" | "Dash";
        data: Array<[number, number]>; // [x, y]
        showInLegend: boolean;
    }>;
}

// highchartsのオプションを生成する
export const getGraphOptions = (
    title: string,
    xAxisTitle: string,
    xAxisCategories: number[],
    yAxisTitle: string,
    yAxisSeries: Array<{
        name: string;
        dashStyle?: "Solid" | "Dash";
        color: string;
        data: Array<{
            x: number;
            y: number;
        }>;
        showInLegend: boolean;
    }>,
): GraphOptionsType => {
    const series = yAxisSeries.map((series) => {
        return {
            name: series.name,
            color: series.color,
            dashStyle: series.dashStyle ?? "Solid",
            data: series.data.map<[number, number]>((data) => [data.x, data.y]),
            showInLegend: series.showInLegend,
        };
    });
    return {
        chart: {
            type: "line",
        },
        title: {
            text: title,
        },
        xAxis: {
            title: {
                text: xAxisTitle,
            },
            categories: xAxisCategories,
        },
        yAxis: {
            title: {
                text: yAxisTitle,
            },
        },
        plotOptions: {
            line: {
                marker: {
                    symbol: "circle",
                },
            },
        },
        responsive: {
            rules: [
                {
                    chartOptions: {
                        line: {
                            dataLabels: {
                                enabled: false,
                            },
                            enableMouseTracking: false,
                        },
                    },
                    condition: {
                        maxWidth: 640,
                        minWidth: 0,
                    },
                },
                {
                    chartOptions: {
                        line: {
                            dataLabels: {
                                enabled: true,
                            },
                            enableMouseTracking: true,
                        },
                    },
                    condition: {
                        minWidth: 641,
                    },
                },
            ],
        },
        series,
    };
};
