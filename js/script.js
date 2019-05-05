/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Creating and storing the length of the student list and
   setting the default page length used to determine how
   many students to show per page.
***/
const list = document.getElementsByClassName('student-item');
const pageLength = 10;



/*** 
   Uses the 'page' param to determine the START and END index
   of the student list and then loops through the 'list' param
   to display only the students within that index range
***/
function showPage(list, page) {
   const start = (page * pageLength) - pageLength;
   const end = (page * pageLength) - 1;

   for (let i = 0; i < list.length; i++) {
      if (i >= start && i <= end) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
   appendPageLinks(list);
};

/*** 
   Call showPage function and pass in the student list and desired
   page number to show.
***/
showPage(list, 1);


/***
   Take the 'list' param and create the pagination links
***/
function appendPageLinks(list) {
   const page = document.getElementsByClassName('page');
   const pagination = document.createElement('div');
   const ul = document.createElement('ul');
   const paginationLength = Math.ceil(list.length / pageLength);


   if (!document.querySelector('div.pagination')) {
      page[0].appendChild(pagination).appendChild(ul);
      pagination.setAttribute('class', 'pagination');
   }

   for (let i = 0; i < paginationLength; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i + 1;
      a.href = '#';
      if (i === 0) {
         a.className = 'active';
      }
      a.addEventListener('click', function (e) {
         e.preventDefault();
         const current = e.target;
         const items = ul.getElementsByTagName('li');
         for (let i = 0; i < items.length; i++) {
            items[i].children[0].className = '';
         }
         current.className = 'active';
         showPage(list, current.textContent);
      })
      li.appendChild(a);
      ul.appendChild(li);
   }
};