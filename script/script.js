// Recupero gli elementi dal form di input
const elementForm = document.getElementById("login");
const elementFirstName = document.getElementById("firstName");
const elementLastName = document.getElementById("lastName");
const elementAge = document.getElementById("age");
const elementKm = document.getElementById("km");
const elementBtnSubmit = document.querySelector(".btnsubmit");
const elementBtnReset = document.querySelector(".btnreset");

//Recupero gli elementi della section di visualizzazione Costo del biglietto
const elementTicketPrint = document.getElementById("ticket-print");
const elementOutputName = document.querySelector(".f-name");
const elementOutputSurname = document.querySelector(".l-name");
const elementOutputPrice = document.querySelector(".price");

// Aggiungo l'ascoltatore di eventi per il click sul pulsante del form
elementForm.addEventListener("submit", function (event) {
    // Prevengo il caricamento della pagina
    event.preventDefault();
    // Rimuovo la classe "d-none" così da far comparire la section contenente il costo del biglietto
    elementTicketPrint.classList.remove("d-none");
    // Assegno i valori inseriti nel form di input nei rispettivi oggetti <p>
    elementOutputName.innerText = elementFirstName.value.trim();
    elementOutputSurname.innerText = elementLastName.value.trim();

    // Variabile contenente il prezzo finale
    let finalPrice = 0;
    // Condizione che controlla l'inserimento corretto dei km:
    // se la condizione faccio stampare su price una stringa personalizzata: Impossibile calcolare il prezzo del biglietto...
    // se invece è falsa calcolo il prezzo
    if (elementKm.value != parseFloat(elementKm.value) || (parseFloat(elementKm.value) < 0)) {
        finalPrice = "Impossibile calcolare il prezzo del biglietto: hai inserito un valore negativo o non valido per i km!";
    } else {
        //Calcolo del prezzo
        const age = parseInt(elementAge.value);
        const priceKm = 0.21;
        const discountUnder = 20;
        const discountOver = 40;
        const km = parseFloat(elementKm.value);

        if (age < 18) {
            finalPrice = km * priceKm;
            finalPrice -= (finalPrice / 100) * discountUnder;
            // Arrotondo il prezzo a due decimali dopo la virgola
            finalPrice = finalPrice.toFixed(2);
        } else if (age > 65) {
            finalPrice = km * priceKm;
            finalPrice -= (finalPrice / 100) * discountOver;
            finalPrice = finalPrice.toFixed(2);
        } else if ((age >= 18) && (age <= 65)) {
            finalPrice = km * priceKm;
            finalPrice = finalPrice.toFixed(2);
        }
    }
    elementOutputPrice.innerHTML = finalPrice;
});

// Ascoltatore di eventi per il pulsante cancella dati
elementBtnReset.addEventListener("click", function (event) {
    // Prevengo il caricamento della pagina
    event.preventDefault();
    // Aggiungo la classe "d-none" così da nascondere la section contenente il costo del biglietto
    elementTicketPrint.classList.add("d-none");
    // Azzero le input di acquista il biglietto
    elementFirstName.value ="";
    elementLastName.value ="";
    elementAge.value ="";
    elementKm.value ="";
});

