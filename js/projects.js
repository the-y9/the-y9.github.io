
  fetch('./data/projects.json')
    .then(res => res.json())
    .then(projects => {
      const container = document.getElementById('projects-container');
      let row;

      projects.forEach((project, index) => {
        if (index % 3 === 0) {
          row = document.createElement('div');
          row.className = 'row mb-4';
          container.appendChild(row);

        }
        const tagsHTML = project.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('');
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
              <a href="${project.link}" target="_blank">

          <div class="card rounded-8 mb-4" >
            <div class="bg-image hover-overlay hover-zoom rounded-8" data-mdb-ripple-init data-mdb-ripple-color="light">
              <img src="${project.image}" class="img-fluid project-image"/>
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
    })
    .catch(err => console.error('Failed to load project data:', err));
