const fs = require('fs');

const data = fs.readFileSync("./Data/productos.json", "utf-8");

class Datos {

    constructor(archivo) {
        this.archivo = archivo
    }

    async save(producto) {
        try {
            const data = await fs.promises.readFile(`${this.archivo}/productos.json`, `utf-8`)
            const productos = JSON.parse(data);
            const id = productos.length + 1;
            producto.id = id;
            productos.push(producto);
            const productosString = JSON.stringify(productos);
            await fs.promises.writeFile(`${this.archivo}/productos.json`, productosString)
            return "Se agrego comida su id es "+producto.id

        } catch (error) {
            return "no se pudo leer el archvo"

        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(`${this.archivo}/productos.json`, "utf-8")
            const productos = JSON.parse(data);
            const producto = productos.find((producto) => producto.id == id);

            return producto
        } catch (error){
            return "no se pudo leer el archivo"
        }


    }
    async deleteById(id) {
            

        try {
            const data = await fs.promises.readFile(`${this.archivo}/productos.json`, "utf-8")
            const productos = JSON.parse(data);
            const arrayBorrado = productos.filter((item) => item.id !== id)
            const verricar = productos.find((item) => item.id===id);
            if(verricar) {
                await fs.promises.writeFile(`${this.archivo}/productos.json`, JSON.stringify(arrayBorrado))
                return "se borro el archivo correctamente"
            }else{
                return "no se encontro el archivo"
            }
            // await fs.promises.writeFile(`${this.archivo}/productos.json`, JSON.stringify(arrayBorrado))
            // return "se borro el archivo"

        } catch (error){
            return "error el leer el archivo borrado por id"
        }

    }
    async getAll() {
        try {
            const data = await fs.promises.readFile(`${this.archivo}/productos.json`, "utf-8")
            const datos = JSON.parse(data)
            return datos

        } catch (error){
            return "error al leer el archivo"
        }


    }
    async deleteAll() {
        try {
            //creo q se refiere a esto no?
            // fs.unlinkSync(`${this.archivo}/productos.json`, "utf-8")
            fs.promises.writeFile(`${this.archivo}/productos.json`,JSON.stringify([]))

            console.log('se borro la lista')
        } catch (err) {
            console.error("ocurrio un error", err)
        }

    }


}
async function start() {
    const db = new Datos("Data");

    console.log(await db.save({
        "title": "tacos",
        "precio": 10
       }))
    console.log(await db.getAll())
    //console.log(await db. para ver probar las diferentes funciones)

}
start();
