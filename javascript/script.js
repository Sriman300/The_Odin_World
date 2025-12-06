let myLibrary = [];
let nextBookId = 0;
 
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        // Assign a unique ID
        this.id = nextBookId++;
    }

    
    toggleReadStatus() {
        this.read = !this.read;
    }
}


const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 310, true);
const theAlchemist = new Book('The Alchemist', 'Paulo Coelho', 208, false);

myLibrary.push(theHobbit, theAlchemist);


const libraryContainer = document.getElementById('libraryContainer');
const newBookBtn = document.getElementById('newBookBtn');
const bookFormModal = document.getElementById('bookFormModal');
const bookForm = document.getElementById('bookForm');
const closeFormBtn = document.getElementById('closeFormBtn');

function displayBooks() {

    libraryContainer.innerHTML = '';

    myLibrary.forEach(book => {
        
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        bookCard.dataset.bookId = book.id;

        
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>${book.pages} pages</p>
            <p class="read-status">${book.read ? '✅ Read' : '❌ Not Read'}</p>

            <div class="card-actions">
                <button class="toggle-read-btn">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
                <button class="remove-btn">Remove</button>
            </div>
        ;

        
        const removeBtn = bookCard.querySelector('.remove-btn');
        removeBtn.addEventListener('click', handleRemoveBook);

        const toggleReadBtn = bookCard.querySelector('.toggle-read-btn');
        toggleReadBtn.addEventListener('click', handleToggleRead);

        
        libraryContainer.appendChild(bookCard);
    });
}

function handleRemoveBook(e) 
    
    const bookIdToRemove = parseInt(e.target.closest('.book-card').dataset.bookId);

    
    myLibrary = myLibrary.filter(book => book.id !== bookIdToRemove);

    // Re-render the display
    displayBooks();
}



  
 
function handleToggleRead(e) {
    const bookIdToToggle = parseInt(e.target.closest('.book-card').dataset.bookId);

    const bookToToggle = myLibrary.find(book => book.id === bookIdToToggle);

    
    if (bookToToggle) {
        bookToToggle.toggleReadStatus();
    }

    // Re-render the display
    displayBooks();
}
 
 
function handleFormSubmit(e) {

    e.preventDefault(); 

    // Get values from the form
    const formData = new FormData(bookForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = parseInt(formData.get('pages'));
    
    const read = formData.has('read'); 

    
    const newBook = new Book(title, author, pages, read);

    
    myLibrary.push(newBook);

    
    displayBooks();

    
    bookFormModal.close();
    bookForm.reset();
}
newBookBtn.addEventListener('click', () => {
    bookFormModal.showModal();
});
closeFormBtn.addEventListener('click', () => {
    bookFormModal.close();
});
bookForm.addEventListener('submit', handleFormSubmit);
displayBooks();