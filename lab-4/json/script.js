let books = [];

window.onload = async () => {
    document.getElementById("insert-form").addEventListener("submit", insert);
    document.getElementById("update-form").addEventListener("submit", update);
    document.getElementById("delete-form").addEventListener("submit", remove);
    document.getElementById("search-input").addEventListener("input", searchBooks);

    await loadJson("library.json");
    displayBooks();
};

const loadJson = async (path) => {
    const response = await fetch(path);
    const json = await response.json();

    books = []; // making it empty
    json.library.books.forEach(book => {
        books.push(book);
    });
}

const displayBooks = (list = books) => {
    const tbody = document.querySelector("#resultTable tbody");
    tbody.innerHTML = "";

    list.forEach(book => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.status}</td>
        `;
        tbody.appendChild(row);
    });
}

const searchBooks = () => {
    const keyword = document.getElementById("search-input").value.trim();
    const filteredBooks = books.filter(book => book.name.toLowerCase().includes(keyword) || book.author.toLowerCase().includes(keyword) || book.category.toLowerCase().includes(keyword) );
    displayBooks(filteredBooks);
}

const insert = (e) => {
    e.preventDefault();

    const id = document.getElementById("insert-id").value.trim();
    const name = document.getElementById("insert-name").value;
    const author = document.getElementById("insert-author").value;
    const category = document.getElementById("category").value;

    if (!id || !name || !author) {
        alert("Please fill all fields");
        return;
    }

    if (books.some(book => book.id === id)) {
        alert("Book ID already exists");
        return;
    }

    books.push({
        id,
        name,
        author,
        category,
        status: "Available"
    });

    displayBooks();
    e.target.reset();
}

const update = (e) => {
    e.preventDefault();

    const id = document.getElementById("update-id").value;
    const status = document.getElementById("status").value;

    const book = books.find(b => b.id === id);

    if (!book) {
        alert("Book not found");
        return;
    }

    book.status = status;
    displayBooks();
    e.target.reset();
}

const remove = (e) => {
    e.preventDefault();

    const id = document.getElementById("delete-id").value;

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        alert("Book not found");
        return;
    }

    books.splice(index, 1);
    displayBooks();
    e.target.reset();
}
