let books = [];

window.onload = async function () {
    document.getElementById("insert-form").addEventListener("submit", insert);
    document.getElementById("update-form").addEventListener("submit", update);
    document.getElementById("delete-form").addEventListener("submit", remove);

    await loadXml("library.xml");
    displayBooks();
};

async function loadXml(path) {
    const response = await fetch(path);
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const booksFromXml = xmlDoc.getElementsByTagName("book");

    books = []; // making it empty

    for (let i = 0; i < booksFromXml.length; i++) {
        const book = booksFromXml[i];
        books.push({
            id: book.getElementsByTagName("id")[0].textContent,
            name: book.getElementsByTagName("name")[0].textContent,
            author: book.getElementsByTagName("author")[0].textContent,
            category: book.getElementsByTagName("category")[0].textContent,
            status: book.getElementsByTagName("status")[0].textContent
        });
    }
}

function displayBooks() {
    const tbody = document.querySelector("#resultTable tbody");
    tbody.innerHTML = "";

    books.forEach(book => {
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

function insert(e) {
    e.preventDefault();

    const id = document.getElementById("insert-id").value;
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

function update(e) {
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

function remove(e) {
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
