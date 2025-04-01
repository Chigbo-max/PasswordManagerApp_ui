import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './credentialChart.module.css';

const CredentialChart = ({ weak, strong }) => {
    const chartRef = useRef();
    const total = weak + strong;

    useEffect(() => {
        if (!chartRef.current || total === 0) return;

        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2;

        d3.select(chartRef.current).selectAll('*').remove();

        const svg = d3.select(chartRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal()
            .domain(['strong', 'weak'])
            .range(['#2ecc71', '#e74c3c']);

        const pie = d3.pie()
            .value(d => d.value)
            .sort(null);

        const data = [
            { label: 'Strong', value: strong },
            { label: 'Weak', value: weak }
        ];

        const arc = d3.arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius);

        const arcs = svg.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.label.toLowerCase()))
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .transition()
            .duration(1000)
            .attrTween('d', function(d) {
                const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function(t) {
                    return arc(interpolate(t));
                };
            });

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '-0.5rem')
            .style('font-size', '1.2rem')
            .style('font-weight', 'bold')
            .text(`${total}`);

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '1.2rem')
            .style('font-size', '0.8rem')
            .style('fill', '#7f8c8d')
            .text('Total');

        const legend = svg.append('g')
            .attr('transform', `translate(${-radius + 20}, ${radius + 20})`);

        const legendItems = legend.selectAll('.legend-item')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'legend-item')
            .attr('transform', (d, i) => `translate(0, ${i * 20})`);

        legendItems.append('rect')
            .attr('width', 12)
            .attr('height', 12)
            .attr('fill', d => color(d.label.toLowerCase()));

        legendItems.append('text')
            .attr('x', 20)
            .attr('y', 10)
            .style('font-size', '0.7rem')
            .text(d => `${d.label}: ${d.value} (${Math.round((d.value / total) * 100)}%)`);

    }, [weak, strong, total]);

    return (
        <div className={styles.chartContainer}>
            <svg ref={chartRef} />
            {total === 0 && (
                <div className={styles.emptyState}>
                    No password data available
                </div>
            )}
        </div>
    );
};

export default CredentialChart;