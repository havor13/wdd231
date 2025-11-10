const yearSpan = document.getElementById('year');
const modifiedPara = document.getElementById('lastModified');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (modifiedPara) {
  modifiedPara.textContent = `Last Modified: ${document.lastModified}`;
}
