/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories
 */

// Turns "2026-05-17T00:00:00.000" into "May 17, 2026"
function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// This dataset writes missing values as "------" or "N/A". Show "Not listed" instead.
function orNotListed(value) {
  return value === '------' || value === 'N/A' || value === undefined ? 'Not listed' : value;
}

// Counts how many of the compliance checks an inspection failed
const countOutOfCompliance = (inspection) =>
  Object.values(inspection).filter((value) => value === 'Out of Compliance').length;

const failedInspections = (inspections) =>
  inspections.filter((inspection) => countOutOfCompliance(inspection) > 0).length;

// One row per inspection: name on the left, failed checks on the right
const itemsHTML = (inspections) => inspections.map((inspection) => `
                        <li class="category-item">
                            <span>${inspection.name}</span>
                            <span><time datetime="${inspection.inspection_date}">${formatDate(inspection.inspection_date)}</time></span>
                            <span>${countOutOfCompliance(inspection)} failed</span>
                        </li>
        `).join("");

function showCategories(data) {
  // Requirements:
  // - Group data by one meaningful field (category, city, inspection result, etc.)
  // - Show how many records are in each group, plus one other number per group
  //   (an average, a highest, a lowest)
  // - Show items within each group
  // - Make the groups easy to compare, and visually distinct from their items
  const typeOf = (inspection) => orNotListed(inspection.category);

  const groups = Object.groupBy(data, typeOf);

  // Largest groups first, so the most common types are easiest to compare
  const types = Object.entries(groups).sort(([, a], [, b]) => b.length - a.length);

  const sectionsHTML = types.map(([type, inspections]) => `
                <section class="category-section">
                    <div class="category-header">
                      <h3>
                          ${type}
                      </h3>
                      <span>
                        ${inspections.length} inspections, ${failedInspections(inspections)} failed compliance
                      </span>
                    </div>
                    <ul class="category-items">
                        ${itemsHTML(inspections)}
                    </ul>
                </section>
        `).join("");

  /*html*/
  return `
                <h2 class="view-title">📂 Category View</h2>
                <p class="view-description">Compare inspections by type of business</p>
                ${sectionsHTML}
            `;
}

export default showCategories;