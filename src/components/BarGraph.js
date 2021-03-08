import React from "react";
import * as d3 from "d3";

export default function BarGraph({ array }) {
    const ref = React.useRef();

    React.useEffect(() => {
        var w = ref.current.getBoundingClientRect().width;
        var h = ref.current.getBoundingClientRect().height;
        var barwidth = w / array.length;
        var offset = 1;

        const svg = d3.select(ref.current);
        var selection = svg.selectAll("rect").remove().exit().data(array);

        var yScale = d3
            .scaleLinear()
            .domain([0, d3.max(array)])
            .range([0, h - 10]);

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * barwidth + offset)
            .attr("y", (d, i) => h - d)
            .attr("height", (d, i) => yScale(d))
            .attr("width", (d, i) => barwidth - offset)
            .attr("fill", "green");
    }, [array]);

    return (
        <div className="bargraph">
            <svg
                ref={ref}
                width="95%"
                height="90vh"
                style={{ border: "2px solid black" }}
            />
        </div>
    );
}
