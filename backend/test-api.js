const fetch = require('node-fetch');

async function testAPI() {
  try {
    // Test POST /api/books
    const response = await fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '978-0-7432-7356-5',
        available: true
      })
    });

    const data = await response.json();
    console.log('POST /api/books response:', data);

    // Test GET /api/books
    const getResponse = await fetch('http://localhost:5000/api/books');
    const getData = await getResponse.json();
    console.log('GET /api/books response:', getData);
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();