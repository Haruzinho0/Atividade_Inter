document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('pointsContainer');
    const numPointsInput = document.getElementById('numPoints');
    const generateFieldsBtn = document.getElementById('generateFields');
    const calculateBtn = document.getElementById('calculate');
    const methodSelect = document.getElementById('methodSelect');

    generateFieldsBtn.addEventListener('click', function() {
        const numPoints = parseInt(numPointsInput.value);
  
        container.innerHTML = '';
        
        for (let i = 0; i < numPoints; i++) {
            const xInput = document.createElement('input');
            xInput.type = 'number';
            xInput.placeholder = `Digite o valor de x${i + 1}`;
            xInput.id = `x${i}`;
            container.appendChild(xInput);
  
            const yInput = document.createElement('input');
            yInput.type = 'number';
            yInput.placeholder = `Digite o valor de y${i + 1}`;
            yInput.id = `y${i}`;
            container.appendChild(yInput);
  
            container.appendChild(document.createElement('br'));
        }
    });

    calculateBtn.addEventListener('click', function() {
        const numPoints = parseInt(numPointsInput.value);
        const interpolateAt = parseFloat(document.getElementById('interpolateAt').value);
        const selectedMethod = methodSelect.value;

        let x = [], y = [];
        for (let i = 0; i < numPoints; i++) {
            x.push(parseFloat(document.getElementById(`x${i}`).value));
            y.push(parseFloat(document.getElementById(`y${i}`).value));
        }

        let result;
        if (selectedMethod === 'lagrange') {
            result = lagrangeInterpolation(x, y, interpolateAt);
        } else if (selectedMethod === 'newton') {
            result = newtonInterpolation(x, y, interpolateAt);
        }
        document.getElementById('result').innerText = result;
    });
});

function lagrangeInterpolation(x, y, value) {
    let n = x.length;
    let steps = document.getElementById('steps');
    steps.innerHTML = '';

    steps.innerHTML += `<p>Valores dos pontos:</p>`;
    for (let i = 0; i < n; i++) {
        steps.innerHTML += `<p>x${i} = ${x[i]}, y${i} = ${y[i]}</p>`;
    }

    let interpolation = 0;
    let polynomialTerms = `P(${value}) = `;

    for (let i = 0; i < n; i++) {
        let term = y[i];
        let termDetails = `${y[i]}`;
        
        for (let j = 0; j < n; j++) {
            if (j !== i) {
                term *= (value - x[j]) / (x[i] - x[j]);
                termDetails += ` * (${value} - ${x[j]}) / (${x[i]} - ${x[j]})`;
            }
        }

        polynomialTerms += ` + ${termDetails}`;
        interpolation += term;
    }

    steps.innerHTML += `<p>${polynomialTerms}</p>`;
    return interpolation;
}

function newtonInterpolation(x, y, value) {
    let n = x.length;
    let dividedDifferences = [];
    let steps = document.getElementById('steps');
    steps.innerHTML = '';

    steps.innerHTML += `<p>Valores dos f[x,0]:</p>`;
    for (let i = 0; i < n; i++) {
        dividedDifferences.push([y[i]]);
        steps.innerHTML += `<p>f[${i},0] = ${y[i]}</p>`;
    }

    steps.innerHTML += `<p>Valores dos pontos:</p>`;
    for (let i = 0; i < n; i++) {
        steps.innerHTML += `<p>x${i} = ${x[i]}, y${i} = ${y[i]}</p>`;
    }

    for (let j = 1; j < n; j++) {
        for (let i = 0; i < n - j; i++) {
            let value = (dividedDifferences[i + 1][j - 1] - dividedDifferences[i][j - 1]) / (x[i + j] - x[i]);
            if (!dividedDifferences[i][j]) {
                dividedDifferences[i].push(value);
            } else {
                dividedDifferences[i][j] = value;
            }
            steps.innerHTML += `<p>f[${i},${j}] = (f[${i + 1},${j - 1}] - f[${i},${j - 1}]) / (${x[i + j]} - ${x[i]}) = ${value}</p>`;
        }
    }

    let interpolation = dividedDifferences[0][0];
    let polynomialTerms = `P(${value}) = ${interpolation}`;
    
    for (let i = 1; i < n; i++) {
        let term = dividedDifferences[0][i];
        let termDetails = `${term}`;
        
        for (let j = 0; j < i; j++) {
            term *= (value - x[j]);
            termDetails += ` * (${value} - ${x[j]})`;
        }
        
        polynomialTerms += ` + ${termDetails}`;
        interpolation += term;
    }

    steps.innerHTML += `<p>${polynomialTerms}</p>`;
    return interpolation;
}
