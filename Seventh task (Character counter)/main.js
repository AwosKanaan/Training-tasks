const table = document.getElementById("resultTable");
const btn = document.getElementById("btn");
btn.addEventListener("click", countChars);

function countChars() {
    const text = document.getElementById("text").value;
    const charsCount = {};
    for (let i = 0; i < text.length; i++) {
        charsCount[text[i]] ? charsCount[text[i]]++ : (charsCount[text[i]] = 1);
    }
   
    clearTable();
    fillTable(charsCount);
}

function clearTable() {
    
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}

function fillTable(charsCount) {
    const row = table.insertRow(0);
    const header1 =  row.insertCell(0);
    const header2 =  row.insertCell(1);

    header1.textContent = "Character";
    header2.textContent = "Count";

    const keysArr = Object.keys(charsCount);

    for (let i = 0; i < keysArr.length; i++) {
        const row = table.insertRow(i + 1);

        const char = row.insertCell(0);
        const count = row.insertCell(1);

        char.textContent = keysArr[i];
        count.textContent = charsCount[keysArr[i]];
    }
}