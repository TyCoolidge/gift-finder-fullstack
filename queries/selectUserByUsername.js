const selectUserByUsername = `
     SELECT
        *
     FROM 
        users
    WHERE
        user_name = ?
    LIMIT 1
     `;

module.exports = selectUserByUsername;
