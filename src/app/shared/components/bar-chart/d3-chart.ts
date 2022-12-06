import 'd3-transition';

import { Selection } from 'd3';
import { max, min } from 'd3-array';
import { axisLeft } from 'd3-axis';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { curveNatural, line } from 'd3-shape';

import { BarChartDataItem, BarChartModel } from './bar-chart.model';

const margin = { left: 40, top: 10, right: 10, bottom: 40 };

/**
 * Function that generates an SVG chart based on data.
 * Call the chart function to get an initialized and update function.
 * Call the initialize function to set up the chart 
 * and call update to (re-)supply it with data.
 * @param {string} rootElementId Id of the charts parent element 
 * @param width
 * @param height
 */
export function BarChart(parentElementId: string, width: number, height: number) {
  let svg: Selection<SVGSVGElement, unknown, HTMLElement, any>;
  let xAxis: Selection<SVGGElement, unknown, HTMLElement, any>;
  let yAxis: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  let content: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  let container: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  const initialize = function () {
    // substract the margins before using the height and width
    const contentHeight = height - margin.top - margin.bottom;

    svg = select(`#${parentElementId}`)
      .append('svg')
      .attr('class', 'chart')
      .attr('width', width)
      .attr('height', height);

    // define a container g element that holds the chart parts
    // and transforms them all at once based on margin values
    container = svg.append('g')
      .attr('class', 'container')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // define xAxis g container element,
    // append it to the svg,
    // and put at the bottom of the svg with transform
    xAxis = container.append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(0, ${contentHeight})`);

    // define yAxis g container element,
    // append it to the svg
    yAxis = container.append('g')
      .attr('class', 'yAxis');

    // define a g element that holds the content / bars / lines,
    // append it to the svg
    content = container.append('g')
      .attr('class', 'content');

       //legend
    const legend = content.append('g').attr('transform', `translate(0, ${contentHeight + 16})`);
    const legendTemperature = legend.append('g').attr('transform', `translate(0, 4)`);
    const legendHumidity = legend.append('g').attr('transform', `translate(124)`);

    legendTemperature.append('line')
      .attr('x1', 0)
      .attr('x2', 16)
      .attr('y1', 8)
      .attr('y2', 8)
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-opacity', '1')
      .attr('stroke-width', '0.5rem')
      .attr('stroke-linecap', 'round')
      .attr('id', 'legend-temperature');

    legendTemperature.append('text')
      .attr('y', 8)
      .attr('x', 24)
      .text('Temperature')
      .attr('opacity', 0.5)
      .attr('fill', '#fff')
      .attr('font-size', '1rem')
      .attr('font-weight', '700')
      .attr('dominant-baseline', 'middle');

    legendHumidity.append('line')
      .attr('x1', 8)
      .attr('x2', 8)
      .attr('y1', 0)
      .attr('y2', 16)
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-opacity', '0.5')
      .attr('stroke-width', '0.5rem')
      .attr('stroke-linecap', 'round')
      .attr('id', 'legend-humidity');

    legendHumidity.append('text')
      .attr('y', 12)
      .attr('x', 16)
      .text('Humidity')
      .attr('opacity', 0.5)
      .attr('fill', '#fff')
      .attr('font-size', '1rem')
      .attr('font-weight', '700')
      .attr('dominant-baseline', 'middle');
  }

  const update = function (data: BarChartModel, width: number, height: number) {
    const { humidity, temperature } = data;
    // substract the margins before using the height and width
    const contentHeight = height - margin.top - margin.bottom;
    const contentWidth = width - margin.left - margin.right;

    // update svg dimensions
    svg.attr('height', height).attr('width', width);
    xAxis.attr('transform', `translate(0, ${contentHeight})`)

    // isolate the values that we use to calculate and draw the chart
    const dataValues = humidity.concat(temperature).map((d) => d.value);

    // (re)define the x scale band,
    // set the domain (in this case we create a tick for each item in the array),
    // and set the range, from left to right
    const xScale = scaleBand()
      .padding(0.2)
      .range([0, contentWidth])
      .domain(humidity.map((d) => d.label));

    // (re)define the y scale linear,
    // set the domain from data min (at least 0) to data max,
    // and set the range, from bottom to top
    let minDomain = min(dataValues) as number;
    minDomain = minDomain < 0 ? minDomain : 0;
    const yScale = scaleLinear()
      .domain([minDomain, max(dataValues) as number])
      .nice()
      .range([contentHeight, 0]);

    // select all (non-)existing rect elements
    // and bind our (new) data to the selection
    const rectSelection = content?.selectAll('rect').data(humidity);


    // set the x, y, height, width and fill of each rect
    // and transition them to their correct height and y position
    // The first time this is done, no bars are present in the DOM so they will all be appended
    rectSelection
      .join((enter) =>
        // define any missing rect elements (data.length) with enter and append them to the DOM
        enter.append('rect')
          .attr('height', 0)
          // .attr('rx', '0.75rem') // safari houd niet van rem
          .attr('rx', 12)
          .attr('fill', '#fff')
          .attr('opacity', '0.3')
          .attr('y', (_d) => yScale(0))
          .attr('width', xScale.bandwidth())
          .attr('x', (d) => xScale(d.label) as number)
      )
      .transition()
      .delay(100)
      .duration(300)
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('x', (d) => xScale(d.label) as number)
      .attr('height', (d) => contentHeight - yScale(d.value));

    const temperatureLineGenerator = line<BarChartDataItem>()
      .curve(curveNatural)
      .y((d) => yScale(d.value))
      .x((d) => xScale(d.label) as number + xScale.bandwidth() / 2);

    const temperaturePath =
      content
        .selectAll('path')
        .data([temperature]);


    temperaturePath
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-opacity', '1')
      .attr('stroke-width', '0.5rem')
      .attr('id', 'temperature-line')
      .attr('stroke-linecap', 'round')
      .transition()
      .delay(100)
      .duration(300)
      .attr('d', temperatureLineGenerator);

    const yDomainStart = yScale.domain()[0];
    const yDomainEnd = yScale.domain()[1];
    const yRange = yScale.range()[0] - yScale.range()[1];
    const yAxisGenerator = axisLeft(yScale)
      .tickValues([yDomainStart, yScale.invert(yRange / 2), yDomainEnd])
      .tickFormat((tick) => `${tick}°`);

    yAxis
      ?.transition()
      .duration(300)
      .call(yAxisGenerator);
    // style the y-axis
    yAxis?.select('.domain').remove();
    yAxis?.selectAll('.tick line').remove();
    yAxis?.selectAll('.tick text')
      .attr('opacity', 0.5)
      .attr('fill', '#fff')
      .attr('font-size', '1rem')
      .attr('font-weight', '700');
  }

  return {
    initialize,
    update
  } as BarChartInstance;
}

export interface BarChartInstance {
  initialize: () => void;
  update: (data: BarChartModel, width: number, height: number) => void;
}
