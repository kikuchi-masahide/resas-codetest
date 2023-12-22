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
    }>,
): GraphOptionsType => {
    const series = yAxisSeries.map((series) => {
        return {
            name: series.name,
            color: series.color,
            dashStyle: series.dashStyle ?? "Solid",
            data: series.data.map<[number, number]>((data) => [data.x, data.y]),
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
