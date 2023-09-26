import { faker } from '@faker-js/faker';

export function generateProduct() {
    const product = {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        category: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.url(),
        code: faker.finance.accountNumber(3),
        stock: faker.string.numeric(2),
    }
    return product;
}