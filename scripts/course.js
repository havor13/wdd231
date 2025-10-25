const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 231", name: "Frontend Development I", credits: 3, completed: false },
  { code: "CSE 110", name: "Intro to Programming", credits: 2, completed: true },
  { code: "CSE 210", name: "Programming with Classes", credits: 4, completed: false }
];

const courseCards = document.getElementById('courseCards');
const totalCredits = document.getElementById('totalCredits');

function renderCourses(filtered) {
  courseCards.innerHTML = '';
  let credits = 0;

  filtered.forEach(course => {
    const card = document.createElement('div');
    card.textContent = `${course.code}: ${course.name} (${course.credits} credits)`;
    card.style.backgroundColor = course.completed ? '#cfc' : '#fcc';
    courseCards.appendChild(card);
    credits += course.credits;
  });

  totalCredits.textContent = credits;
}

document.getElementById('allBtn').addEventListener('click', () => renderCourses(courses));
document.getElementById('wddBtn').addEventListener('click', () => renderCourses(courses.filter(c => c.code.startsWith('WDD'))));
document.getElementById('cseBtn').addEventListener('click', () => renderCourses(courses.filter(c => c.code.startsWith('CSE'))));

// Initial render
renderCourses(courses);
