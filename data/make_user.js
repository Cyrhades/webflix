import 'dotenv/config';
import con from '../app/database_sql.js';
import bcrypt from 'bcryptjs';

if(process.argv.length !== 6) {
    console.error(`Vous n'avez pas envoyé le bon nombre de parametres
    la commande doit ressembler à :
    > npm run make_user <username> <password> <firstname> <lastname>
    `)
    process.exit();
}
con.promise().query(
    'INSERT INTO `user` SET ?',
    {
        username: process.argv[2],
        password: bcrypt.hashSync(process.argv[3], bcrypt.genSaltSync(10)),
        firstname: process.argv[4],
        lastname: process.argv[5]
    }
).finally(() => { process.exit();} );
