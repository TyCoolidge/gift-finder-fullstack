module.exports = function selectUser(email, password) {
   return `
         SELECT 
             id, email, user_name, created_at
         FROM 
             users
         WHERE 
             email = '${email}'
             AND password = '${password}'
         LIMIT 1;`;
};
