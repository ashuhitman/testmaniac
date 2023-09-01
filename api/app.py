# CRUD application using FLASK
# Methods:   GET => to fetch data
            # POST => To add/ insert data
            # PUT => To update existing data
            # DELETE => To delete existing data

from flask import Flask, jsonify, request

app = Flask(__name__)

books = [{"id": 1, "title": "Harry Pooter", "author": "J.K. Rowling"},{"id": 2, "title": "House of Cards", "author": "Sudha Murthy"}, {"id": 3, "title": "Sense and Sensibility", "author": "Jane Austen"},{"id": 4, "title": "Alchemist", "author": "Paul Cohen"},{"id": 5, "title": "Becoming", "author": "Michelle Obama"}]

# route to get all books
@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)

# route to get a specific book by id
@app.route('/books/<int:id>', methods=['GET'])
def get_book(id):
    for book in books:
        if book['id'] == id:
            return jsonify(book)
    return jsonify({"error": "Book not found"})

# route to add a book
@app.route('/books/add', methods=['POST'])
def add_book():
    new_book = {
        "id": request.json['id'],
        "title": request.json['title'],
        "author": request.json['author'],
    }
    books.append(new_book)
    return jsonify({"success": "Book added successfully"})

# route to update a book
@app.route('/books/<int:id>', methods=['PUT'])
def update_book(id):
    for book in books:
        if book['id'] == id:
            book['title'] =  request.json['title']
            book['author'] = request.json['author']
            return jsonify({"success": "Book updated successfully"})
    return({"error": "book not found!"})

# route to delete a book
@app.route('/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    for book in books:
        if book['id'] == id:
            books.remove(book)
            return jsonify({"success": "Book deleted successfully"})
    return jsonify({"error": "Book not found"})



if __name__ == '__main__':
    app.run(debug=True)