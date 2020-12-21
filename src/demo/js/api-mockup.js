function demoCloneOverJson(obj) {
    return JSON.parse(JSON.stringify(obj));
}

let demoMockupBasket = [
    {
        id: 10,
        name: 'Гумки багажні, 450-600-900 мм, 3 шт.// SPARTA',
        url: '/product/gumky-bagazhni-450-600-900-mm-3-sht-sparta/',
        sku: '543345',
        images: [
            '/demo_images/img-1_2.png'
        ],
        price: 33.01,
        available: true,
        stock: 15,
        basket_quantity: 1
    },
    {
        id: 12,
        name: 'Павук багажний гумовий, 8 гаків// SPARTA',
        url: '/product/pavuk-bagazhnyy-gumovyy-8-gakiv-sparta/',
        sku: '543305',
        images: [
            '/demo_images/img-2_1.jpg',
            '/demo_images/img-2_2.jpg'
        ],
        price: 43.34,
        available: true,
        stock: 35,
        basket_quantity: 2
    },
    {
        id: 13,
        name: 'Гумки багажні посилені 2 шт, 1000 мм// STELS',
        url: '/product/gumky-bagazhni-posyleni-2-sht-1000-mm-stels/',
        sku: '54361',
        images: [
            '/demo_images/img-3_1.jpg',
            '/demo_images/img-3_2.jpg'
        ],
        price: 53.51,
        available: true,
        stock: 14,
        basket_quantity: 3
    },
    {
        id: 14,
        name: 'Павук багажний посилений, 8 гаків // STELS',
        url: '/product/pavuk-bagazhnyy-posylenyy-8-gakiv-stels/',
        sku: '54364',
        images: [
            '/demo_images/img-4_1.jpg',
            '/demo_images/img-4_2.jpg'
        ],
        price: 13.8,
        available: true,
        stock: 7,
        basket_quantity: 8
    },
    {
        id: 15,
        name: 'Домкрат гідравлічний підкатний, 3 т, h підйому 130-410 мм, поворотна ручка// MTX',
        url: '/product/domkrat-gidravlichnyy-pidkatnyy-3-t-h-pidyomu-130-410-mm-povorotna-ruchka-mtx/',
        sku: '5103459',
        images: [
            '/demo_images/img-5_1.jpg',
            '/demo_images/img-5_2.jpg'
        ],
        price: 3.12,
        available: true,
        stock: 55,
        basket_quantity: 2
    }
];

let demoProfile = {
    'company': 'Компания «Инструменты Будущего»',
    'contact': 'Константин Дзю',
    'personType': 2,
    'personTypePrint': 'Юридическое лицо',
    'phone': '+7 (910) 872-92-89',
    'code': 'RO7434924042',
    'email': 'konstantynopolsky@gmail.com',
    'address': 'Название адреса'
};

function demoSetBasketQuantity(productId, quantity) {
    let found = false;

    if (quantity === 0) {
        demoMockupBasket = demoMockupBasket.filter(item => {
            return item.id != productId;
        });
    } else {
        demoMockupBasket.every(function (item, index) {
            if (item.id == productId) {
                demoMockupBasket[index].basket_quantity = quantity;
                found = true;
                return false;
            }
            return true;
        });

        if (!found) {
            demoMockupBasket.push({
                id: productId,
                name: 'Product #' + productId,
                url: '/path/to/product-' + productId,
                sku: '800000' + productId,
                images: [
                    '/path/to/image_1-1.png',
                    '/path/to/image_1-2.png'
                ],
                price: 22.08,
                available: true,
                stock: 80,
                basket_quantity: quantity,
            });
        }
    }
}

window.runAction = function (action, config) {
    //console.log('runAction call from mockup');
    //debugger;
    if(config) {
        config = demoCloneOverJson(config);
    }

    console.warn('API CALL ' + action);
    console.log(config);

    return new Promise((resolve, reject) => {
        //debugger;
        switch (action) {
            case 'instrum:main.api.basket.get':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoCloneOverJson(demoMockupBasket)
                        }
                    }
                });
                break;
            case 'instrum:main.api.basket.update':

                if (!config.data || !config.data.id) {
                    reject(new Error('Wrong config'));
                }
                demoSetBasketQuantity(config.data.id, config.data.quantity);
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoCloneOverJson(demoMockupBasket)
                        }
                    }
                });
                break;
            case 'instrum:main.api.user.base.get':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoProfile
                        }
                    }
                });
                break;    
            case 'instrum:main.api.user.get': //TODO not used yet
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: {
                                /*
                                base: {
                                    fullname: 'Gregory Luton',
                                    avatar: {
                                        full: '/demo_images/profile.jpg',
                                        "50": '/demo_images/profile.jpg',
                                    },
                                    company: {
                                        name: 'Acme LLS',
                                        address: 'Unused address field'
                                    },
                                    phone: 'Unused phone field',
                                    email: 'Unused email field'
                                },
                                orders: {
                                    active: 89,
                                    delivered: 11,
                                    canceled: 8
                                },
                                person: {
                                    id: -100,
                                    first_name: 'Unused',
                                    last_name: 'Unused',
                                    email: 'unused@unused',
                                    phone: '123unused',
                                    default: true,
                                    user_id: 123545
                                },
                                addresses: demoAddressList,
                                contract: {
                                    id: 12354321,
                                    date: 1603092502,
                                    url: '/path/to/contract',
                                },
                                dept: {
                                    value: 8000,
                                    max: 11000,
                                },
                                pricing: {
                                    value: 2,
                                    max: 4,
                                }
                                */
                            }
                        }
                    }
                });
                break;
        }
    });    
};
