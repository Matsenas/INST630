
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */

// Turns "2026-05-17T00:00:00.000" into "May 17, 2026"
const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

// This dataset writes missing values as "------" or "N/A". Show "Not listed" instead.
const orNotListed = (value) =>
  value === '------' || value === 'N/A' || value === undefined ? 'Not listed' : value;

// Counts how many of the compliance checks an inspection failed
const countOutOfCompliance = (inspection) =>
  Object.values(inspection).filter((value) => value === 'Out of Compliance').length;

// Define data rows
const rowsHTML = (rows) => rows.map((inspection) => `
                <tr>
                    <th scope="row">${inspection.name}</th>
                    <td>${orNotListed(inspection.category)}</td>
                    <td><time datetime="${inspection.inspection_date}">${formatDate(inspection.inspection_date)}</time></td>
                    <td>${orNotListed(inspection.inspection_results)}</td>
                    <td>${countOutOfCompliance(inspection)}</td>
                </tr>
        `).join("");

// Set up sorting values
const sortValues = {
  name: (inspection) => inspection.name,
  category: (inspection) => orNotListed(inspection.category),
  date: (inspection) => new Date(inspection.inspection_date),
  result: (inspection) => orNotListed(inspection.inspection_results),
  failed: countOutOfCompliance,
};

let tableData = [];
let sortKey = null;
let ascending = true;

// I used Claude to help write this. I largely understand how it works.
document.addEventListener('click', (event) => {
  const button = event.target.closest('.restaurant-table th button');
  if (!button) return;

  const { key } = button.dataset;
  ascending = key === sortKey ? !ascending : true;
  sortKey = key;

  const getValue = sortValues[key];
  const sorted = [...tableData].sort((a, b) => {
    const [x, y] = [getValue(a), getValue(b)];
    const order = x < y ? -1 : x > y ? 1 : 0;
    return ascending ? order : -order;
  });

  document.querySelector('.restaurant-table tbody').innerHTML = rowsHTML(sorted);

  document.querySelectorAll('.restaurant-table th').forEach((th) => th.removeAttribute('aria-sort'));
  button.closest('th').setAttribute('aria-sort', ascending ? 'ascending' : 'descending');
});

function showTable(data) {
    tableData = data;
    sortKey = null;
    
    return `
                <h2 class="view-title">📊 Table View</h2>
                <p class="view-description">Browse inspections in a table view</p>
                <div class="table-scroll" tabindex="0" role="region" aria-label="Food inspections table, horizontally scrollable">
                <table class="restaurant-table">
                    <caption>${data.length} Prince George's County food inspections.</caption>
                    <thead>
                        <tr>
                            <th scope="col">Name <button data-key="name">Sort</button></th>
                            <th scope="col">Type <button data-key="category">Sort</button></th>
                            <th scope="col">Inspected <button data-key="date">Sort</button></th>
                            <th scope="col">Result <button data-key="result">Sort</button></th>
                            <th scope="col">Out of compliance <button data-key="failed">Sort</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHTML(data)}
                    </tbody>
                </table>
                </div>
            `;
}

export default showTable;