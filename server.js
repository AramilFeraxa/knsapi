const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // dodaj import modułu cors

const app = express();
const port = 3000;

app.use(cors()); // użyj cors middleware

// Parsowanie danych z formularza w formacie JSON
app.use(bodyParser.json());

// Konfiguracja połączenia z bazą danych MySQL
const connection = mysql.createConnection({
    host: 'host656095.hostido.net.pl',
    user: 'host656095_lista',
    password: 'Kariera',
    database: 'host656095_lista'
});

// Nawiązanie połączenia z bazą danych
connection.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
        return;
    }
    console.log('Połączenie z bazą danych zostało pomyślnie nawiązane.');
});

// Endpoint obsługujący żądanie POST z formularza
app.post('/submit-form', (req, res) => {
    // Dane przesłane z formularza
    const formData = req.body;
    console.log('Received form data:', formData);

    // Zapytanie SQL do wstawienia danych do tabeli
    const sql = 'INSERT INTO `lista_ucz` (`res_id`, `res_name`, `res_email`) VALUES (NULL, ?, ?)';
    const values = [formData.res_name, formData.res_email];

    // Wykonanie zapytania do bazy danych
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Błąd podczas wykonywania zapytania SQL:', error);
            res.status(500).json({ message: 'Wystąpił błąd podczas przetwarzania danych.' });
            return;
        }
        console.log('Dane zostały pomyślnie zapisane do bazy danych.');
        res.status(200).json({ message: 'Formularz został pomyślnie przesłany i dane zapisane do bazy danych.' });
    });
});

// Uruchomienie serwera
app.listen(port, () => {
    console.log(`Serwer nasłuchuje na http://localhost:${port}`);
});
