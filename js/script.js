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
function appendPageLinks(list) {
   const page = document.querySelector('div.page');
   const div = document.createElement('div');
   const ul = document.createElement('ul');
   // Determine how many pagination <li> we need
   paginationLength = Math.ceil(list.length / pageLength);

   // Do we need to create or update the pagination
   if (!document.querySelector('div.pagination')) {
      page.appendChild(div);
      div.setAttribute('class', 'pagination');
      div.appendChild(ul);
   } else {
      // Clear pagination list
      document.querySelector("div.pagination > ul").remove();
      document.querySelector("div.pagination").appendChild(ul);
   }

   // Create the <li> with <a> inside
   for (let i = 0; i < paginationLength; i++) {
      const li = document.createElement('li');
      const anchor = document.createElement('a');
      const anchorText = document.createTextNode(i + 1);
      anchor.setAttribute('href', '#');
      // Set the first page as the active one for now
      i === 0 ? anchor.setAttribute('class', 'active') : '';

      anchor.addEventListener('click', function (e) {
         e.preventDefault();
         const current = e.target;
         const items = ul.getElementsByTagName('li');
         for (let i = 0; i < items.length; i++) {
            items[i].children[0].className = '';
         }
         current.className = 'active';
         showPage(list, current.textContent);
      })
      // Add the list and anchors to the pagination div
      ul.appendChild(li).appendChild(anchor).appendChild(anchorText);
   }
};

/***
   Create the search variables and perform the search.
***/
const pageHeader = document.getElementsByClassName('page-header');
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchBtn = document.createElement('button');

searchDiv.className = 'student-search';
searchInput.placeholder = 'Search for students...';
searchBtn.textContent = 'Search';

pageHeader[0].appendChild(searchDiv).appendChild(searchInput);
searchDiv.appendChild(searchBtn);

const message = document.createElement('p');
message.style.textAlign = 'center';
message.id = 'noResultsMessage';
document.querySelector('.student-list').appendChild(message);

// Takes the users search input and filters the student list
const doSearch = () => {
   const searchTerm = searchInput.value.toUpperCase();
   const searchResults = [];

   // Find all the matching students
   for (let i = 0; i < list.length; i++) {
      const studentName = list[i].getElementsByTagName('h3')[0].textContent;
      // Collect all the matching students into an array to pass to the showPage function
      if (studentName.toUpperCase().indexOf(searchTerm) > -1) {
         searchResults.push(list[i]);
      } else {// Hide any students that do not match the users search
         list[i].style.display = 'none';
      }
   }

   // Show matching results or show no results message
   if (searchResults.length > 0) {
      message.textContent = '';
      showPage(searchResults, 1);
   } else {
      message.textContent = 'No results';
   }
   // Update pagination links
   appendPageLinks(searchResults);
}

searchBtn.addEventListener('click', function (e) {
   e.preventDefault();
   doSearch();
});

searchInput.addEventListener('keyup', function (e) {
   doSearch();
})