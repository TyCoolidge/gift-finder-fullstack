const selectUserById = `
     SELECT
        id, email, user_name, created_at
     FROM 
        users
    WHERE
        id = ?
    LIMIT 1
     `;

module.exports = selectUserById;
