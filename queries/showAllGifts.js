module.exports = function showAllGfits() {
   return `
    SELECT
        *
    FROM 
        gifts
    ORDER BY 
        created_at DESC;
    `;
};
