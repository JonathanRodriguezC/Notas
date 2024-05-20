import fs from 'fs';
import chalk from 'chalk';

const cargarNotas = () => {
    try {
        const dataBuffer = fs.readFileSync('notas.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const guardarNotas = (notas) => {
    const dataJSON = JSON.stringify(notas);
    fs.writeFileSync('notas.json', dataJSON);
};

const agregarNota = (title, body) => {
    const notas = cargarNotas();
    const duplicateNote = notas.find((note) => note.title === title);

    if (!duplicateNote) {
        notas.push({ title, body });
        guardarNotas(notas);
        console.log(chalk.green.inverse('Nota agregada'));
    } else {
        console.log(chalk.red.inverse('Nota no agregada. Ya existe una nota con ese título'));
    }
};

const eliminarNota = (title) => {
    const notas = cargarNotas();
    const notasToKeep = notas.filter((note) => note.title !== title);

    if (notas.length > notasToKeep.length) {
        guardarNotas(notasToKeep);
        console.log(chalk.green.inverse('Nota eliminada'));
    } else {
        console.log(chalk.red.inverse('No se encontró una nota con ese título'));
    }
};

const listarNotas = () => {
    const notas = cargarNotas();
    console.log(chalk.inverse('Tus notas:'));
    notas.forEach((note) => console.log(note.title));
};

const leerNota = (title) => {
    const notas = cargarNotas();
    const note = notas.find((note) => note.title === title);

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(chalk.blue(note.body));
    } else {
        console.log(chalk.red.inverse('No se encontró una nota con ese título'));
    }
};

const editarNotas = (title, nuevaNota) => {
    const notas = cargarNotas();
    const note = notas.find((note) => note.title === title);
    if (note) {
        note.body = nuevaNota;
        guardarNotas(notas);
        console.log(chalk.green.inverse('La nota se modificó correctamente'));
    } else {
        console.log(chalk.red.inverse('Nota no encontrada'));
    }
};

export {
    agregarNota,
    eliminarNota,
    listarNotas,
    leerNota,
    editarNotas
}
