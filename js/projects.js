fetch('./data/projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById('projects-container');
    const tagFilters = document.getElementById('tag-filters');

    // Pagination settings
    const projectsPerPage = 6;
    let currentPage = 1;
    let currentFilter = 'All';

    // Create pagination controls container
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'text-center mt-4';
    container.after(paginationContainer);

    // Collect unique tags and count occurrences
    const tagCounts = {};
    projects.forEach(p => {
      p.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    // Sort tags by frequency (descending) and pick top n
    const n = 7; // Number of top tags to show
    const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(entry => entry[0]);
    // Create a filter button
    const createFilterButton = (tag) => {
      const button = document.createElement('button');
      button.className = 'btn btn-outline-primary m-1';
      button.innerText = tag;
      button.setAttribute('data-tag', tag);
      button.addEventListener('click', () => {
        document.querySelectorAll('#tag-filters button').forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
        currentPage = 1; // Reset to first page
        renderProjects(tag);
      });
      return button;
    };

    // Add "All" button first
    const showAllBtn = createFilterButton('All');
    showAllBtn.classList.add('active'); // Set initially active
    tagFilters.appendChild(showAllBtn);

    // Add only top n tag buttons
    topTags.forEach(tag => {
      tagFilters.appendChild(createFilterButton(tag));
    });

    // Pagination helper
    function paginate(items, page, perPage) {
      const start = (page - 1) * perPage;
      return items.slice(start, start + perPage);
    }

    // Create pagination buttons
    function createPagination(totalItems) {
      paginationContainer.innerHTML = '';
      const totalPages = Math.ceil(totalItems / projectsPerPage);

      if (totalPages <= 1) return; // No pagination if only 1 page

      // Previous button
      const prevBtn = document.createElement('button');
      prevBtn.className = 'btn btn-outline-secondary mx-1';
      prevBtn.innerText = 'Previous';
      prevBtn.disabled = currentPage === 1;
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderProjects(currentFilter);
        }
      });
      paginationContainer.appendChild(prevBtn);

      // Page number buttons
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = `btn btn-outline-secondary mx-1 ${i === currentPage ? 'active' : ''}`;
        btn.innerText = i;
        btn.addEventListener('click', () => {
          currentPage = i;
          renderProjects(currentFilter);
        });
        paginationContainer.appendChild(btn);
      }

      // Next button
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn btn-outline-secondary mx-1';
      nextBtn.innerText = 'Next';
      nextBtn.disabled = currentPage === totalPages;
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderProjects(currentFilter);
        }
      });
      paginationContainer.appendChild(nextBtn);
    }

    // Render projects
    function renderProjects(filterTag = 'All') {
      currentFilter = filterTag;

      // Start fade-out
      container.classList.remove('show');
      container.classList.add('fade');

      setTimeout(() => {
      container.innerHTML = '';
      let row;

      const filtered = projects.filter(project => filterTag === 'All' || project.tags.includes(filterTag));
      const paginated = paginate(filtered, currentPage, projectsPerPage);

      paginated.forEach((project, index) => {
        if (index % 3 === 0) {
          row = document.createElement('div');
          row.className = 'row mb-4';
          container.appendChild(row);
        }

        const tagsHTML = project.tags
        .slice(0, 5) // limit to 5 tags shown in the UI
        .map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`)
        .join('');

        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
          <a href="${project.link}" target="_blank">
            <div class="card rounded-8 mb-4">
              <div class="bg-image hover-overlay hover-zoom rounded-8" data-mdb-ripple-init data-mdb-ripple-color="light">
                <img src="${project.image}" alt="${project.title}" class="img-fluid project-image"/>
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
              </div>
              <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text">${project.description}</p>
                <div class="tags">${tagsHTML}</div>
              </div>
            </div>
          </a>
        `;
        row.appendChild(col);
      });

      createPagination(filtered.length);
      
      // Start fade-in
      container.classList.remove('fade');
      container.classList.add('show');
    }, 300); // Match transition duration
    }

    // Initial render
    renderProjects();
  })
  .catch(err => console.error('Failed to load project data:', err));
