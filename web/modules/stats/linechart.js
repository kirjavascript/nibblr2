import React, { useRef, useEffect } from 'react';

const d3 = Object.assign({},
    require('d3-selection'),
    require('d3-scale'),
    require('d3-axis'),
    require('d3-shape'),
    require('d3-transition'),
    require('d3-interpolate-path'),
);

export default function LineChart({
    items = [],
    accessor,
    ...config
}) {
    const node = useRef();
    const chart = useRef();

    useEffect(() => {
        if (!chart.current) {
            chart.current = new LineChartObj(node.current, config);
        }
        chart.current
            .data(items, accessor)
            .render(true);
    }, [items]);

    useEffect(() => () => chart.current.destroy(), []);

    return (
        <div ref={node} />
    );
}

class LineChartObj {
    config = {
        margin: {
            top: 5, right: 20, bottom: 40, left: 60,
        },
        height: 400,
        data: undefined,
        accessor: d => d.label,
        tickFormatX: undefined,
    };

    get dimensions() {
        const { top, right, bottom, left } = this.config.margin;
        return {
            width: this.outerWidth - left - right,
            height: this.config.height - top - bottom,
            top,
            right,
            bottom,
            left,
        };
    }

    container;
    svg;
    main;
    contents;
    xAxisG;
    yAxisG;
    outerWidth;

    constructor(node, config = {}) {
        this.container = d3.select(node);
        this.container.selectAll('*').remove();
        Object.assign(this.config, config);

        this.svg = this.container.append('svg');
        this.main = this.svg.append('g');
        this.contents = this.main.append('g');

        this.xAxisG = this.main
            .append('g')
            .attr('transform', `translate(0, ${this.dimensions.height})`)
            .attr('class', 'axis x');
        this.yAxisG = this.main
            .append('g')
            .attr('class', 'axis y');

        window.addEventListener('resize', this.resize);
    }

    // public

    destroy = () => {
        window.removeEventListener('resize', this.resize);
        this.container.selectAll('*').remove();
    };

    data = (data, accessor) => {
        this.config.data = data;
        this.config.accessor = accessor;
        return this;
    };

    resize = () => {
        this.render();
    };

    render = (update = false) => {
        this.outerWidth = this.container.node().getBoundingClientRect().width;
        const { width, height, top, right, bottom, left } = this.dimensions;

        const trans = selection => update ? selection.transition() : selection;

        // set margins / size
        this.svg
            .attr('width', width + left + right)
            .attr('height', height + top + bottom);
        this.main
            .attr('transform', `translate(${[left, top]})`);

        const domainMax = this.config.data.reduce((a, c) => Math.max(a, c.count), 0);

        const yScale = d3.scaleLinear()
            .domain([0, domainMax])
            .range([height, 0]);
        const xScale = d3.scalePoint()
            .domain(this.config.data.map(this.config.accessor))
            .rangeRound([0, width]);
        const xAxis = d3.axisBottom(xScale)
            .tickSize(10)
            .tickFormat(this.config.tickFormatX);
        trans(this.xAxisG)
            .attr('transform', `translate(0,${height})`)
            .call(xAxis)
            .selectAll('text')
            .attr('dy', '1em');
        const yAxis = d3.axisLeft(yScale)
            .tickSize(10)
            .ticks(12);
        trans(this.yAxisG)
            .call(yAxis);


        const line = d3.line()
            .x(d => xScale(this.config.accessor(d)))
            .y(d => yScale(d.count));

        const lineSelect = this.contents.selectAll('.line')
            .data([this.config.data]);

        const updateSelect = lineSelect
            .enter()
            .append('path')
            .attr('class', 'line')
            .merge(lineSelect);

        if (update) {
            updateSelect
                .transition()
                .attrTween('d', function (d) {
                    const previous = d3.select(this).attr('d');
                    return d3.interpolatePath(previous, line(d));
                })
        } else {
            updateSelect.attr('d', line);
        }

    };

};
