/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const pageLength = 10;
const list = document.getElementsByClassName('student-item');



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
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
}

showPage(list, 1);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
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
}




// Remember to delete the comments that came with this file, and replace them with your own code comments.