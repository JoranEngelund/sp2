module.exports = class CustomerService {
  constructor(db) {
    this.client = db.sequelize;
  }

  async getAll() {
    const query = `
      SELECT 
        Title,
        FirstName,
        LastName,
        EmailAddress,
        Phone
      FROM [SalesLT].[Customer]
    `;

    try {
      const [results] = await this.client.query(query);

      console.log("results:", results);
      if (results && results.length > 0) {
        return results;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }

  async getPrefix(prefix) {
    const query = `
      SELECT 
        Title,
        FirstName,
        LastName,
        EmailAddress,
        Phone
      FROM [SalesLT].[Customer]
      WHERE LastName LIKE ?
    `;

    try {
      const [results] = await this.client.query(query, {
        replacements: [prefix + "%"],
      });

      return results || [];
    } catch (error) {
      console.error("Error in retrieving customer prefix", error);
      throw error;
    }
  }
};
