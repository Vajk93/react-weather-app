import "../../../node_modules/charts.css/dist/charts.css";
import "./ChartCustomCSS.css";

const Chart = () => {
  return (
    <div id="my-chart" className="container">
      <table className="charts-css column show-labels show-data-axes">
        <caption> 2016 Summer Olympics Medal Table </caption>

        <thead>
          <tr>
            <th scope="col"> Country </th>
            <th scope="col"> Gold </th>
            <th scope="col"> Silver </th>
            <th scope="col"> Bronze </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope="row"> USA </th>
            <td style={{ "--size": "1.0" }}> 46 </td>
            <td style={{ "--size": "1.0" }}> 37 </td>
            <td style={{ "--size": "0.2" }}> 38 </td>
          </tr>
          <tr>
            <th scope="row"> GBR </th>
            <td> 27 </td>
            <td> 23 </td>
            <td> 17 </td>
          </tr>
          <tr>
            <th scope="row"> CHN </th>
            <td> 26 </td>
            <td> 18 </td>
            <td> 26 </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Chart;
