class ProductManager {
   constructor() {
      this.products = [];
   }

   validationOfField = (product) => {
      const values = Object.values(product); //Obtengo solo los valores del Objeto producto
      const comprobation = values.includes(undefined); // Me tira True o False si hay u undefined
      return comprobation;
   };
   validationOfCode = (newCode) => {
      const codes = this.products.some((x) => x.code == newCode); //Si encuentra alguno que cumpla devuelve true
      return codes;
   };
   incrementalId = () => {
      const newId = this.products.length + 1;
      return newId;
   };
   addProduct = (title, description, price, thumbnail, code, stock) => {
      const product = {
         title,
         description,
         price,
         thumbnail,
         code,
         stock,
      };
      const validationFieldResult = this.validationOfField(product); //Valido los campos
      if (validationFieldResult) {
         console.log("Falta un campo");
         return;
      }
      const validationOfCode = this.validationOfCode(product.code);
      if (validationOfCode) {
         console.log("Codigo repetido");
         return;
      }
      const newId = this.incrementalId();
      product.id = newId;
      this.products.push(product);
   };
   getProducts = () => {
      return this.products;
   };
   getById = (idToFind) => {
      const productFinded = this.products.find((x) => {
         return x.id == idToFind;
      });
      if (productFinded) console.log(`Producto encontrado: `, productFinded);
      else console.log("Not Found");
   };
}

const products = new ProductManager();
products.addProduct("Lapicera", "Hecha de madera y carbon", 500, "url1", "AR1001", 27);
products.addProduct("Lapiz", "Hecha de Hierro", 250, "url2", "AR1003", 17);
products.addProduct("Regla", "Hecha de plastico", 115, "url3", "AR1004", 50);
console.log(products.getProducts());
products.getById(2);
products.getById(1);
products.getById(4);
