const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 231", name: "Frontend Development I", credits: 3, completed: false },
  { code: "CSE 110", name: "Intro to Programming", credits: 2, completed: true },
  { code: "CSE 210", name: "Programming with Classes", credits: 3, completed: false }
];

const courseCards = document.getElementById('courseCards');
const totalCredits = document.getElementById('totalCredits');

// Render course cards
function renderCourses(filtered) {
  if (!courseCards || !totalCredits) return;

  courseCards.innerHTML = '';

  filtered.forEach(course => {
    const card = document.createElement('div');
    card.className = course.completed ? 'completed' : 'incomplete';

    card.innerHTML = `
      <strong>${course.code}</strong>: ${course.name} 
      <span>(${course.credits} credits)</span>
    `;

    courseCards.appendChild(card);
  });

  const credits = filtered.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = credits;
}

// Filter logic
function setupFilters() {
  const allBtn = document.getElementById('allBtn');
  const wddBtn = document.getElementById('wddBtn');
  const cseBtn = document.getElementById('cseBtn');

  if (allBtn) {
    allBtn.addEventListener('click', () => renderCourses(courses));
  }

  if (wddBtn) {
    wddBtn.addEventListener('click', () =>
      renderCourses(courses.filter(c => c.code.startsWith('WDD')))
    );
  }

  if (cseBtn) {
    cseBtn.addEventListener('click', () =>
      renderCourses(courses.filter(c => c.code.startsWith('CSE')))
    );
  }
}

// Initialize
setupFilters();
renderCourses(courses);
