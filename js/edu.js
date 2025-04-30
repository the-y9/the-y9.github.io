fetch('./data/edu.json')
  .then(res => res.json())
  .then(educationList => {
    const container = document.getElementById('education-container');
    const row = document.createElement('div');
    row.className = 'row justify-content-center';

    educationList.forEach(edu => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="card rounded-8 mb-4">
          <div class="bg-image hover-overlay hover-zoom rounded-8" data-mdb-ripple-init data-mdb-ripple-color="light">
            <img src="${edu.image}" class="img-fluid education-img" />
            <a href="${edu.link}" target="_blank">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </a>
          </div>
          <div class="card-body">
            <h5 class="card-title">${edu.degree}</h5>
            <p class="card-text">${edu.institution}</p>
            <p class="card-text">${edu.duration}</p>
          </div>
        </div>
      `;
      row.appendChild(col);
    });

    container.appendChild(row);
  })
  .catch(err => console.error('Failed to load education data:', err));
