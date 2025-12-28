function addRow() {
    const tbody = document.querySelector("#gpaTable tbody");
    const row = document.createElement("tr");

    for (let i = 0; i < 9; i++) {
        const td = document.createElement("td");

        if (i < 7) {
            const input = document.createElement("input");
            input.type = (i === 0) ? "text" : "number";
            td.appendChild(input);
        } else {
            td.classList.add("result-cell");
            td.innerText = "-";
        }

        row.appendChild(td);
    }

    tbody.appendChild(row);
}

function getGrade(gpa) {
    if (gpa >= 3.7) return "A";
    if (gpa >= 3.3) return "B+";
    if (gpa >= 3.0) return "B";
    if (gpa >= 2.5) return "C";
    if (gpa >= 2.0) return "D";
    return "F";
}

function calculateGPA() {
    const rows = document.querySelectorAll("#gpaTable tbody tr");
    let totalCredits = 0;
    let totalPoints = 0;

    rows.forEach(row => {
        const cells = row.cells;
        const inputs = row.querySelectorAll("input");

        const credit = parseFloat(inputs[1].value);
        const totalMarks = parseFloat(inputs[2].value);
        const lowest = parseFloat(inputs[3].value);
        const highest = parseFloat(inputs[4].value);
        const yourMarks = parseFloat(inputs[5].value);
        const avg = parseFloat(inputs[6].value);

        if (
            isNaN(credit) ||
            isNaN(totalMarks) ||
            highest <= lowest ||
            yourMarks > totalMarks
        ) {
            cells[7].innerText = "-";
            cells[8].innerText = "-";
            return;
        }

        let relativePercent =
            ((yourMarks - avg) / (highest - lowest)) * 100 + 50;

        relativePercent = Math.max(0, Math.min(100, relativePercent));

        let gpa = (relativePercent / 100) * 4;
        let grade = getGrade(gpa);

        cells[7].innerText = gpa.toFixed(2);
        cells[8].innerText = grade;

        totalCredits += credit;
        totalPoints += gpa * credit;
    });

    let finalGPA = totalPoints / totalCredits || 0;

    document.getElementById("result").innerHTML =
        `🎓 Final GPA: ${finalGPA.toFixed(2)}`;
}
