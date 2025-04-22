<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cálculo BUN/CREA</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        td {
            padding: 8px;
            border: 1px solid #ddd;
        }
        input {
            width: 100%;
            padding: 5px;
            box-sizing: border-box;
        }
        .normal {
            color: black;
        }
        .alto {
            color: red;
        }
        .bajo {
            color: #0096d2;
        }
    </style>
</head>
<body>
    <table>
        <tr>
            <td>NITRÓGENO UREICO</td>
            <td>
                <input type="text" id="nitrogeno_ureico" placeholder="Valor en mg/dl">
            </td>
            <td id="refnitrogeno_ureico">7 - 23</td>
            <td>mg/dl</td>
        </tr>
        <tr>
            <td>CREATININA</td>
            <td>
                <input type="text" id="creatinina" placeholder="Valor en mg/dl">
            </td>
            <td id="refcreatinina">0,6 - 1,2</td>
            <td>mg/dl</td>
        </tr>
        <tr>
            <td>RELACIÓN BUN/CREA</td>
            <td>
                <input type="text" id="bun_crea" readonly>
            </td>
            <td id="refbun_crea">4,2 - 32,8</td>
            <td></td>
        </tr>
    </table>

    <script>
        // Función para calcular la relación BUN/CREA
        function calculateBunCreatinine() {
            const nitroInput = document.getElementById('nitrogeno_ureico');
            const creaInput = document.getElementById('creatinina');
            const bunCreaInput = document.getElementById('bun_crea');
            const refElement = document.getElementById('refbun_crea');

            // Obtener y limpiar los valores
            let nitroValue = nitroInput.value.trim().replace(/\s*[↑↓]$/, '').replace(',', '.');
            let creaValue = creaInput.value.trim().replace(/\s*[↑↓]$/, '').replace(',', '.');

            const nitroNum = parseFloat(nitroValue);
            const creaNum = parseFloat(creaValue);

            // Si no hay números válidos o creatinina es cero/negativa
            if (isNaN(nitroNum) || isNaN(creaNum) || creaNum <= 0) {
                bunCreaInput.value = "";
                bunCreaInput.classList.remove('alto', 'bajo');
                bunCreaInput.classList.add('normal');
                return;
            }

            // Calcular la relación
            const ratio = nitroNum / creaNum;
            
            // Obtener rango de referencia
            const rangoTexto = refElement.textContent.trim();
            const match = rangoTexto.match(/([\d,.]+)\s*-\s*([\d,.]+)/);
            
            if (match) {
                const min = parseFloat(match[1].replace(',', '.'));
                const max = parseFloat(match[2].replace(',', '.'));
                
                // Formatear con un decimal y coma
                let ratioFormatted = ratio.toFixed(1).replace('.', ',');
                
                // Quitar todas las clases de estilo
                bunCreaInput.classList.remove('alto', 'bajo', 'normal');
                
                // Aplicar estilo y añadir flecha según el valor
                if (ratio < min) {
                    bunCreaInput.classList.add('bajo');
                    ratioFormatted += ' ↓';
                } else if (ratio > max) {
                    bunCreaInput.classList.add('alto');
                    ratioFormatted += ' ↑';
                } else {
                    bunCreaInput.classList.add('normal');
                }
                
                // Mostrar el resultado
                bunCreaInput.value = ratioFormatted;
            } else {
                // Si no se pudo determinar el rango, mostrar sin indicadores
                bunCreaInput.value = ratio.toFixed(1).replace('.', ',');
                bunCreaInput.classList.remove('alto', 'bajo');
                bunCreaInput.classList.add('normal');
            }
        }

        // Configurar event listeners para cálculo automático
        document.addEventListener('DOMContentLoaded', function() {
            const nitro = document.getElementById('nitrogeno_ureico');
            const crea = document.getElementById('creatinina');
            
            if (nitro) {
                nitro.addEventListener('input', calculateBunCreatinine);
                nitro.addEventListener('blur', calculateBunCreatinine);
            }
            
            if (crea) {
                crea.addEventListener('input', calculateBunCreatinine);
                crea.addEventListener('blur', calculateBunCreatinine);
            }
            
            // Cálculo inicial
            calculateBunCreatinine();
        });
    </script>
</body>
</html>