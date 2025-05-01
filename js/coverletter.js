async function handleCoverLetter(type) {
    const modal = new bootstrap.Modal(document.getElementById('coverLetterModal'));
    document.getElementById('jobDescriptionInput').style.display = type === 'biased' ? 'block' : 'none';
    document.getElementById('coverLetterContent').innerText = '';

    // Wait for user input if biased
    modal.show();

    if (type === 'unbiased') {
        const letter = await generateCoverLetter({ jobDesc: null });
        document.getElementById('coverLetterContent').innerText = letter;
    } else {
        document.getElementById('jobDescriptionInput').oninput = async (e) => {
            const jobDesc = e.target.value;
            const letter = await generateCoverLetter({ jobDesc });
            document.getElementById('coverLetterContent').innerText = letter;
        };
    }
}

async function generateCoverLetter({ jobDesc }) {
    const [skills, exp, edu] = await Promise.all([
        fetch('./data/skills.json').then(r => r.json()),
        fetch('./data/exp.json').then(r => r.json()),
        fetch('./data/edu.json').then(r => r.json())
    ]);

    const name = "Yash Mishra";

    const intro = `Dear Hiring Team,

I am writing to express my interest in your ${jobDesc ? "posted opportunity" : "organization"}. My name is ${name}, and I specialize in backend development with a passion for AI/ML applications.`;

    const experience = exp.slice(0, 2).map(e => `- ${e.role} at ${e.company}, where I ${e.description || 'contributed significantly'}.`).join('\n');

    const skillSummary = `My technical stack includes ${skills.languages.join(', ')}, with strong experience in ${skills.tools.join(', ')}.`;

    const close = `I would welcome the opportunity to discuss how I can contribute to your team. Thank you for your consideration.

Sincerely,
${name}`;

    return [intro, experience, skillSummary, close].join('\n\n');
}

function downloadCoverLetter() {
    const text = document.getElementById('coverLetterContent').innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cover_letter.txt';
    link.click();
}
