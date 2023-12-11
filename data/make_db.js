import 'dotenv/config';
import con from '../app/database_sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const allSql = [];
fs.readdir('./data/', (err, files) => {
    if (err) {
        console.error('Erreur lors de la lecture du répertoire :', err);
        return;
    }
    // Filtrer les fichiers ayant l'extension .sql
    const sqlFiles = files.filter(file => path.extname(file) === '.sql');

    sqlFiles.forEach(sqlFile => {
        const sqlQuery = fs.readFileSync(path.join(__dirname, sqlFile), 'utf-8');

        // Exécuter le script SQL lu depuis le fichier
        allSql.push(con.promise().query(sqlQuery).catch(()=>{}));
    });
    // on quitte le processus quand toute les requetes ont été eecutée
    Promise.all(allSql).then((values) => { process.exit(); });
});

