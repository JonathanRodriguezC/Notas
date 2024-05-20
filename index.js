import readline from 'readline';
import { agregarNota, eliminarNota, listarNotas, leerNota, editarNotas } from './utiles/notas.js';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para mostrar el menú
const mostrarMenu = () => {
    console.log(`
Seleccione una opción:
1. Agregar una nueva nota
2. Eliminar una nota
3. Lista de notas
4. Leer una nota
5. Modificar una nota
6. Salir
`);

    rl.question('Digite una opcion: ', (opc) => {
        switch (opc) {
            case '1':
                rl.question('Título de la nota: ', (title) => {
                    rl.question('Cuerpo de la nota: ', (body) => {
                        agregarNota(title, body);
                        console.log('Nota agregada exitosamente.');
                        mostrarMenu();
                    });
                });
                break;
            case '2':
                rl.question('Título de la nota a eliminar: ', (title) => {
                    eliminarNota(title);
                    console.log('Nota eliminada exitosamente.');
                    mostrarMenu();
                });
                break;
            case '3':
                listarNotas();
                mostrarMenu();
                break;
            case '4':
                rl.question('Título de la nota a leer: ', (title) => {
                    leerNota(title);
                    mostrarMenu();
                });
                break;
            case '5':
                rl.question('Título de la nota a modificar: ', (title) => {
                    rl.question('Nuevo contenido de la nota: ', (body) => {
                        editarNotas(title, body);
                        console.log(chalk.blue.inverse('Nota modificada exitosamente.'));
                        mostrarMenu();
                    });
                });
                break;
            case '6':
                rl.close();
                break;
            default:

                console.log(chalk.inverse.red('Opción no válida. Intente de nuevo.'));
                mostrarMenu();
                break;
        }

    })

};
mostrarMenu();