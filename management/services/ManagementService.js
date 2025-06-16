const { sequelize } = require("../models");

module.exports = class ManagementService {
  constructor(db) {
    this.client = db.sequelize;
  }

  async queryA() {
    const query = `
        SELECT DISTINCT
        Name 
        FROM [SalesLT].[ProductCategory]
        WHERE ParentProductCategoryId IS NULL
        ORDER BY Name ASC;
      `;
    try {
      const [results] = await this.client.query(query);
      console.log("queryA results:", results);
      return results;
    } catch (err) {
      console.error("Error in queryA:", err);
      throw err;
    }
  }

  async queryB() {
    const query = `
        SELECT
        pc.Name AS Name,
        CAST(AVG(p.ListPrice) AS DECIMAL(10,3)) AS Price
        FROM [SalesLT].[Product] AS p
        JOIN [SalesLT].[ProductCategory] AS pc
            ON p.ProductCategoryID = pc.ProductCategoryID
        GROUP BY pc.Name
        ORDER BY AVG(p.ListPrice) DESC;
      `;
    try {
      const [results] = await this.client.query(query);
      console.log("queryB results:", results);
      return results;
    } catch (err) {
      console.error("Error in queryB:", err);
      throw err;
    }
  }

  async queryC() {
    const query = `
        SELECT
        pcParent.Name AS Name,
        CAST(AVG(p.ListPrice) AS DECIMAL(10,3)) AS Price
        FROM [SalesLT].[Product] AS p
        JOIN [SalesLT].[ProductCategory] AS pc
            ON p.ProductCategoryID = pc.ProductCategoryID
        JOIN [SalesLT].[ProductCategory] AS pcParent
            ON pc.ProductCategoryID = pcParent.ProductCategoryID
        GROUP BY pcParent.Name
        ORDER BY AVG(p.ListPrice) ASC;
      `;
    try {
      const [results] = await this.client.query(query);
      console.log("queryC results:", results);
      return results;
    } catch (err) {
      console.error("Error in queryC:", err);
      throw err;
    }
  }

  async queryD() {
    const query = `
      SELECT 
      COUNT(DISTINCT soh.CustomerID) AS Total
    FROM [SalesLT].[SalesOrderHeader] AS soh
    WHERE soh.OrderDate BETWEEN '2008-06-01' AND '2008-06-15';
      `;
    try {
      const [results] = await this.client.query(query);
      console.log("queryD results:", results);
      return results;
    } catch (err) {
      console.error("Error in queryD:", err);
      throw err;
    }
  }

  async queryE() {
    const query = `
    SELECT 
        CustomerID, 
        FirstName, 
        LastName
      FROM [SalesLT].[Customer]
      WHERE FirstName LIKE 'a%'

      INTERSECT

      SELECT 
        CustomerID, 
        FirstName, 
        LastName
      FROM [SalesLT].[Customer]
      WHERE LastName LIKE '%e';
      `;
    try {
      const [results] = await this.client.query(query);
      console.log("queryE results:", results);
      return results;
    } catch (err) {
      console.error("Error in queryE:", err);
      throw err;
    }
  }

  async queryF() {
    const query = `
      SELECT
        c.Title,
        c.FirstName,
        c.MiddleName,
        c.LastName,
        c.CompanyName,
        a.City,
        a.CountryRegion,
        a.StateProvince
      FROM [SalesLT].[Customer] AS c
      JOIN [SalesLT].[CustomerAddress] AS ca
        ON c.CustomerID = ca.CustomerID
      JOIN [SalesLT].[Address] AS a
        ON ca.AddressID = a.AddressID;
    `;
    try {
      const [results] = await this.client.query(query);
      console.log("queryF results:", results);
      return results;
    } catch (err) {
      console.error("Error in queryF:", err);
      throw err;
    }
  }

  async queryG() {
    const query = `
        SELECT 
        ProductNumber,
        Name,
        Color
        FROM [SalesLT].[Product]
        WHERE Color IS NOT NULL
        `;
    try {
      const [results] = await this.client.query(query);
      console.log("queryF results:", results);
      return results;
    } catch (err) {
      console.error("Error in queryF:", err);
      throw err;
    }
  }

  async queryH() {
    const query = `
        SELECT
        p.Name,
        sod.UnitPrice,
        sod.OrderQty,
        sod.LineTotal
        FROM [SalesLT].[SalesOrderDetail] AS sod
        JOIN [SalesLT].[Product] AS p
        ON sod.ProductID = p.ProductID;
    `;

    try {
      const [results] = await this.client.query(query);
      console.log("queryF results:", results);
      return results;
    } catch (err) {
      console.error("Error in queryF:", err);
      throw err;
    }
  }
};
