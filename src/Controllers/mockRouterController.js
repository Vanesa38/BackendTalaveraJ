import {faker} from "@faker-js/faker"


faker.locale="es"

export const createNewProduct = () =>{
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.alphaNumeric,
        price:faker.random.numeric(),
        stock:faker.random.numeric(),
        category: faker.commerce.productAdjective(),
    }
}

export const createMockProducts =  (req, res) => {

    try{
        let numberOfProducts = 100

        let fakeProducts = []

        for (let i = 0; i<numberOfProducts; i++){
        const product = createNewProduct()
        fakeProducts.push(product)

        }

        res.status(200).send(fakeProducts)

    
    } catch (error){
        res.status(404).send(error)

    }

}

