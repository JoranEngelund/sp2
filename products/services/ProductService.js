module.exports = class ProductService {
  constructor(db) {
    this.client = db.sequelize;
    this.Product = db.Product;
  }

  async getAll() {
    const query = `
      SELECT
      p.ProductID as "Product ID",
      p.Name AS "Product Name",
      p.ProductNumber,
      p.Color,
      p.Size,
      p.Weight,
       p.ListPrice as "List price",
      FORMAT(p.SellStartDate,'dd/MM/yyyy') as "sell start date"
      FROM [SalesLT].[Product] as p;
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

  async getProductDetails(id) {
    const query = `
     SELECT 
        p.ProductID as "Product ID", 
        p.Name as "Product Name", 
        p.ProductNumber,
        p.Color,
        p.Size,
        p.Weight,
        p.ListPrice as "List price", 
        FORMAT(p.SellStartDate, 'dd/MM/yyyy') as "sell start date"
      FROM [SalesLT].[Product] p
    WHERE p.ProductID = ${id}
    `;

    try {
      const [results] = await this.client.query(query, { replacements: [id] });

      if (results && results.length > 0) {
        return results[0];
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      throw error;
    }
  }
};
