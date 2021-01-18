function demoCloneOverJson(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function demoBase64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

let demoMockupBasket = [
    {
        id: 10,
        name: 'Гумки багажні, 450-600-900 мм, 3 шт.// SPARTA',
        url: '/product/gumky-bagazhni-450-600-900-mm-3-sht-sparta/',
        sku: '543345',
        images: [
            '/demo_images/product/image_51.png'
        ],
        price: 33.01,
        discount: 10,
        allPrice: '910',
        totalPrice: '810',
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
            '/demo_images/product/image_51.png',
            '/demo_images/product/image_52.png'
        ],
        price: 43.34,
        allPrice: '9170',
        totalPrice: '810',
        discount: 10,
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
            '/demo_images/product/image_51.png',
            '/demo_images/product/image_52.png'
        ],
        price: 53.51,
        allPrice: '9170',
        totalPrice: '810',
        available: false,
        stock: 14,
        basket_quantity: 3
    },
    {
        id: 14,
        name: 'Павук багажний посилений, 8 гаків // STELS',
        url: '/product/pavuk-bagazhnyy-posylenyy-8-gakiv-stels/',
        sku: '54364',
        images: [
            '/demo_images/product/image_51.png',
            '/demo_images/product/image_52.png'
        ],
        price: 13.8,
        allPrice: '9170',
        totalPrice: '810',
        available: false,
        stock: 7,
        basket_quantity: 8
    },
    {
        id: 15,
        name: 'Домкрат гідравлічний підкатний, 3 т, h підйому 130-410 мм, поворотна ручка// MTX',
        url: '/product/domkrat-gidravlichnyy-pidkatnyy-3-t-h-pidyomu-130-410-mm-povorotna-ruchka-mtx/',
        sku: '5103459',
        images: [
            '/demo_images/product/image_51.png',
            '/demo_images/product/image_52.png'
        ],
        price: 3.12,
        allPrice: '9170',
        totalPrice: '810',
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

let demoOrders = [];
//let baseOrderDate = new Date('2020-02-14');
for(let i = 0; i < 5; ++i) {
    /*let newOrderDate = new Date(baseOrderDate.valueOf());
    newOrderDate.setDate(newOrderDate.getDate() + i);
    newOrderDate = Math.round(newOrderDate.getTime()/1000);*/

    let newOrdeStatus = ['Выполнен', 'В процессе', 'Отменен'].sort(function (a, b) {
        return 0.5 - Math.random()
    }).pop();

    demoOrders.push({
        id: i+1,
        number: 3254+i,
        date: '31.12.2020',
        status: newOrdeStatus,
        paid: Math.random() > 0.5,
        count: Math.floor(99 * Math.random()),//оставить одно
        qty: getRandomInt(2,8),
        discount: '10',
        economy: '1 000',
        price: '1 001 819',
        priceTotal: '1 000 819',
        
        documents:
            [
                {label: 'Документы', value: 'documents'},
                {label: 'Загрузить еще что-нибудь', value: 'something'},
                {label: 'Загрузить счет-фактуру', value: 'check'}
            ],
        currentDocument:
            {label: 'Документы', value: 'documents'},
        
        address: 'Москва, Трехгорный Вал 3, ст. 26',
        client: 'Константин Константинопольский konstantynopolsky@gmail.com +7 (910) 872-92-89',
        payment: 'Оплата онлайн по карте',
    });
}

let checkData = [];
for(let i = 0; i < 6; ++i) {

    let operation = ['Пополнение баланса', 'Оплата заказа'].sort(function (a, b) {
        return 0.5 - Math.random()
    }).pop();

    let operationCode = ['23064560-0006', '23064560-0007'].sort(function (a, b) {
        return 0.5 - Math.random()
    }).pop();

    let status = [true, false].sort(function (a, b) {
        return 0.5 - Math.random()
    }).pop();
    
    checkData.push({
        id: i+1,
        'sum': '1000000',
        'date': '23.12.2020',
        'time': '24:10',
        'operation': operation,
        'operationNumber': 3895347+i,
        'code': operationCode,
        'order': 325214+i,
        'status': status
    });
}

let demoAddressList = [
    {
        'id': 12828,
        'order': '1',
        'address': '1062 Budapest, V1 Bajzautca, 35 1062 Budapest, V1 Bajzautca, 35 1062 Budapest, V1 Bajzautca, 35 Bajzautca',
        'status': 'сonfirmed',
        'statusPrint': 'Подтверждён',
        'statusDesc': '',
    },
    {
        'id': 12829,
        'order': '2',
        'address': 'II., FrankelLeóút 22 1062 Budapest, V1 Bajzautca, 351062 Budapest, V1 Bajzautca, 35',
        'status': 'submitted',
        'statusPrint': 'Отправлен на подтверждение',
        'statusDesc': 'В данный момент адрес проходит проверку модератора. Следить за статусом адреса вы можете тут',
    },
    {
        'id': 12830,
        'order': '3',
        'address': 'XXI., Áruháztér 8',
        'status': 'not-сonfirmed',
        'statusPrint': 'Не подтвержден',
        'statusDesc': 'К сожалению, адрес не прошел проверку модератора. Подробнее по горячей линии: 8 800-765-87-51',
    }
];

let demoListingResult= `
    <div>
        больше контента и новая пагинация
    </div>
    `;

//console.log(demoOrders);

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
            case 'instrum:main.api.user.address.get':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoCloneOverJson(demoAddressList)
                        }
                    }
                });
                break;    
            case 'instrum:main.api.user.checks.list':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: {
                                checkData: checkData,
                                pagination: {
                                    current: 1,
                                    total: 5
                                }
                            },
                        }
                    }
                });
                break;
            case 'instrum:main.api.user.order.list':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: {
                                orders: demoOrders,
                                pagination: {
                                    current: 1,
                                    total: 5
                                }
                            },
                        }
                    }
                });
                break;
            case 'instrum:main.api.user.order.get':
                //debugger;
                if (!config.data || !config.data.id) {
                    reject(new Error('Wrong config'));
                }

                let foundOrder = demoOrders.find(item => item.id == config.data.id);

                if(!foundOrder) {
                    resolve({
                        data: {
                            data: {
                                status: 0,
                                errors: [
                                    {
                                        code: 'not_found',
                                        message: 'Order with such ID not found'
                                    }
                                ]
                            }
                        }
                    });
                    break;
                }

                let returnOrder = {
                    
                    id: foundOrder.id,
                    number: foundOrder.number,
                    date: foundOrder.date,
                    address: foundOrder.address,
                    status: foundOrder.status,
                    client: foundOrder.client,
                    paid: foundOrder.paid,
                    discount: foundOrder.discount,
                    economy: foundOrder.economy,
                    count: foundOrder.count,
                    payment: foundOrder.payment,
                    price: foundOrder.price,
                    priceTotal: foundOrder.priceTotal,
                    qty: foundOrder.qty,
                    documents: foundOrder.documents,
                    currentDocument: foundOrder.currentDocument,
                    /*prices: {
                        base: foundOrder.prices.base,
                        tax: 0.2 * foundOrder.prices.base,
                        delivery: 0
                    },
                    payment: {
                        id: 113,
                        name: 'NayPay'
                    },*/
                    basket: demoMockupBasket,
                };

                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: returnOrder
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
            case 'instrum:main.api.listing.get':

                resolve({
                    data: {
                        data: {
                            answer: {
                                content: demoListingResult /*demoBase64EncodeUnicode()*/,
                                //получаем больше контента, приходит новая пагинация. Сортировка, сетка и фильтры сохраняются
                                url: '',
                            },
                            status: 1,
                        }
                    }
                });
                break;

            case 'instrum:main.api.sortListing.get':

                resolve({
                    data: {
                        data: {
                            answer: {
                                url: '/i/have/filtered/listing',
                                output: 'отсортированный листинг' 
                                //получить новый листинг и пагинацию. Фильтры и сетка сохраняются
                            },
                            status: 1,
                        }
                    }
                });
                break;
        }
    });    
};
