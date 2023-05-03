import {faker} from "@faker-js/faker"

faker.locale="es"

export const createMockProducts = () => {
    let numberOfProducts = 100

    let fakeProducts = []

    for (let i = 0; i<numberOfProducts; i++){
        const product = createNewProduct()
        fakeProducts.push(product)
    }

    res.send(fakeProducts)
    
}

export const createNewProduct = () =>{
    return {
        title: faker.name.title(),
        description: faker.lorem.lines(),
        code: faker.random.alphaNumeric(),
        price:faker.random.numeric(),
        stock:faker.random.numeric(1),
        status: faker.datatype.boolean(),
    }
}