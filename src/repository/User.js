import con from '../../app/database_sql.js';

export function selectByUsername(username) {    
    return con.promise().query("SELECT * FROM `user` WHERE ?", {username}).then((result) => {
        if(result[0] !== undefined && result[0][0] !== undefined) {
            return result[0][0];
        } else {
            return null;
        }
    });
}


export function enableA2FByUsername(username) {    
    return con.promise().query("UPDATE `user` SET ? WHERE ?",  [{a2f:true}, {username}]);
}