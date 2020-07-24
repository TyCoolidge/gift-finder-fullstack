const selectGiftById = `
     SELECT
        id, created_at, title, photo, url, description, price
     FROM 
        gifts
    WHERE
        id = ?
    LIMIT 1
     `;

module.exports = selectGiftById;
