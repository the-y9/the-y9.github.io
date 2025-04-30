fetch('data/utilities.json')
  .then(response => response.json()) // Parse the JSON from the file
  .then(utilities => {
    const container = document.getElementById("utilities");

    // Loop through each item in the utilities array and create the links
    utilities.forEach(item => {
      const link = document.createElement("a");
      link.className = "text-dark d-block mb-2"; // `d-block` makes each link appear on a new line
      link.href = item.url;
      link.target = "_blank";
      link.innerHTML = `<i class="${item.icon} me-3"></i>${item.name}`;
      container.appendChild(link);
    });
  })
  .catch(error => {
    console.error('Error fetching the JSON data:', error);
  });