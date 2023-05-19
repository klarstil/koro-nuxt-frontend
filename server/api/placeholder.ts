import { faker } from '@faker-js/faker';

const delay = (timeout = 2000) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

export default defineEventHandler(async(event) => {
    const query = getQuery(event);
    let limit = 12;
    let timeout = 2000;

    if (query.limit) {
        limit = parseInt(query.limit as string);
    }

    if (query.delay) {
        timeout = parseInt(query.delay as string);
    }

    await delay(timeout);

    return {
        success: true,
        total: limit,
        page: 1,
        items: [...Array(limit)].map(() => {
            const productName = faker.commerce.productName();
            return {
                id: faker.string.uuid(),
                versionId: faker.string.uuid(),
                active: true,
                availableStock: faker.number.int({
                    min: 1,
                    max: 1200,
                }),
                ean: faker.string.alphanumeric(24),
                parentId: null,
                parentVersionId: faker.string.uuid(),
                name: productName,
                shortDescription: faker.commerce.productDescription(),
                description: faker.lorem.paragraphs(4),
                price: faker.commerce.price(),
                manufacturer: faker.commerce.department(),
                category: faker.commerce.department(),
                productImages: [...Array(5)].map(() => {
                    return {
                        name: `${productName} Image`,
                        fileName: faker.system.commonFileName('jpg'),
                        size: {
                            width: 640,
                            height: 480,
                        },
                    };
                }),
                reviews: [...Array(42)].map(() => {
                    return {
                        id: faker.string.uuid(),
                        versionId: faker.string.uuid(),
                        author: {
                            fullName: faker.person.fullName(),
                            firstName: faker.person.firstName(),
                            lastName: faker.person.lastName(),
                            email: faker.internet.email(),
                        },
                        title: faker.lorem.words({
                            min: 3,
                            max: 5,
                        }),
                        description: faker.lorem.paragraphs(3),
                    };
                }),
            };
        }),
    };
});
