// highchartsのオプションを生成する
export const getGraphOptions = (
    title: string,
    xAxisTitle: string,
    xAxisCategories: string[],
    yAxisTitle: string,
    yAxisSeries: Array<{
        name: string;
        data: Array<{
            x: string;
            y: number;
            dashStyle?: "Solid" | "Dash";
        }>;
    }>,
): {
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
        categories: string[];
    };
    yAxis: {
        title: {
            text: string;
        };
    };
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true;
            };
            enableMouseTracking: false;
        };
    };
    series: Array<{
        name: string;
        data: Array<{
            y: number;
            dashStyle: "Solid" | "Dash";
        } | null>;
    }>;
} => {
    // yAxisSeriesをxAxisCategoriesに合わせて整形する
    // 配列長をxAxisCategoriesに合わせ、値が抜けている場合はnullとする。
    const xAxisCategoriesMap = new Map<string, number>();
    for (const [index, category] of xAxisCategories.entries()) {
        xAxisCategoriesMap.set(category, index);
    }
    const series = yAxisSeries.map((series) => {
        const datas = new Array<{
            y: number;
            dashStyle: "Solid" | "Dash";
        } | null>();
        datas.fill(null, 0, xAxisCategories.length);
        for (const data of series.data) {
            const index = xAxisCategoriesMap.get(data.x);
            if (index === undefined) {
                throw new Error("Invalid x-axis category");
            }
            datas[index] = {
                y: data.y,
                dashStyle: data.dashStyle ?? "Solid",
            };
        }
        return {
            name: series.name,
            data: datas,
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
                dataLabels: {
                    enabled: true,
                },
                enableMouseTracking: false,
            },
        },
        series,
    };
};
