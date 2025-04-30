fetch('./data/exp.json')
  .then(res => res.json())
  .then(experienceList => {
    const container = document.getElementById('experience-container');
    const row = document.createElement('div');
    row.className = 'row justify-content-center';

    experienceList.forEach((exp, index) => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      const tagsHTML = exp.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('');


      const modalId = `descModal${index}`;

      col.innerHTML = `
        <div class="card rounded-8 mb-4">
          <div class="bg-image hover-overlay hover-zoom rounded-8" data-mdb-ripple-init data-mdb-ripple-color="light">
            <img src="${exp.image}" class="img-fluid experience-img" alt="${exp.company}" />
            <a href="${exp.link}" target="_blank">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </a>
          </div>
          <div class="card-body">
            <h5 class="card-title">${exp.role}</h5>

              <div class="tags card-text">${tagsHTML}
              <a href="#" data-bs-toggle="modal" data-bs-target="#${modalId}">Read more</a>
              </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="${modalId}Label">${exp.role} at ${exp.company}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <img src="${exp.image}" alt="${exp.company}" class="img-fluid rounded mb-4" />
              <br>
            <p><strong><i>${exp.department}</i></strong><p>
            
            <p align="justify">
                ${exp.description}
            </p>
                <br>
            <p class="card-text text-muted">${exp.duration} <br> ${exp.location}</p>

              </div>
            </div>
          </div>
        </div>
      `;

      row.appendChild(col);
    });

    container.appendChild(row);
  });
  