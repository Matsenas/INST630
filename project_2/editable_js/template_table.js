
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

function showTable(data) {
  const rowsHTML = data
    .map(
      /*html*/
      (inspection) => `
                    <tr>
                        <th scope="row">${inspection.name}</th>
                        <td>${orNotListed(inspection.category)}</td>
                        <td><time datetime="${inspection.inspection_date}">${formatDate(inspection.inspection_date)}</time></td>
                        <td>${orNotListed(inspection.inspection_results)}</td>
                        <td>${countOutOfCompliance(inspection)}</td>
                    </tr>
            `
    )
    .join("");

  /*html*/
  return `
                <h2 class="view-title">📊 Table View</h2>
                <p class="view-description">Browse inspections in a table view</p>
                <table class="restaurant-table">
                    <caption>${data.length} Prince George's County food inspections.</caption>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Inspected</th>
                            <th scope="col">Result</th>
                            <th scope="col">Out of compliance</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHTML}
                    </tbody>
                </table>
            `;
}

export default showTable;