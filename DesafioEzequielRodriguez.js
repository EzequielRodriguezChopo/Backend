const { log } = require("console");
const fs = require("fs");

class ProductManager {
   constructor() {
      this.products = [];
      this.path = "./products.txt";
      this.format = "utf-8";
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
   addProduct = async (title, description, price, thumbnail, code, stock) => {
      this.products = await this.getProducts(); //Leo el archivo
      const product = {
         title,
         description,
         price,
         thumbnail,
         code,
         stock,
      };
      const validationFieldResult = this.validationOfField(product); //Valido que no falte campos
      if (validationFieldResult) {
         console.log("Falta un campo")
         return;
      }
      const validationOfCode = this.validationOfCode(product.code);
      if (validationOfCode) {
         // Valido el codigo, que no se repita
         console.log("Codigo repetido!");
         return;
      }
      const newId = this.products.length + 1;
      product.id = newId; // Asigno un id autoincrementable al nuevo producto
      this.products.push(product); //Pusheo el nuevo producto al array de objetos this.products
      fs.promises.writeFile(this.path, JSON.stringify(this.products)); //Escrivo el archivo
   };
   getProducts = async () => {
      if (!fs.existsSync(this.path)) return [];
      return fs.promises
         .readFile(this.path, this.format)
         .then((productsDB) => JSON.parse(productsDB))
         .catch((err) => {
            console.log("ERROR ", err);
            return [];
         });
   };
   getById = async (idToFind) => {
      this.products = await this.getProducts();
      const productFinded = this.products.find((x) => {
         return x.id == idToFind;
      });
      if (productFinded) console.log(`Producto encontrado: `, productFinded);
      else console.log("Not Found");
   };
   updateProduct = async (idProd, title, description, price, thumbnail, code, stock) => {
      this.products = await this.getProducts(); //Leo el archivo
      //Creo el formato del objeto
      const product = {
         title,
         description,
         price,
         thumbnail,
         code,
         stock,
      };
      //busco el producto a modificar
      const searchedId = this.products.find((x) => {
         return x.id == idProd;
      });
      const index = this.products.indexOf(searchedId); //busco el id del producto a modificar
      product.id = searchedId.id; // le ponogo el id del producto a modificar a mi nuevo producto
      this.products[index] = product; //reemplazo en el array de objetos por el nuevo producto modificado
      fs.promises.writeFile(this.path, JSON.stringify(this.products));
   };
}
const run = async () => {
   const products = new ProductManager();
   await products.addProduct("Lapicera", "Hecha de madera y carbon", 500, "url1", "AR1001", 27);
   await products.addProduct("Lapiz", "Hecha de Hierro", 250, "url2", "AR1008", 17);
   await products.addProduct("Regla", "Hecha de plastico", 115, "url3", "AR1004", 50);
   //console.log(await products.getProducts());
   //await products.getById(2);
   //await products.getById(1);
   //await products.getById(4);
   //await products.updateProduct(3, "Tijera", "Hecha de metal", 120, "url4", "AR1009", 500);
   //await products.updateProduct(3, "Regla", "Hecha de plastico", 115, "url3", "AR1004", 50);
};
run();
