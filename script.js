document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('pointsContainer');
    const numPointsInput = document.getElementById('numPoints');
    const generateFieldsBtn = document.getElementById('generateFields');
    const calculateBtn = document.getElementById('calculate');

    generateFieldsBtn.addEventListener('click', function() {
        const numPoints = parseInt(numPointsInput.value);
  
        // Limpa os campos existentes antes de gerar novos
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
  
            // Adiciona um quebra de linha entre cada par de campos
            container.appendChild(document.createElement('br'));
        }
    });

    calculateBtn.addEventListener('click', function() {
        const numPoints = parseInt(numPointsInput.value);
        const interpolateAt = parseFloat(document.getElementById('interpolateAt').value);

        let x = [], y = [];
        for (let i = 0; i < numPoints; i++) {
            x.push(parseFloat(document.getElementById(`x${i}`).value));
            y.push(parseFloat(document.getElementById(`y${i}`).value));
        }

        const result = lagrangeInterpolation(x, y, interpolateAt);
        document.getElementById('result').innerText = result;
    });
});

function lagrangeInterpolation(x, y, value) {
    let n = x.length;
    let steps = document.getElementById('steps');
    steps.innerHTML = '';

    // Adiciona os valores dos pontos no passo a passo
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
