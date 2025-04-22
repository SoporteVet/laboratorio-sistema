function verificarMedico() {
        var medico = document.getElementById('nombreMedico').value;
        var mensaje = document.getElementById('mensajeMedico');
        if (medico === 'N.A') {
            mensaje.style.display = 'none';
        } else {
            mensaje.style.display = 'block';
        }
    }
function moverFocoConFlechas(event, derechaId, izquierdaId, arribaId, abajoId) {
                    switch (event.key) {
                        case 'ArrowRight':
                            event.preventDefault();
                            document.getElementById(derechaId).focus();
                            break;
                        case 'ArrowLeft':
                            event.preventDefault();
                            document.getElementById(izquierdaId).focus();
                            break;
                        case 'ArrowUp':
                            event.preventDefault();
                            document.getElementById(arribaId).focus();
                            break;
                        case 'ArrowDown':
                            event.preventDefault();
                            document.getElementById(abajoId).focus();
                            break;
                    }
                }
                function calcularTodos() {
                    calcularNeutrofilos();
                    calcularEosinofilos();
                    calcularNeutrofilosPorcentaje();
                }
                
                function calcularNeutrofilos() {
                    var leucocitos = parseFloat(document.getElementById('leucocitos').value.replace(',', '.')) || 0;
                    var linfocitos = parseFloat(document.getElementById('linfocitos').value.replace(',', '.')) || 0;
                    var monocitos = parseFloat(document.getElementById('monocitos').value.replace(',', '.')) || 0;
                    var eosinofilos = parseFloat(document.getElementById('eosinofilos').value.replace(',', '.')) || 0;
                
                    var neutrofilos = leucocitos - linfocitos - monocitos - eosinofilos;
                    var neutrofilosInput = document.getElementById('neutrofilos');
                    neutrofilosInput.value = neutrofilos.toFixed(1).replace('.', ',');
                
                    cambiarColor(leucocitos, 'leucocitos', 6.8, 13.9);
                    cambiarColor(linfocitos, 'linfocitos', 1.1, 3.3);
                    cambiarColor(monocitos, 'monocitos', 0.0, 1.8);
                    cambiarColor(eosinofilos, 'eosinofilos', 0.0, 1.7);
                    cambiarColor(neutrofilos, 'neutrofilos', 4.1, 10.3);
                }
                function calcularLinfocitosPorcentaje() {
                    var linfocitosPorcentaje = parseFloat(document.getElementById('linfocitos_porcentaje').value.replace(',', '.')) || 0;
                    cambiarColor(linfocitosPorcentaje, 'linfocitos_porcentaje', 12.0, 30.0);
    }
                function calcularEosinofilos() {
                    var leucocitos = parseFloat(document.getElementById('leucocitos').value.replace(',', '.')) || 0;
                    var eosinofilosPorcentaje = parseFloat(document.getElementById('eosinofilos_porcentaje').value.replace(',', '.')) || 0;
                
                    var eosinofilos = (eosinofilosPorcentaje * leucocitos) / 100;
                    var eosinofilosInput = document.getElementById('eosinofilos');
                    eosinofilosInput.value = eosinofilos.toFixed(1).replace('.', ',');
                
                    cambiarColor(eosinofilos, 'eosinofilos', 0.0, 1.7);
                }
                
                function calcularNeutrofilosPorcentaje() {
                    var linfocitosPorcentaje = parseFloat(document.getElementById('linfocitos_porcentaje').value.replace(',', '.')) || 0;
                    var monocitosPorcentaje = parseFloat(document.getElementById('monocitos_porcentaje').value.replace(',', '.')) || 0;
                    var eosinofilosPorcentaje = parseFloat(document.getElementById('eosinofilos_porcentaje').value.replace(',', '.')) || 0;
                
                    var neutrofilosPorcentaje = 100 - linfocitosPorcentaje - monocitosPorcentaje - eosinofilosPorcentaje;
                    var neutrofilosPorcentajeInput = document.getElementById('neutrofilos_porcentaje');
                    neutrofilosPorcentajeInput.value = neutrofilosPorcentaje.toFixed(1).replace('.', ',');
                
                    // No cambiar el color de neutrofilos_porcentaje
                    neutrofilosPorcentajeInput.style.color = 'black';

                    cambiarColor(linfocitosPorcentaje, 'linfocitos_porcentaje', 12.0, 30.0);
                    cambiarColor(monocitosPorcentaje, 'monocitos_porcentaje', 2.0, 9.0);
                }
                
                function cambiarColor(valor, id, min, max) {
                    var input = document.getElementById(id);
                    if (id === 'neutrofilos_porcentaje' || id === 'eosinofilos_porcentaje') {
                        input.style.color = 'black';
                        return;
                    }
                    if (valor < min) {
                        input.style.color = '#0096d2';
                    } else if (valor > max) {
                        input.style.color = 'red';
                    } else {
                        input.style.color = 'black';
                    }
                }
                function cambiarColor(valor, id, min, max) {
                var input = document.getElementById(id);
                if (valor < min) {
                    input.style.color = '#0096d2';
                } else if (valor > max) {
                    input.style.color = 'red';
                } else {
                    input.style.color = 'black';
                }
            }
                function formatearDecimal(id) {
                    var input = document.getElementById(id);
                    if (input.value === '') return;
                    var valor = parseFloat(input.value.replace(',', '.')) || 0;
                    input.value = valor.toFixed(1).replace('.', ',');
                }
                
                function moverFoco(event, siguienteId) {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        document.getElementById(siguienteId).focus();
                    }
                }
                
                document.getElementById('leucocitos').addEventListener('blur', function() {
                    formatearDecimal('leucocitos');
                    calcularTodos();
                });
                document.getElementById('linfocitos').addEventListener('blur', function() {
                    formatearDecimal('linfocitos');
                    calcularTodos();
                });
                document.getElementById('monocitos').addEventListener('blur', function() {
                    formatearDecimal('monocitos');
                    calcularTodos();
                });
                document.getElementById('eosinofilos').addEventListener('blur', function() {
                    formatearDecimal('eosinofilos');
                    calcularTodos();
                });
                
                document.getElementById('linfocitos_porcentaje').addEventListener('blur', function() {
                    formatearDecimal('linfocitos_porcentaje');
                    calcularTodos();
                });
                document.getElementById('monocitos_porcentaje').addEventListener('blur', function() {
                    formatearDecimal('monocitos_porcentaje');
                    calcularTodos();
                });
                document.getElementById('neutrofilos_porcentaje').addEventListener('blur', function() {
                    formatearDecimal('neutrofilos_porcentaje');
                    calcularTodos();
                });
                document.getElementById('eosinofilos_porcentaje').addEventListener('blur', function() {
                    formatearDecimal('eosinofilos_porcentaje');
                    calcularTodos();
                });
        import { eritrocitos } from './numeros.js';
                
                document.addEventListener('DOMContentLoaded', () => {
                    const datalist = document.getElementById('rangoEritrocitos');
                    eritrocitos.forEach(valor => {
                        const option = document.createElement('option');
                        option.value = parseFloat(valor.replace(',', '.')).toFixed(2).replace('.', ',');
                        datalist.appendChild(option);
                    });
                });

                function formatearDecimal(id, decimales = 1) {
                    var input = document.getElementById(id);
                    if (input.value === '') return;
                    var valor = parseFloat(input.value.replace(',', '.')) || 0;
                    input.value = valor.toFixed(decimales).replace('.', ',');
                    }
                    function formatearDecimales(id, decimales = 2) {
                    var input = document.getElementById(id);
                    if (input.value === '') return;
                    var valor = parseFloat(input.value.replace(',', '.')) || 0;
                    input.value = valor.toFixed(decimales).replace('.', ',');
                    }
                        function calcularTodosRojos() {
                            calcularEritrocitos();
                            calcularHemoglobina();
                            calcularHematocrito();
                            calcularVCM();
                            calcularHCM();
                            calcularCHCM();
                            calcularRDW();
                        }
                        
                        function calcularEritrocitos() {
                        var eritrocitos = parseFloat(document.getElementById('eritrocitos').value.replace(',', '.')) || 0;
                        cambiarColor(eritrocitos, 'eritrocitos', 5.61, 7.47);}
                        
                        function calcularHemoglobina() {
                            var hemoglobina = parseFloat(document.getElementById('hemoglobina').value.replace(',', '.')) || 0;
                            cambiarColor(hemoglobina, 'hemoglobina', 14.2, 18.9);
                        }
                        
                        function calcularHematocrito() {
                            var hematocrito = parseFloat(document.getElementById('hematocrito').value.replace(',', '.')) || 0;
                            cambiarColor(hematocrito, 'hematocrito', 40.4, 55.3);
                        }
                        
                        function calcularVCM() {
                            var vcm = parseFloat(document.getElementById('vcm').value.replace(',', '.')) || 0;
                            cambiarColor(vcm, 'vcm', 65.0, 80.0);
                        }
                        
                        function calcularHCM() {
                            var hcm = parseFloat(document.getElementById('hcm').value.replace(',', '.')) || 0;
                            cambiarColor(hcm, 'hcm', 20.0, 25.0);
                        }
                        
                        function calcularCHCM() {
                            var chcm = parseFloat(document.getElementById('chcm').value.replace(',', '.')) || 0;
                            cambiarColor(chcm, 'chcm', 30.0, 38.0);
                        }
                        
                        function calcularRDW() {
                            var rdw = parseFloat(document.getElementById('rdw').value.replace(',', '.')) || 0;
                            cambiarColor(rdw, 'rdw', 11.0, 15.5);
                        }
                        
                        function cambiarColor(valor, id, min, max) {
                        var input = document.getElementById(id);
                        if (valor < min) {
                            input.style.color = '#0096d2';
                        } else if (valor > max) {
                            input.style.color = 'red';
                        } else {
                            input.style.color = 'black';
                        }
                }
                
                
                        function moverFoco(event, siguienteId) {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                document.getElementById(siguienteId).focus();
                            }
                        }
                        
                        document.getElementById('eritrocitos').addEventListener('blur', function() {
                            formatearDecimales('eritrocitos');
                            calcularTodosRojos();
                        });
                        document.getElementById('hemoglobina').addEventListener('blur', function() {
                            formatearDecimal('hemoglobina');
                            calcularTodosRojos();
                        });
                        document.getElementById('hematocrito').addEventListener('blur', function() {
                            formatearDecimal('hematocrito');
                            calcularTodosRojos();
                        });
                        document.getElementById('vcm').addEventListener('blur', function() {
                            formatearDecimal('vcm');
                            calcularTodosRojos();
                        });
                        document.getElementById('hcm').addEventListener('blur', function() {
                            formatearDecimal('hcm');
                            calcularTodosRojos();
                        });
                        document.getElementById('chcm').addEventListener('blur', function() {
                            formatearDecimal('chcm');
                            calcularTodosRojos();
                        });
                        document.getElementById('rdw').addEventListener('blur', function() {
                            formatearDecimal('rdw');
                            calcularTodosRojos();
                        });
                        function calcularTodosPlaquetas() {
                            calcularPlaquetas();
                            calcularMPV();
                            calcularPDW();
                            calcularPCT();
                        }
                        
                        function calcularPlaquetas() {
                            var plaquetas = parseFloat(document.getElementById('plaquetas').value.replace(',', '.')) || 0;
                            cambiarColor(plaquetas, 'plaquetas', 117, 460);
                        }
                        
                        function calcularMPV() {
                            var mpv = parseFloat(document.getElementById('mpv').value.replace(',', '.')) || 0;
                            cambiarColor(mpv, 'mpv', 7.0, 12.9);
                        }
                        
                        function calcularPDW() {
                            var pdw = parseFloat(document.getElementById('pdw').value.replace(',', '.')) || 0;
                            cambiarColor(pdw, 'pdw', 0, 0); // No hay rango especificado
                        }
                        
                        function calcularPCT() {
                            var pct = parseFloat(document.getElementById('pct').value.replace(',', '.')) || 0;
                            cambiarColor(pct, 'pct', 0, 0); // No hay rango especificado
                        }
                        
                        function cambiarColor(valor, id, min, max) {
                            var input = document.getElementById(id);
                            if (valor < min) {
                                input.style.color = '#0096d2';
                            } else if (valor > max) {
                                input.style.color = 'red';
                            } else {
                                input.style.color = 'black';
                            }
                        }
                        
                        function formatearDecimal(id) {
                            var input = document.getElementById(id);
                            if (input.value === '') return;
                            var valor = parseFloat(input.value.replace(',', '.')) || 0;
                            input.value = valor.toFixed(1).replace('.', ',');
                        }
                        
                        function moverFoco(event, siguienteId) {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                document.getElementById(siguienteId).focus();
                            }
                        }
                        
                        document.getElementById('plaquetas').addEventListener('blur', function() {
                            calcularTodosPlaquetas();
                        });
                        document.getElementById('mpv').addEventListener('blur', function() {
                            formatearDecimal('mpv');
                            calcularTodosPlaquetas();
                        });
                        document.getElementById('pdw').addEventListener('blur', function() {
                            formatearDecimal('pdw');
                            calcularTodosPlaquetas();
                        });
                        document.getElementById('pct').addEventListener('blur', function() {
                            formatearDecimal('pct');
                            calcularTodosPlaquetas();
                        });
                        document.addEventListener('DOMContentLoaded', () => {
                            const templates = document.querySelectorAll('.container');
                            const templateSelector = document.getElementById('templateSelector');
                        
                            templateSelector.addEventListener('change', () => {
                                templates.forEach(template => template.style.display = 'none');
                                const selectedTemplate = document.getElementById(templateSelector.value);
                                if (selectedTemplate) selectedTemplate.style.display = 'block';
                            });
                        });
                        
                        function printTemplate() {
                            const templateSelector = document.getElementById('templateSelector');
                            const selectedTemplate = document.getElementById(templateSelector.value);
                        
                            if (!selectedTemplate) {
                                alert('Selecciona una plantilla antes de imprimir.');
                                return;
                            }
                        
                            // Crear un contenedor temporal para la impresión
                            const printContainer = document.createElement('div');
                            printContainer.id = 'printContainer';
                            printContainer.style.display = 'none';
                            document.body.appendChild(printContainer);
                        
                            // Clonar la plantilla seleccionada y agregarla al contenedor de impresión
                            const clone = selectedTemplate.cloneNode(true);
                            printContainer.appendChild(clone);
                        
                            // Ocultar todas las plantillas excepto la seleccionada
                            const templates = document.querySelectorAll('.container');
                            templates.forEach(template => {
                                if (template !== selectedTemplate) {
                                    template.style.display = 'none';
                                }
                            });
                        
                            // Mostrar el contenedor de impresión y ocultar el resto del contenido
                            printContainer.style.display = 'block';
                            document.querySelector('.controls').style.display = 'none';
                        
                            // Imprimir el contenido del contenedor de impresión
                            window.print();
                        
                            // Restaurar la visibilidad de todas las plantillas y controles
                            printContainer.style.display = 'none';
                            document.querySelector('.controls').style.display = 'block';
                            templates.forEach(template => {
                                template.style.display = 'none';
                            });
                            selectedTemplate.style.display = 'block';
                        
                            // Eliminar el contenedor de impresión
                            document.body.removeChild(printContainer);
                        }
                        document.addEventListener('DOMContentLoaded', () => {
                            const templates = document.querySelectorAll('.container');
                            const templateSelector = document.getElementById('templateSelector');
                        
                            templateSelector.addEventListener('change', () => {
                                templates.forEach(template => template.style.display = 'none');
                                const selectedTemplate = document.getElementById(templateSelector.value);
                                if (selectedTemplate) selectedTemplate.style.display = 'block';
                            });
                        });
                        
                        async function generatePDF() {
                            const { jsPDF } = window.jspdf;
                            const templateSelector = document.getElementById('templateSelector');
                            const selectedTemplate = document.getElementById(templateSelector.value);
                        
                            if (!selectedTemplate) {
                                alert('Selecciona una plantilla antes de generar el PDF.');
                                return;
                            }
                        
                            // Obtener el nombre de la mascota y el apellido del propietario
                            const mascotaNombre = document.getElementById('mascotaNombre').value;
                            const propietarioNombre = document.getElementById('propietarioNombre').value;
                            const propietarioApellido = propietarioNombre.split(' ').pop(); // Obtener el último nombre como apellido
                        
                            // Espera a que todas las imágenes dentro del elemento se carguen
                            const images = selectedTemplate.getElementsByTagName('img');
                            const loadImages = Array.from(images).map(img => {
                                return new Promise((resolve, reject) => {
                                    if (img.complete) {
                                        resolve();
                                    } else {
                                        img.onload = resolve;
                                        img.onerror = reject;
                                    }
                                });
                            });
                        
                            try {
                                await Promise.all(loadImages);
                            } catch (error) {
                                alert('Error al cargar las imágenes.');
                                return;
                            }
                        
                            // Genera el canvas
                            const canvas = await html2canvas(selectedTemplate, {
                                scale: 2,
                                useCORS: true
                            });
                        
                            const imgData = canvas.toDataURL('image/jpeg', 1.0);
                            const pdf = new jsPDF('p', 'mm', 'a4');
                            const imgWidth = 210; 
                            const pageHeight = 297; 
                            const imgHeight = (canvas.height * imgWidth) / canvas.width;
                        
                            // Escalar el contenido para que se ajuste a una sola página
                            const scale = pageHeight / imgHeight;
                            const scaledWidth = imgWidth * scale;
                            const scaledHeight = imgHeight * scale;
                        
                            // Agrega la imagen de la plantilla escalada
                            pdf.addImage(imgData, 'JPEG', 0, 0, scaledWidth, scaledHeight);
                        
                            // Genera el nombre del archivo
                            const fileName = `${templateSelector.options[templateSelector.selectedIndex].text} ${mascotaNombre} ${propietarioApellido}.pdf`;
                        
                            // Guarda el PDF con el nombre personalizado
                            pdf.save(fileName);
                        }