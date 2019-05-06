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
};

/*** 
   Call showPage function and pass in the student list and desired
   page number to show.
***/
showPage(list, 1);
appendPageLinks(list);


/***
   Take the 'list' param and create the pagination links
***/
function appendPageLinks(list, paginationLength) {
   const page = document.getElementsByClassName('page');
   paginationLength = Math.ceil(list.length / pageLength);
   const pagination = document.createElement('div');
   const ul = document.createElement('ul');

   if (!document.querySelector('div.pagination')) {
      page[0].appendChild(pagination).appendChild(ul);
      pagination.setAttribute('class', 'pagination');
   }

   //TODO: Handle search pagination here

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

/***
   Create the search box and handle the search logic
***/
searchPage();

function searchPage() {
   const pageHeader = document.getElementsByClassName('page-header');
   const searchDiv = document.createElement('div');
   const searchInput = document.createElement('input');
   const searchBtn = document.createElement('button');

   searchDiv.className = 'student-search';
   searchInput.placeholder = 'Search for students...';
   searchBtn.textContent = 'Search';

   pageHeader[0].appendChild(searchDiv).appendChild(searchInput);
   searchDiv.appendChild(searchBtn);

   searchBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const searchTerm = searchInput.value.toUpperCase();
      const searchResults = [];

      for (let i = 0; i < list.length; i++) {
         const studentName = list[i].getElementsByTagName('h3')[0].textContent;
         if (studentName.toUpperCase().indexOf(searchTerm) > -1) {
            searchResults.push(list[i]);
         } else {
            list[i].style.display = 'none';
         }
      }

      showPage(searchResults, 1);
      appendPageLinks(searchResults);
   });
};