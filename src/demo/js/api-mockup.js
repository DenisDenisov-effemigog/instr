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
        id: 1010,
        name: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        url: '/product/gumky-bagazhni-450-600-900-mm-3-sht-sparta/',
        sku: 12345,
        images: [
            {id: 1, img: './demo_images/product/image_50.png'},
            {id: 2, img: './demo_images/product/image_51.png'},
            {id: 3, img: './demo_images/product/image_52.png'},
            {id: 4, img: './demo_images/product/image_53.png'},
        ],
        price: 2819,
        discount: 26,
        allPrice: 3819,
        totalPrice: 2819,
        available: true,
        stock: 15,
        basket_quantity: 1,
        basket_extra_quantity: 0,
        tooltips: [
            {
                id: 1,
                title: 'Новинка',
                text: 'Товар находится в акционной категории товаров “Новинка”',
                link: '',
                status: 'new',
            },
            {
                id: 2,
                title: 'Акция',
                text: 'Товар участвует в акции “Акция”',
                link: '',
                status: 'promo',
            },
        ]
    },
    {
        id: 101010,
        name: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        url: '/product/gumky-bagazhni-450-600-900-mm-3-sht-sparta/',
        sku: 34567,
        images: [
            {id: 1, img: './demo_images/product/image_50.png'},
            {id: 2, img: './demo_images/product/image_51.png'},
            {id: 3, img: './demo_images/product/image_52.png'},
            {id: 4, img: './demo_images/product/image_53.png'},
        ],
        price: 19,
        discount: 26,
        allPrice: 3819,
        totalPrice: 2819,
        available: true,
        stock: 15,
        basket_quantity: 4,
        basket_extra_quantity: 0,
        tooltips: [
            {
                id: 1,
                title: 'Новинка',
                text: 'Товар находится в акционной категории товаров “Новинка”',
                link: '',
                status: 'new',
            },
            {
                id: 2,
                title: 'Акция',
                text: 'Товар участвует в акции “Акция”',
                link: '',
                status: 'promo',
            },
        ]
    },
    {
        id: 1012220,
        name: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        url: '/product/gumky-bagazhni-450-600-900-mm-3-sht-sparta/',
        sku: 11111,
        images: [
            {id: 1, img: './demo_images/product/image_50.png'},
            {id: 2, img: './demo_images/product/image_51.png'},
            {id: 3, img: './demo_images/product/image_52.png'},
            {id: 4, img: './demo_images/product/image_53.png'},
        ],
        price: 19,
        discount: 26,
        allPrice: 3819,
        totalPrice: 2819,
        available: true,
        stock: 15,
        basket_quantity: 15,
        basket_extra_quantity: 0,
        tooltips: [
            {
                id: 1,
                title: 'Новинка',
                text: 'Товар находится в акционной категории товаров “Новинка”',
                link: '',
                status: 'new',
            },
            {
                id: 2,
                title: 'Акция',
                text: 'Товар участвует в акции “Акция”',
                link: '',
                status: 'promo',
            },
        ]
    },
    {
        id: 101010101010,
        name: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        url: '/product/gumky-bagazhni-450-600-900-mm-3-sht-sparta/',
        sku: 2345,
        images: [
            {id: 1, img: './demo_images/product/image_50.png'},
            {id: 2, img: './demo_images/product/image_51.png'},
            {id: 3, img: './demo_images/product/image_52.png'},
            {id: 4, img: './demo_images/product/image_53.png'},
        ],
        price: 19,
        discount: 26,
        allPrice: 3819,
        totalPrice: 2819,
        available: false,
        stock: 15,
        basket_quantity: 4,
        basket_extra_quantity: 0,
        tooltips: [
            {
                id: 1,
                title: 'Новинка',
                text: 'Товар находится в акционной категории товаров “Новинка”',
                link: '',
                status: 'new',
            },
            {
                id: 2,
                title: 'Акция',
                text: 'Товар участвует в акции “Акция”',
                link: '',
                status: 'promo',
            },
        ]
    },
];

let demoMockupBasketOld = [
    {
        id: 151010,
        name: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        url: '/product/gumky-bagazhni-450-600-900-mm-3-sht-sparta/',
        sku: 123455,
        images: [
            {id: 1, img: './demo_images/product/image_50.png'},
            {id: 2, img: './demo_images/product/image_51.png'},
            {id: 3, img: './demo_images/product/image_52.png'},
            {id: 4, img: './demo_images/product/image_53.png'},
        ],
        price: 2819,
        discount: 26,
        allPrice: 3819,
        totalPrice: 2819,
        available: true,
        stock: 55,
        basket_quantity: 5,
        basket_extra_quantity: 0,
        tooltips: [
            {
                id: 1,
                title: 'Новинка',
                text: 'Товар находится в акционной категории товаров “Новинка”',
                link: '',
                status: 'new',
            },
            {
                id: 2,
                title: 'Акция',
                text: 'Товар участвует в акции “Акция”',
                link: '',
                status: 'promo',
            },
        ]
    },
    {
        id: 15101010,
        name: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        url: '/product/gumky-bagazhni-450-600-900-mm-3-sht-sparta/',
        sku: 34567,
        images: [
            {id: 1, img: './demo_images/product/image_50.png'},
            {id: 2, img: './demo_images/product/image_51.png'},
            {id: 3, img: './demo_images/product/image_52.png'},
            {id: 4, img: './demo_images/product/image_53.png'},
        ],
        price: 19,
        discount: 26,
        allPrice: 3819,
        totalPrice: 2819,
        available: true,
        stock: 15,
        basket_quantity: 4,
        basket_extra_quantity: 0,
        tooltips: [
            {
                id: 1,
                title: 'Новинка',
                text: 'Товар находится в акционной категории товаров “Новинка”',
                link: '',
                status: 'new',
            },
            {
                id: 2,
                title: 'Акция',
                text: 'Товар участвует в акции “Акция”',
                link: '',
                status: 'promo',
            },
        ]
    },
    {
        id: 151012220,
        name: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        url: '/product/gumky-bagazhni-450-600-900-mm-3-sht-sparta/',
        sku: 11111,
        images: [
            {id: 1, img: './demo_images/product/image_50.png'},
            {id: 2, img: './demo_images/product/image_51.png'},
            {id: 3, img: './demo_images/product/image_52.png'},
            {id: 4, img: './demo_images/product/image_53.png'},
        ],
        price: 19,
        discount: 26,
        allPrice: 3819,
        totalPrice: 2819,
        available: true,
        stock: 15,
        basket_quantity: 15,
        basket_extra_quantity: 0,
        tooltips: [
            {
                id: 1,
                title: 'Новинка',
                text: 'Товар находится в акционной категории товаров “Новинка”',
                link: '',
                status: 'new',
            },
            {
                id: 2,
                title: 'Акция',
                text: 'Товар участвует в акции “Акция”',
                link: '',
                status: 'promo',
            },
        ]
    },
    {
        id: 15101010101010,
        name: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        url: '/product/gumky-bagazhni-450-600-900-mm-3-sht-sparta/',
        sku: 23455,
        images: [
            {id: 1, img: './demo_images/product/image_50.png'},
            {id: 2, img: './demo_images/product/image_51.png'},
            {id: 3, img: './demo_images/product/image_52.png'},
            {id: 4, img: './demo_images/product/image_53.png'},
        ],
        price: 19,
        discount: 26,
        allPrice: 3819,
        totalPrice: 2819,
        available: false,
        stock: 15,
        basket_quantity: 4,
        basket_extra_quantity: 0,
        tooltips: [
            {
                id: 1,
                title: 'Новинка',
                text: 'Товар находится в акционной категории товаров “Новинка”',
                link: '',
                status: 'new',
            },
            {
                id: 2,
                title: 'Акция',
                text: 'Товар участвует в акции “Акция”',
                link: '',
                status: 'promo',
            },
        ]
    },
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

let demoListingResult= {
    products: [
        {
            'id': 1,
            'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
            'link': '',
            'code': 717950,
            'available': true,
            'stock': 100,
            'oldPrice': '3 819',
            'newPrice': '2 819',
            'images': [
                {id: 1, img: './demo_images/product/image_50.png'},
                {id: 2, img: './demo_images/product/image_51.png'},
                {id: 3, img: './demo_images/product/image_52.png'},
                {id: 4, img: './demo_images/product/image_53.png'},
            ],
            'tooltips': [
                {
                    'id': 1,
                    'title': 'Новинка',
                    'text': 'Товар находится в акционной категории товаров “Новинка”',
                    'link': '',
                    'status': 'new',
                },
                {
                    'id': 2,
                    'title': 'Акция',
                    'text': 'Товар участвует в акции “Акция”',
                    'link': '',
                    'status': 'promo',
                },
            ]
        },
        {
            'id': 2,
            'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
            'link': '',
            'code': 717950,
            'available': true,
            'stock': 100,
            'oldPrice': '3 819',
            'newPrice': '2 819',
            'images': [
                {id: 1, img: './demo_images/product/image_50.png'},
                {id: 2, img: './demo_images/product/image_51.png'},
                {id: 3, img: './demo_images/product/image_52.png'},
                {id: 4, img: './demo_images/product/image_53.png'},
            ],
            'tooltips': [
                {
                    'id': 1,
                    'title': 'Новинка',
                    'text': 'Товар находится в акционной категории товаров “Новинка”',
                    'link': '',
                    'status': 'new',
                },
                {
                    'id': 2,
                    'title': 'Акция',
                    'text': 'Товар участвует в акции “Акция”',
                    'link': '',
                    'status': 'promo',
                },
            ]
        },
    ],
    pagination: {
        'total': 93,
        'current': 5,
        'url_previous': '/some/category/page/4',
        'url_next': '/some/category/page/6',
        'url_last': '/some/category/page/last',
        'urls':
            [
                {title: '5', url: '/some/category/page/5'},
                {title: '6', url: '/some/category/page/6'},
                {title: '7', url: '/some/category/page/7'},
                {title: '8', url: '/some/category/page/8'},
            ]
    }
};

let demoSortingListing = {
    products: [
        {
            'id': 1,
            'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
            'link': '',
            'code': 717950,
            'available': true,
            'stock': 100,
            'oldPrice': '3 819',
            'newPrice': '2 819',
            'images': [
                {id: 1, img: './demo_images/product/image_50.png'},
                {id: 2, img: './demo_images/product/image_51.png'},
                {id: 3, img: './demo_images/product/image_52.png'},
                {id: 4, img: './demo_images/product/image_53.png'},
            ],
            'tooltips': [
                {
                    'id': 1,
                    'title': 'Новинка',
                    'text': 'Товар находится в акционной категории товаров “Новинка”',
                    'link': '',
                    'status': 'new',
                },
                {
                    'id': 2,
                    'title': 'Акция',
                    'text': 'Товар участвует в акции “Акция”',
                    'link': '',
                    'status': 'promo',
                },
            ]
        },
        {
            'id': 2,
            'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
            'link': '',
            'code': 717950,
            'available': true,
            'stock': 100,
            'oldPrice': '3 819',
            'newPrice': '2 819',
            'images': [
                {id: 1, img: './demo_images/product/image_50.png'},
                {id: 2, img: './demo_images/product/image_51.png'},
                {id: 3, img: './demo_images/product/image_52.png'},
                {id: 4, img: './demo_images/product/image_53.png'},
            ],
            'tooltips': [
                {
                    'id': 1,
                    'title': 'Новинка',
                    'text': 'Товар находится в акционной категории товаров “Новинка”',
                    'link': '',
                    'status': 'new',
                },
                {
                    'id': 2,
                    'title': 'Акция',
                    'text': 'Товар участвует в акции “Акция”',
                    'link': '',
                    'status': 'promo',
                },
            ]
        },
    ]
};

let demoFilteredListing = {
    products: [
        {
            'id': 1,
            'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
            'link': '',
            'code': 717950,
            'available': true,
            'stock': 100,
            'oldPrice': '3 819',
            'newPrice': '2 819',
            'images': [
                {id: 1, img: './demo_images/product/image_50.png'},
                {id: 2, img: './demo_images/product/image_51.png'},
                {id: 3, img: './demo_images/product/image_52.png'},
                {id: 4, img: './demo_images/product/image_53.png'},
            ],
            'tooltips': [
                {
                    'id': 1,
                    'title': 'Новинка',
                    'text': 'Товар находится в акционной категории товаров “Новинка”',
                    'link': '',
                    'status': 'new',
                },
                {
                    'id': 2,
                    'title': 'Акция',
                    'text': 'Товар участвует в акции “Акция”',
                    'link': '',
                    'status': 'promo',
                },
            ]
        },
    ],
    pagination: {}
};

let orderSuccessAnswer = {
    order: 4554465465,
    payment_form: demoBase64EncodeUnicode('<form action="https://integration.bitrix.info/app/authorize/v4/handler.php" method="POST"><input type="hidden" name="paymentid" value="507"><input type="hidden" name="paymentpay" value="68.12"><input type="hidden" name="currency" value="USD"><input type="hidden" name="memberid" value="a0acc530a106712468f1c0c57f628b19"><input type="hidden" name="BX_PAYSYSTEM_ID" value="9"><input name="button" value="Pay" type="submit"></form>')
};

let favorites = [
    {product_id: 1, is_favorite: false},
    {product_id: 2, is_favorite: false},
    {product_id: 3, is_favorite: false},
    {product_id: 4, is_favorite: false},
    {product_id: 5, is_favorite: false},
    {product_id: 6, is_favorite: false},
    {product_id: 11, is_favorite: false},
    {product_id: 12, is_favorite: false},
    {product_id: 13, is_favorite: false},
    {product_id: 14, is_favorite: false},
    {product_id: 15, is_favorite: false},
    {product_id: 16, is_favorite: false},
    {product_id: 17, is_favorite: false},
    {product_id: 18, is_favorite: false},
    {product_id: 110, is_favorite: false},
    {product_id: 33, is_favorite: false},
    {product_id: 41, is_favorite: false},
    {product_id: 31, is_favorite: false},
    {product_id: 32, is_favorite: false},
];

let compares = [
    {product_id: 1, is_compare: false},
    {product_id: 2, is_compare: false},
    {product_id: 3, is_compare: false},
    {product_id: 4, is_compare: false},
    {product_id: 5, is_compare: false},
    {product_id: 6, is_compare: false},
    {product_id: 11, is_compare: false},
    {product_id: 12, is_compare: false},
    {product_id: 13, is_compare: false},
    {product_id: 14, is_compare: false},
    {product_id: 15, is_compare: false},
    {product_id: 16, is_compare: false},
    {product_id: 17, is_compare: false},
    {product_id: 18, is_compare: false},
    {product_id: 110, is_compare: false},
    {product_id: 33, is_compare: false},
    {product_id: 41, is_compare: false},
    {product_id: 31, is_compare: false},
    {product_id: 32, is_compare: false},
];

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
            case 'instrument2:rest.api.basket.clear':
                demoMockupBasket = [];
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoCloneOverJson(demoMockupBasket)
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.basket.searchItem':
                let demoMockupItems = [
                    {

                        id: 1515,
                        name: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
                        url: '/product/gumky-bagazhni-450-600-900-mm-3-sht-sparta/',
                        sku: 12345,
                        images: [
                            {id: 1, img: './demo_images/product/image_50.png'},
                            {id: 2, img: './demo_images/product/image_51.png'},
                            {id: 3, img: './demo_images/product/image_52.png'},
                            {id: 4, img: './demo_images/product/image_53.png'},
                        ],
                        price: 2819,
                        discount: 26,
                        allPrice: 3819,
                        totalPrice: 2819,
                        available: false,
                        stock: 15,
                        basket_quantity: 1,
                        tooltips: [
                            {
                                id: 1,
                                title: 'Новинка',
                                text: 'Товар находится в акционной категории товаров “Новинка”',
                                link: '',
                                status: 'new',
                            },
                            {
                                id: 2,
                                title: 'Акция',
                                text: 'Товар участвует в акции “Акция”',
                                link: '',
                                status: 'promo',
                            },
                        ]
                    },
                    {

                        id: 15151515,
                        name: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
                        url: '/product/gumky-bagazhni-450-600-900-mm-3-sht-sparta/',
                        sku: 54321,
                        images: [
                            {id: 1, img: './demo_images/product/image_50.png'},
                            {id: 2, img: './demo_images/product/image_51.png'},
                            {id: 3, img: './demo_images/product/image_52.png'},
                            {id: 4, img: './demo_images/product/image_53.png'},
                        ],
                        price: 2819,
                        discount: 26,
                        allPrice: 3819,
                        totalPrice: 2819,
                        available: true,
                        stock: 15,
                        basket_quantity: 1,
                        tooltips: [
                            {
                                id: 1,
                                title: 'Новинка',
                                text: 'Товар находится в акционной категории товаров “Новинка”',
                                link: '',
                                status: 'new',
                            },
                            {
                                id: 2,
                                title: 'Акция',
                                text: 'Товар участвует в акции “Акция”',
                                link: '',
                                status: 'promo',
                            },
                        ]
                    },
                ];
                for (let i = 0; i < config.data.arr.length; i++) {
                    let demoMockupItem = demoMockupItems.find(item => item.sku === config.data.arr[i][0])
                    let quantity = config.data.arr[i][1]
                    
                    if(demoMockupItem !== undefined){
                        let demoMockupBasketItem = demoMockupBasket.find(item => item.sku === demoMockupItem.sku)
                        if(demoMockupBasketItem !== undefined && demoMockupBasketItem.sku === demoMockupItem.sku){
                           if(demoMockupBasketItem.basket_quantity <= demoMockupBasketItem.stock){
                               demoMockupBasketItem.basket_quantity = quantity + demoMockupBasketItem.basket_quantity
                               if(demoMockupBasketItem.basket_quantity >= demoMockupBasketItem.stock) {
                                   demoMockupBasketItem.basket_quantity = demoMockupBasketItem.stock
                               }
                           } else {
                               demoMockupBasketItem.basket_quantity = demoMockupBasketItem.stock
                           }
                        } else {
                            if (demoMockupItem.stock >= quantity){
                                demoMockupItem.basket_quantity = quantity
                            } else {
                                demoMockupItem.basket_quantity = demoMockupItem.stock
                            }
                            demoMockupBasket.push(demoMockupItem)
                        }
                    }
                }
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoMockupBasket
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.basket.combineCarts':
                for (let i = 0; i < config.data.arr.length; i++) {
                    let demoMockupItem = demoMockupBasketOld.find(item => item.sku === config.data.arr[i])
                    let quantity = demoMockupItem.basket_quantity
                    let demoMockupBasketItem = demoMockupBasket.find(item => item.sku === demoMockupItem.sku)
                    
                    
                    if(demoMockupBasketItem !== undefined && demoMockupBasketItem.sku === demoMockupItem.sku){
                        if(demoMockupBasketItem.basket_quantity <= demoMockupBasketItem.stock){
                            demoMockupBasketItem.basket_quantity = quantity + demoMockupBasketItem.basket_quantity
                            if(demoMockupBasketItem.basket_quantity >= demoMockupBasketItem.stock) {
                                demoMockupBasketItem.basket_quantity = demoMockupBasketItem.stock
                            }
                        } else {
                            demoMockupBasketItem.basket_quantity = demoMockupBasketItem.stock
                        }
                        demoMockupBasketItem.basket_extra_quantity = quantity
                    } else {
                        if (demoMockupItem.stock >= quantity){
                            demoMockupItem.basket_quantity = quantity
                        } else {
                            demoMockupItem.basket_quantity = demoMockupItem.stock
                        }
                        demoMockupItem.basket_extra_quantity = quantity
                        
                        demoMockupBasket.push(demoMockupItem)
                    }
                }
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoMockupBasket
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.basket.get':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoCloneOverJson(demoMockupBasket)
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.basket.get_old':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoCloneOverJson(demoMockupBasketOld)
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.basket.update':

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
            case 'instrument2:rest.api.user.base.get':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoProfile
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.user.base.edit':
                demoProfile.contact = config.data.name
                demoProfile.phone = config.data.phone
                demoProfile.email = config.data.email
                
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoProfile
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.user.base.delete':
                resolve({
                    data: {
                        data: {
                            status: 1,
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.user.change.password':
                /*если пароли совпадают, заменить*/
                resolve({
                    data: {
                        data: {
                            status: 1,
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.user.address.get':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoCloneOverJson(demoAddressList)
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.user.address.add':
                demoAddressList.push({
                    'id': 333,
                    'order': '1',
                    'address': config.data.address,
                    'status': 'submitted',
                    'statusPrint': 'Отправлен на подтверждение',
                    'statusDesc': 'В данный момент адрес проходит проверку модератора. Следить за статусом адреса вы можете тут',
                })
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoCloneOverJson(demoAddressList)
                        }
                    }
                });
                break;  
            case 'instrument2:rest.api.user.address.delete':
                for (let i = 0; i < demoAddressList.length; i++) {
                    if (demoAddressList[i].id === config.data.id) {
                        demoAddressList.splice(i,1)
                    }
                }
                
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoCloneOverJson(demoAddressList)
                        }
                    }
                });
                break;    
            case 'instrument2:rest.api.user.checks.list':
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
            case 'instrument2:rest.api.user.order.list':
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
            case 'instrument2:rest.api.user.order.get':
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
            case 'instrument2:rest.api.user.get': //TODO not used yet
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
            case 'instrument2:rest.api.listing.get':

                resolve({
                    data: {
                        data: {
                            answer: {
                                content: demoListingResult,
                                //получаем больше контента, приходит новая пагинация. Сортировка, сетка и фильтры сохраняются
                            },
                            status: 1,
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.sortListing.get':

                resolve({
                    data: {
                        data: {
                            answer: {
                                url: '',
                                output: demoSortingListing,
                                //получить новый листинг. Фильтры, сетка и пагинация сохраняются
                            },
                            status: 1,
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.filteredListing.get':

                resolve({
                    data: {
                        data: {
                            answer: {
                                url: '',
                                output: demoFilteredListing,
                                //получить новый листинг по фильтрам и пагинацию. Сортировка и сетка сохраняются
                            },
                            status: 1,
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.catalog.filter':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: {
                                match: 8,
                                filters: [
                                    {
                                        title: "Цена",
                                        code: "price_base",
                                        type: "range",
                                        values: {
                                            min: 1,
                                            max: 100,
                                            from: 12,
                                            to: 100
                                        },

                                    },
                                    {
                                        title: "",
                                        code: "switch_toggle",
                                        type: "switch",
                                        values: [
                                            {
                                                title: "Бестселлеры",
                                                value: "bestsellers",
                                                checked: true
                                            },
                                            {
                                                title: "Новинки",
                                                value: "news",
                                                checked: false
                                            },
                                        ]

                                    },
                                    {
                                        title: "Бренд",
                                        code: "brand",
                                        type: "checkbox",
                                        values: [
                                            {
                                                title: "Denzel",
                                                value: "denzel",
                                                checked: true,
                                                available: true,
                                                count: 7
                                            },
                                            {
                                                title: "Сибртех",
                                                value: "sibteh",
                                                checked: true,
                                                available: true,
                                                count: 6
                                            },
                                            {
                                                title: "Gross",
                                                value: "gross",
                                                checked: false,
                                                available: true,
                                                count: 7
                                            },
                                            {
                                                title: "Matrix",
                                                value: "matrix",
                                                checked: false,
                                                available: true,
                                                count: 6
                                            },
                                            {
                                                title: "Stels",
                                                value: "stels",
                                                checked: false,
                                                available: true,
                                                count: 5
                                            },
                                            {
                                                title: "Sparta",
                                                value: "sparta",
                                                checked: false,
                                                available: true,
                                                count: 6
                                            },
                                            {
                                                title: "Russia",
                                                value: "russia",
                                                checked: false,
                                                available: true,
                                                count: 7
                                            },
                                        ]
                                    },
                                    {
                                        title: "Тип скидки",
                                        code: "sale_type",
                                        type: "checkbox",
                                        values: [
                                            {
                                                title: "Силовое без скидки",
                                                value: "sale_1",
                                                checked: false,
                                                available: true,
                                                count: 2
                                            },
                                            {
                                                title: "Силовое",
                                                value: "sale_2",
                                                checked: false,
                                                available: true,
                                                count: 1
                                            },
                                            {
                                                title: "Россия без скидки",
                                                value: "sale_3",
                                                checked: false,
                                                available: true,
                                                count: 3
                                            },
                                            {
                                                title: "Импорт без скидки",
                                                value: "sale_4",
                                                checked: false,
                                                available: true,
                                                count: 4
                                            },
                                        ]
                                    },
                                    {
                                        title: "Наличие товара",
                                        code: "classifier_again",
                                        type: "checkbox",
                                        values: []
                                    }
                                ],
                                hash: 'newhash',
                            }
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.order.validate':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: 1
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.order.create':
            case 'instrument2:rest.api.user.order.repeat':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: orderSuccessAnswer
                        }
                    }
                });
                break;
                
            case 'instrument2:rest.api.cart.faq':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: true
                        }
                    }
                });
                break;
                
            case 'instrument2:rest.api.cart.favorite':
                let favorite = favorites.find(item => item.product_id === config.data.id)
                favorite.is_favorite = !favorite.is_favorite
                
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: favorite.is_favorite 
                        }
                    }
                });
                break;
                
            case 'instrument2:rest.api.cart.get.favorite':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: favorites 
                        }
                    }
                });
                break;
                
            case 'instrument2:rest.api.cart.compare':
                let compare = compares.find(item => item.product_id === config.data.id)
                compare.is_compare = !compare.is_compare
                
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: compare.is_compare
                        }
                    }
                });
                break;
                
            case 'instrument2:rest.api.cart.get.compare':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: compares
                        }
                    }
                });
                break;
        }
    });    
};
