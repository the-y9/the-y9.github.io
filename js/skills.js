fetch('./data/skills.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('skills-tools-container');

    const categories = {
      language: 'Programming Languages',
      framework: 'Frameworks',
      tool: 'Tools and Software',
      database: 'Databases',
      concept: 'Concepts'
    };

    const grouped = {};
    data.forEach(skill => {
      const cat = categories[skill.category] || skill.category;
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(skill.name);
    });

    const section = document.createElement('div');
    section.className = 'skills-tools';

    for (const [title, skills] of Object.entries(grouped)) {
      const div = document.createElement('div');
      div.className = 'mb-3';

      const heading = document.createElement('h5');
      heading.className = 'mb-2';
      heading.innerHTML = `${title}: `;
      div.appendChild(heading);

      const badgesContainer = document.createElement('div');
      badgesContainer.className = 'mb-2 d-flex flex-wrap gap-2';

      skills.sort().forEach(skill => {
        const badge = document.createElement('span');
        badge.className = 'badge bg-primary';
        badge.textContent = skill;
        badgesContainer.appendChild(badge);
      });

      div.appendChild(badgesContainer);
      section.appendChild(div);
    }

    container.appendChild(section);
  })
  .catch(err => console.error('Failed to load skills/tools:', err));
