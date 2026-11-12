/**
 * CHARTS VIEW - STUDENTS IMPLEMENT
 * Show patterns in your data as charts, using Chart.js
 *
 * This view has two parts:
 *   showCharts(data) returns the HTML: one <canvas> per chart, with a text alternative under each
 *   drawCharts(data) runs after that HTML is on the page, and draws a chart into each <canvas>
 *
 * Chart.js docs: https://www.chartjs.org/docs/latest/getting-started/
 */

// This dataset writes missing values as "------" or "N/A". Show "Not listed" instead.
function orNotListed(value) {
  return value === '------' || value === 'N/A' || value === undefined ? 'Not listed' : value;
}

// Counts how many of the compliance checks an inspection failed
const countOutOfCompliance = (inspection) =>
  Object.values(inspection).filter((value) => value === 'Out of Compliance').length;

// How many inspections in a group failed at least one check
const failedInspections = (inspections) =>
  inspections.filter((inspection) => countOutOfCompliance(inspection) > 0).length;

// Top 5 types of businesses by inspections
const topTypes = (data) =>
  Object.entries(Object.groupBy(data, (inspection) => orNotListed(inspection.category)))
    .sort(([, a], [, b]) => b.length - a.length)
    .slice(0, 5)
    .map(([type, inspections]) => [type, failedInspections(inspections)]);

// Labels an inspection with the Monday its week starts on, e.g. "Dec 18"
const weekOf = (inspection) => {
  const date = new Date(inspection.inspection_date);
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Inspections per week as [week, inspections] pairs, oldest first.
// Leaves out the one 2026 inspection, which sits two years after the rest.
// ISO dates compare correctly as plain text, so "< '2025'" keeps 2023 and 2024.
const weeks = (data) =>
  Object.entries(
    Object.groupBy(
      data
        .filter((inspection) => inspection.inspection_date < '2025')
        .sort((a, b) => a.inspection_date.localeCompare(b.inspection_date)),
      weekOf,
    ),
  );

function showCharts(data) {
  // Text alternatives: charts are drawn as pictures, so screen readers can't read them.
  // Chart one: the busiest week
  const [busiestWeek, busiestInspections] = weeks(data).reduce((most, pair) => (pair[1].length > most[1].length ? pair : most));
  // Chart two: the type with the most failed inspections
  const [worstType, worstFailed] = topTypes(data).reduce((most, pair) => (pair[1] > most[1] ? pair : most));

  /*html*/
  return `
                <h2 class="view-title">📈 Charts View</h2>
                <p class="view-description">Patterns in the data at a glance</p>
                <div class="charts-grid">
                    <figure class="chart-figure">
                        <canvas id="chart-one"></canvas>
                        <figcaption class="chart-summary">The week of ${busiestWeek} was the busiest: ${busiestInspections.length} inspections, ${failedInspections(busiestInspections)} of them failed. Note: Chart omits one data record from 2026 that is the only inspection outside the presented time period.</figcaption>
                    </figure>
                    <figure class="chart-figure">
                        <canvas id="chart-two"></canvas>
                        <figcaption class="chart-summary">Of the 5 most-inspected types of business, ${worstType} had the most failed inspections: ${worstFailed}.</figcaption>
                    </figure>
                </div>
            `;
}

function drawCharts(data) {
  // Chart.js is loaded by a <script> tag in index.html. If it didn't load, say so instead of breaking.
  if (typeof Chart === 'undefined') {
    document.querySelector('.charts-grid').innerHTML =
      '<p class="error">Chart.js did not load, so the charts can\'t be drawn. Check the &lt;script&gt; tag in index.html.</p>';
    return;
  }

  // CHART ONE: inspections per week, as a mixed chart
  // Bars = failed inspections, line = all inspections. Lower "order" is drawn on top.
  const weekly = weeks(data);

  new Chart(document.querySelector('#chart-one'), {
    type: 'bar',
    data: {
      labels: weekly.map(([week]) => week),
      datasets: [
        { type: 'line', label: 'All inspections', data: weekly.map(([, inspections]) => inspections.length), order: 1 },
        { type: 'bar', label: 'Failed inspections', data: weekly.map(([, inspections]) => failedInspections(inspections)), order: 2 },
      ],
    },
    options: {
      plugins: { title: { display: true, text: 'Inspections per week, December 2023 – January 2024' } },
      scales: {
        x: { title: { display: true, text: 'Week' } },
        y: { title: { display: true, text: 'Inspections' }, beginAtZero: true },
      },
    },
  });

  // CHART TWO: failed inspections in the 5 most-inspected types, as a polar area chart
  const types = topTypes(data);

  new Chart(document.querySelector('#chart-two'), {
    type: 'polarArea',
    data: {
      labels: types.map(([type]) => type),
      datasets: [{ label: 'Failed inspections', data: types.map(([, failed]) => failed) }],
    },
    options: {
      plugins: { title: { display: true, text: 'Failed inspections in the 5 most-inspected types' } },
    },
  });
}

export { showCharts, drawCharts };
