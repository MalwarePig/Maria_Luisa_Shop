************ CSS *******************
style="display: none"    //Oculta un div
style="width: 11%"       //Ancho de una fila

//Ocultar con js
document.getElementById('Oculto').setAttribute('style', 'display: none');


var campo = document.getElementById('campo_formulario');
campo.readOnly = true; // Se añade el atributo
campo.readOnly = false; // Se quita el atributo