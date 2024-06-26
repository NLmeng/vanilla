window.onload = async () => {
  for (const pattern of patterns) {
    sectionsData.patterns[pattern] = await loadJSONData(pattern);
  }

  for (const ood of oods) {
    sectionsData.oods[ood] = await loadJSONData(ood);
  }

  populateTOC("patterns", sectionsData);
  loadSection("patterns", sectionsData);
  updatePaginationControls("patterns");
};

function populateTOC(sectionId, data) {
  const toc = document.getElementById("toc");

  // Remove existing TOC items before adding new ones
  let child = toc.lastElementChild;
  while (child && child.tagName !== "H3") {
    toc.removeChild(child);
    child = toc.lastElementChild;
  }

  Object.values(data[sectionId]).forEach((item, index) => {
    if (index > 3) {
      // Index starts from 4 for the first item
      const tocItem = document.createElement("a");
      tocItem.href = `#${sectionId}-${index}`;
      tocItem.innerText = item.title;
      tocItem.classList.add("toc-items");
      tocItem.classList.add("pl-2");
      tocItem.onclick = (e) => {
        e.preventDefault();

        // Calculate the page number based on the index
        const pageNumber = Math.ceil(
          (index - 3) / data[sectionId].itemsPerPage
        );

        // Change to the appropriate page
        changePage(sectionId, pageNumber);

        // Delay to ensure the section is loaded
        setTimeout(() => {
          document.getElementById(`${sectionId}-${index - 4}`).scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      };
      toc.appendChild(tocItem);
    }
  });
}

function loadSection(sectionId, data) {
  const section = document.getElementById(sectionId);
  section.innerHTML = "";

  const start =
    4 + (data[sectionId].currentPage - 1) * data[sectionId].itemsPerPage;
  const end = start + data[sectionId].itemsPerPage;
  // console.log(Object.values(data[sectionId]), start, end)
  const sectionData = Object.values(data[sectionId]).slice(start, end);
  Object.values(sectionData).forEach((item, index) => {
    loadCode(
      item.file,
      start + index - 4,
      sectionId,
      item.title,
      item.description,
      item.output,
      item.diagram
    );
  });
  data[sectionId].loaded = true;
}

async function loadCode(
  filename,
  index,
  sectionId,
  title,
  description,
  output,
  diagram
) {
  const response = await fetch(`./python/${filename}`);
  const text = await response.text();
  const container = document.createElement("div");
  container.id = `${sectionId}-${index}`;
  container.classList.add("container");
  container.innerHTML = `
          <div class="code-section">
              <h2> ${title} </h2>
              <p class="description">${description}</p>
              <pre class="break-spaces"><code class="language-python" id="code-${index}">${text}</code></pre>
          </div>
          <div class="output-section" id="patternOutputs-${index}">
              ${
                sectionId === "patterns"
                  ? `<div> Output: 
                      <pre class='white-text'>${output ? output : ""}</pre>
                         </div>`
                  : `<div class="mermaid center">
                          ${diagram ? diagram : ""}
                        </div>`
              }
          </div>
      `;
  document.getElementById(sectionId).appendChild(container);
  Prism.highlightAll();
  if (sectionId === "oods" && diagram) {
    mermaid.init(undefined, document.querySelectorAll(".mermaid"));
  }
}

function toggleSection(sectionId) {
  // Toggle the visibility of each section based on the selected one
  document.querySelectorAll(".section").forEach((section) => {
    if (section.id === sectionId) {
      section.classList.add("section-visible");
    } else {
      section.classList.remove("section-visible");
    }
  });

  loadSection(sectionId, sectionsData);
  populateTOC(sectionId, sectionsData);
  updatePaginationControls(sectionId);
}
