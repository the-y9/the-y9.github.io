fetch('./data/skills.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('skills-tools-container');

    const categories = {
      language: 'Programming /Scripting',
      framework: 'Frameworks',
      tool: 'Tools and Software',
      database: 'Databases',
      concept: 'Concepts'
    };

    // Define color mapping for skill levels
    const levelColors = {
      "elementary": "bg-info",  // Light blue
      "intermediate": "bg-warning",  // Yellow
      "advanced": "bg-danger"  // Red
    };

    const grouped = {};
    data.forEach(skill => {
      const cat = categories[skill.category] || skill.category;
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(skill);
    });

    const section = document.createElement('div');
    section.className = 'skills-tools';

    for (const [title, skills] of Object.entries(grouped)) {
      const div = document.createElement('div');
      div.className = 'mb-3';

      const heading = document.createElement('h5');
      heading.className = 'mb-2';
      heading.innerHTML = `${title} `;
      div.appendChild(heading);

      const badgesContainer = document.createElement('div');
      badgesContainer.className = 'mb-2 d-flex flex-wrap gap-2';

      // Sort the skills alphabetically and render badges based on skill level
      skills.sort((a, b) => a.name.localeCompare(b.name)).forEach(skill => {
        const badge = document.createElement('span');
        // Set badge class based on the skill level
        badge.className = `badge ${levelColors[skill.level] || 'bg-secondary'}`;  // Default to 'bg-secondary' if no level is specified
        badge.textContent = skill.name;
        badgesContainer.appendChild(badge);
      });

      div.appendChild(badgesContainer);
      section.appendChild(div);
    }

    container.appendChild(section);
  })
  .catch(err => console.error('Failed to load skills/tools:', err));
