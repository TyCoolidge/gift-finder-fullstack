const showUserGifts = `
     SELECT
        *
     FROM 
        gifts
    WHERE
        created_by_user_id = ?
     `;

module.exports = showUserGifts;
