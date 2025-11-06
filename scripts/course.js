const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 231", name: "Frontend Development I", credits: 3, completed: false },
  { code: "CSE 110", name: "Intro to Programming", credits: 2, completed: true },
  { code: "CSE 210", name: "Programming with Classes", credits: 4, completed: false }
];

const courseCards = document.getElementById('courseCards');
const totalCredits = document.getElementById('totalCredits');

function renderCourses(filtered) {
  // Clear old cards
  courseCards.innerHTML = '';

  // Render each course card
  filtered.forEach(course => {
    const card = document.createElement('div');
    card.textContent = `${course.code}: ${course.name} (${course.credits} credits)`;
    card.className = course.completed ? 'completed' : 'incomplete';
    courseCards.appendChild(card);
  });

  // Use reduce to calculate credits dynamically
  const credits = filtered.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = credits;
}

// Event listeners for filter buttons
document.getElementById('allBtn')
  .addEventListener('click', () => renderCourses(courses));

document.getElementById('wddBtn')
  .addEventListener('click', () => renderCourses(courses.filter(c => c.code.startsWith('WDD'))));

document.getElementById('cseBtn')
  .addEventListener('click', () => renderCourses(courses.filter(c => c.code.startsWith('CSE'))));

// Initial render
renderCourses(courses);

