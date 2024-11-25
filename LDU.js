function generateMatrix() {
    const dimension = parseInt(document.getElementById("matrix-dimension").value);
    const matrixContainer = document.getElementById("matrix-inputs");
    matrixContainer.innerHTML = "";

    if (!dimension || dimension < 2) {
        alert("Please enter a valid matrix dimension (>= 2).");
        return;
    }

    const table = document.createElement("table");
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.placeholder = `a${i + 1}${j + 1}`;
            input.id = `cell-${i}-${j}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    matrixContainer.appendChild(table);

    document.getElementById("calculate-button").style.display = "inline-block";
}

function performLDU() {
    const dimension = parseInt(document.getElementById("matrix-dimension").value);
    const A = [];
    for (let i = 0; i < dimension; i++) {
        const row = [];
        for (let j = 0; j < dimension; j++) {
            const value = parseFloat(document.getElementById(`cell-${i}-${j}`).value);
            if (isNaN(value)) {
                alert("Please fill in all matrix values.");
                return;
            }
            row.push(value);
        }
        A.push(row);
    }

    const L = Array.from({ length: dimension }, (_, i) =>
        Array(dimension).fill(0).map((_, j) => (i === j ? 1 : 0))
    );
    const U = JSON.parse(JSON.stringify(A));
    const D = Array.from({ length: dimension }, () => Array(dimension).fill(0));

    let steps = `<h4>Step-by-Step LDU Decomposition:</h4>`;
    steps += `<p>Initial Matrix A:</p><pre>${matrixToString(A)}\n</pre>`;

    // Perform LU decomposition to calculate L and U
    for (let i = 0; i < dimension - 1; i++) {
        for (let k = i + 1; k < dimension; k++) {
            const E_ik = U[k][i] / U[i][i];
            L[k][i] = E_ik;

            steps += `<p>E<sub>${k + 1},${i + 1}</sub> = A[${k + 1}][${i + 1}] / A[${i + 1}][${i + 1}] = ${U[k][i]} / ${U[i][i]} = ${E_ik.toFixed(4)}</p>`;
            steps += `<p>Updating row R<sub>${k + 1}</sub> -> R<sub>${k + 1}</sub> - (${E_ik.toFixed(4)} * R<sub>${i + 1}</sub>):</p>`;

            for (let j = 0; j < dimension; j++) {
                U[k][j] -= E_ik * U[i][j];
            }

            steps += `<pre>${matrixToString(U)}\n</pre>`;
        }
    }

    // Extract diagonal elements of U into D and normalize U
    for (let i = 0; i < dimension; i++) {
        D[i][i] = U[i][i];
        for (let j = 0; j < dimension; j++) {
            U[i][j] = U[i][j] / D[i][i];
        }
    }

    steps += `<h4>Final L Matrix:</h4><pre>${matrixToString(L)}\n</pre>`;
    steps += `<h4>Final D Matrix:</h4><pre>${matrixToString(D)}\n</pre>`;
    steps += `<h4>Final U Matrix:</h4><pre>${matrixToString(U)}\n</pre>`;

    // Display results in the new section
    const resultsSection = document.getElementById("results-section");
    const resultsContainer = document.getElementById("results");
    resultsSection.style.display = "block";
    resultsContainer.innerHTML = steps;

    // Scroll to results section
    resultsSection.scrollIntoView({ behavior: "smooth" });
}

// Helper function to format matrices with brackets and add line space
function matrixToString(matrix) {
    return matrix
        .map(row => `[ ${row.map(value => value.toFixed(4)).join(", ")} ]`)
        .join("\n") + "\n";
}
function openDocumentation() {
    window.open('Documentation.pdf', '_blank');
}

function openEmailThread() {
    window.open('email_thread.pdf', '_blank');
}
function opengithubrepo(){
    window.open('https://github.com/Arun404notfound/LDU-factorisation.git', '_blank')
}