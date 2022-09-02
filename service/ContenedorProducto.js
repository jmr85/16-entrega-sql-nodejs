const fs = require('fs');

class ContenedorProducto {
    constructor(fileName) {
        this.fileName = fileName;
    }
    async save(nombre, precio, foto) {
        let obj = { nombre, precio, foto };
        try {
            let dataArch = await fs.promises.readFile(this.fileName, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if (dataArchParse.length) {
                await fs.promises.writeFile(this.fileName, JSON.stringify([...dataArchParse, { ...obj, id: dataArchParse[dataArchParse.length - 1].id + 1 }], null, 2))
            } else {
                await fs.promises.writeFile(this.fileName, JSON.stringify([{ ...obj, id: 1 }], null, 2))
            }
            console.log(`El archivo tiene el id: ${dataArchParse[dataArchParse.length - 1].id + 1}`)
        } catch (error) {
            console.log("error -> ", error)
        }
    }
    async getAll() {
        let contenido = []
        try {
            contenido = await fs.promises.readFile(this.fileName, 'utf8')
            contenido = JSON.parse(contenido)
        } catch (error) {
            console.log("Error: ", contenido, error);
            throw error
        }
        return contenido;
    }

    async getById(id) {
        let contenido = []
        try {
            contenido = await fs.promises.readFile(this.fileName, 'utf8')
            const contendoID = JSON.parse(contenido);
            const found = contendoID.find(element => element.id === id);
            contenido = found ? found : null;
        } catch (error) {
            console.log(error);
            throw error
        }
        return contenido;
    }

    async updateById(id, nombre, precio, foto){
        try {
            let dataArch = await fs.promises.readFile(this.fileName, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let producto = dataArchParse.find(prod => prod.id === id)// solo para validar
            if (producto !== undefined || producto !== null) {
               
                const dataArchParseFiltrado = dataArchParse.map(element => {
                    if (element.id === id) {
                        element.nombre = nombre;
                        element.precio = precio;
                        element.foto = foto;
                        return element;                    
                    }else{
                        return element;
                    }
                })
                await fs.promises.writeFile(this.fileName, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf-8')
                
                console.log('ContenedorProducto log: ', 'Producto actualizado')
            } else {
                console.log('ContenedorProducto log: ', 'no existe el producto')
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        try {
            let dataArch = await fs.promises.readFile(this.fileName, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let producto = dataArchParse.find(prod => prod.id === id)
            if (producto !== undefined || producto !== null) {
                const dataArchParseFiltrado = dataArchParse.filter(prod => prod.id !== id)
                await fs.promises.writeFile(this.fileName, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf-8')
                console.log('Producto eliminado')
            } else {
                console.log('no existe el producto')
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            await promises.unlink(this.fileName, 'utf8')
            console.log('Todos los productos eliminados')
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ContenedorProducto;