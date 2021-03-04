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
            {id: 1, img: '/demo_images/product/image_50.png'},
            {id: 2, img: '/demo_images/product/image_51.png'},
            {id: 3, img: '/demo_images/product/image_52.png'},
            {id: 4, img: '/demo_images/product/image_53.png'},
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
            {id: 1, img: '/demo_images/product/image_50.png'},
            {id: 2, img: '/demo_images/product/image_51.png'},
            {id: 3, img: '/demo_images/product/image_52.png'},
            {id: 4, img: '/demo_images/product/image_53.png'},
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
            {id: 1, img: '/demo_images/product/image_50.png'},
            {id: 2, img: '/demo_images/product/image_51.png'},
            {id: 3, img: '/demo_images/product/image_52.png'},
            {id: 4, img: '/demo_images/product/image_53.png'},
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
            {id: 1, img: '/demo_images/product/image_50.png'},
            {id: 2, img: '/demo_images/product/image_51.png'},
            {id: 3, img: '/demo_images/product/image_52.png'},
            {id: 4, img: '/demo_images/product/image_53.png'},
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
let dashboardParams = {
    manager: {
        photo:'/demo_images/dashboard/manager.png',
        name:'Хорошилова Ирина Николаевна',
        phone: '8-925-234-69-14',
        mail:'i.horoshilova@instrument.ru'
    },
    discounts: [
        {
            name: 'Импорт',
            value: 20,
            date: '31.12.2021'
        },
        {
            name: 'Силовое',
            value: 0,
            date: '31.12.2021'
        },
        {
            name: 'Россия',
            value: 20,
            date: '31.12.2021'
        },
    ],
    contract: [
        {
            title:'Договор №',
            info:'19/000'
        },
        {
            title:'Срок действия',
            info:'с 17.12.2019 по 31.12.2020'
        },
        {
            title:'Пролонгация',
            info:'Да'
        },
        {
            title:'Отсрочка платежа',
            info:'14 дней'
        },
        {
            title:'Товарный лимит',
            info:'100 000 ₽'
        },
        {
            title:'Остаток товарного лимита',
            info:'30 000 ₽'
        }
    ],
    petitions: [
        {
            title:'Вопрос по гарантии',
            date:'12.03.2021',
            status:'Есть ответ',
            success: true
        },
        {
            title:'Запрос на удаление адреса',
            date:'12.03.2021',
            status:'В работе',
            success: false
        },
    ],
    order: [
        {
            number:1,
            date:'11.03.2021',
            priceTotal:2345,
            status: {
                label:'В сборке',
                value:'waiting'
            }
        },
        {
            number:2,
            date:'18.03.2021',
            priceTotal:245342,
            status: {
                label:'В сборке',
                value:'waiting'
            }
        },
        {
            number:3,
            date:'28.03.2021',
            priceTotal:34366,
            status: {
                label:'В сборке',
                value:'waiting'
            }
        },
    ],
    finance: {
        statistic: {
            limit:100000,
            arrears:30000,
            debt:80000
        },
        schedule:[ 
            {
                sum:20000,
                date:'15.04.2021',
                days:43
            },
            {
                sum:30000,
                date:'17.04.2021',
                days:45
            },
        ]
    }
}
let demoDiscount = [
    {
        "name":"Импорт",
        "code":"import",
        "value":20,
        "boost_value":0,
        "fixed":false,
        "date": '31.12.2021',
        "level":{
            "current":{
                "turnover":500000,
                "percent":10
            },
            "next":{
                "turnover":1000000,
                "percent":25
            }
        }
    },
    {
        "name":"Силовое",
        "code":"power",
        "value":0,
        "boost_value":2,
        "fixed":false,
        "date": '31.12.2021',
        "level":{
            "current":{
                "turnover":0,
                "percent":0
            },
            "next":{
                "turnover":100000,
                "percent":5
            }
        }
    },
    {
        "name":"Россия",
        "code":"russia",
        "value":20,
        "boost_value":0,
        "fixed":true,
        "date": '31.12.2021',
        "level":{
            "current":{
                "turnover":500000,
                "percent":20
            },
            "next":{
                "turnover":1000000,
                "percent":25
            }
        }
    }
];
let demoOrders = [];
//let baseOrderDate = new Date('2020-02-14');
for(let i = 0; i < 76; ++i) {
    /*let newOrderDate = new Date(baseOrderDate.valueOf());
    newOrderDate.setDate(newOrderDate.getDate() + i);
    newOrderDate = Math.round(newOrderDate.getTime()/1000);*/

    let newOrdeStatus = [{label: 'Доставлен', value: 'done'}, {label: 'В сборке', value: 'waiting'}, {label: 'Отменен', value: 'cancelled'}]
        .sort(function (a, b) {
            return 0.5 - Math.random()
        }).pop();

    demoOrders.push({
        id: i+1,
        number: 3254+i,
        date: '31.12.2020',
        priceTotal: 1000819,
        status: newOrdeStatus,
        qty: getRandomInt(2,8),
        paid: Math.random() > 0.5,
        discount: 10,
        
        documents:
            [
                {label: 'Документы', value: 'documents', link: '/images/country/globus.png'},
                {label: 'Загрузить еще что-нибудь', value: 'something', link: '/images/country/map.png'},
                {label: 'Загрузить счет-фактуру', value: 'check', link: '/images/country/map-dots.png'}
            ],

        delivery_address: 'Москва, Трехгорный Вал 3, ст. 26',
        delivery_person: 'Константин Константинопольский konstantynopolsky@gmail.com +7 (910) 872-92-89',
        payment: 'Оплата онлайн по карте',
        basket:[
            {
                id:123,
                name:"Trimmer pe benzina GT-52S, multifunctional, 52 сс",
                url:"/product/areometr-dlya-vymiryuvannya-shchilnosti-elektrolitu-sparta/",
                sku:"1230056",
                basket_quantity:3,
                priceTotal:1051.50,
                price:350.50,
                base_price:400,
                discount:12,
                images:[
                    {
                        img:"/upload/iblock/f62/60541.970.jpg"
                    }
                ]
            }
        ]

    });
}

let financeData = {
    invoice: '/images/country/globus.png',
    statistic: {
        limit:100000,
        arrears:30000,
        debt:80000,
        processing:20000,
        shipped:60000
    },
    schedule:[
        {
            sum:20000,
            date:'15.04.2021',
            days:43
        },
        {
            sum:30000,
            date:'17.04.2021',
            days:45
        },
    ],
    charges: [
        {
            sum:30000,
            date:'15.02.2021',
            days:16
        },
    ],
    history: [],
};

/*for(let i = 0; i < 5; ++i) {

    let sum = [10000, 20000].sort(function (a, b) {
        return 0.5 - Math.random()
    }).pop();

    let date = ['15.12.2020', '20.12.2020'].sort(function (a, b) {
        return 0.5 - Math.random()
    }).pop();

    let days = Math.floor(Math.random() * 10) + 10;

    let shipped = [true, false].sort(function (a, b) {
        return 0.5 - Math.random()
    }).pop();
    
    financeData.charges.push({
        id: i+1,
        'sum': sum,
        'date': date,
        'days': days,
        // 'latest': false,
        // 'shipped': shipped
    });
}*/
/*financeData.charges[0].days = -6;
financeData.charges[0].date = '21.12.2020';
financeData.charges[1].days = -4;
financeData.charges[0].latest = true*/

for(let i = 0; i < 6; ++i) {

    // profile_finance.top_up and profile_finance.purchasing are from json file for vue-i18n
    let operation = ['profile_finance.top_up', 'profile_finance.purchasing'].sort(function (a, b) {
        return 0.5 - Math.random()
    }).pop();

    let operationCode = ['23064560-0006', '23064560-0007'].sort(function (a, b) {
        return 0.5 - Math.random()
    }).pop();

    let status = [true, false].sort(function (a, b) {
        return 0.5 - Math.random()
    }).pop();
    
    financeData.history.push({
        id: i+1,
        'sum': 1000000,
        'date': '23.12.2020',
        'time': '24:10',
        'operation': operation,
        // 'operationNumber': 3895347+i,
        'code': operationCode,
        'order': 325214+i,
        'status': status
    });
}

let demoAddressList = [
];

let demoFeeds = {
    userFeeds: [
        {
            'id': 1,
            'title': 'Выгрузка новинки',
            'date': '2020-04-15T16:56',
            'updateDate': '2020-04-15T16:56',
            'filter1': '',
            'filter2': '',
            'brand1': 'Denzel',
            'brand2': '',
            'link': '/images/country/globus.png'
        },
        {
            'id': 2,
            'title': 'Выгрузка всех выгрузок новинки',
            'date': '2020-04-15T16:56',
            'updateDate': '2020-04-15T16:56',
            'filter1': '',
            'filter2': '',
            'brand1': 'Denzel',
            'brand2': '',
            'link': '/images/country/map.png'
        },
        {
            'id': 1,
            'title': 'Выгрузка лопат и молотков',
            'date': '2020-04-15T16:56',
            'updateDate': '2020-04-15T16:56',
            'filter1': '',
            'filter2': '',
            'brand1': 'Denzel',
            'brand2': '',
            'link': '/images/country/globus.png'
        },
        {
            'id': 2,
            'title': 'Моя выгрузка лопат и молотков номер 5',
            'date': '2020-04-15T16:56',
            'updateDate': '2020-04-15T16:56',
            'filter1': '',
            'filter2': '',
            'brand1': 'Denzel',
            'brand2': '',
            'link': '/images/country/map.png'
        }
    ],
    readyFeeds: [
        {
            'title': 'Полный прайс-лист',
            'link_yml': '/images/country/globus.png',
            'link_xlsx': '/images/country/map.png',
        },
        {
            'title': 'Все бренды',
            'link_yml': '/images/country/globus.png',
            'link_xlsx': '/images/country/map.png',
        },
        {
            'title': 'Gross',
            'link_yml': '/images/country/globus.png',
            'link_xlsx': '/images/country/map.png',
        },
        {
            'title': 'Matrix',
            'link_yml': '/images/country/globus.png',
            'link_xlsx': '/images/country/map.png',
        },
        {
            'title': 'Средства индивидуальной защиты',
            'link_yml': '/images/country/globus.png',
            'link_xlsx': '/images/country/map.png',
        },
        {
            'title': 'Полный прайс-лист',
            'link_yml': '/images/country/globus.png',
            'link_xlsx': '/images/country/map.png',
        },
        {
            'title': 'Все бренды',
            'link_yml': '/images/country/globus.png',
            'link_xlsx': '/images/country/map.png',
        },
        {
            'title': 'Gross',
            'link_yml': '/images/country/globus.png',
            'link_xlsx': '/images/country/map.png',
        },
        {
            'title': 'Matrix',
            'link_yml': '/images/country/globus.png',
            'link_xlsx': '/images/country/map.png',
        },
        {
            'title': 'Средства индивидуальной защиты',
            'link_yml': '/images/country/globus.png',
            'link_xlsx': '/images/country/map.png',
        }
    ]
}

let demoMockupFavorites = 
    [
        {
            'id': 1,
            'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
            'link': '',
            'code': 717950,
            'available': true,
            'stock': 100,
            'oldPrice': 3819.358,
            'newPrice': 2819.365,
            'is_favorite': true,
            'is_compare': false,
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
            'oldPrice': 3819,
            'newPrice': 2819,
            'is_favorite': true,
            'is_compare': false,
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
    ];

let demoMockupComparisons = 
    [
        {
            'id': 1,
            'title': 'Дрель-шуруповерт аккумуляторная CDL-12-02, Li-Ion, 12 В, 1.5 А*ч, 2 аккумулятора Denzel',
            'link': '',
            'code': 717950,
            'available': true,
            'stock': 100,
            'oldPrice': 3819.358,
            'newPrice': 2819.365,
            'is_favorite': true,
            'is_compare': true,
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
            ],
            'otherOptions': {
                'Вес': '2.55 кг',
                'Длина в упаковке': '490 мм',
                'Число ступеней регулировки крутящего момента': '18+1',
                'Наличие реверса': 'есть',
                'Тип скидки': 'Силовое',
                'Емкость аккумулятора': '1.5 А*ч',
                'Индикатор заряда аккумуляторной батареи': 'есть',
                'Штрихкод': '4044996171296',
                'Частота вращения шпинделя': '0-350/0-1350 об/мин',
                'Ссылка на сертификат': 'ttps://instrument.ru/info/sertif/Сертификаты (импорт)/ЕАЭС RU C-CN.ПФ02.В.01621-20.pdf',
                'Частота вращения шпинделя': '0-350/0-1350 об/мин',
                'Ссылка на сертификат': 'ttps://instrument.ru/info/sertif/Сертификаты (импорт)/ЕАЭС RU C-CN.ПФ02.В.01621-20.pdf'
            }
        },
        {
            'id': 2,
            'title': 'Дрель-шуруповерт аккумуляторная CDL-12-02, Li-Ion, 12 В, 1.5 А*ч, 2 аккумулятора Denzel',
            'link': '',
            'code': 717950,
            'available': true,
            'stock': 100,
            'oldPrice': 4218,
            'newPrice': 4218,
            'is_favorite': true,
            'is_compare': true,
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
            ],
            'otherOptions': {
                'Вес': '1.8 кг',
                'Длина в упаковке': '350 мм',
                'Число ступеней регулировки крутящего момента': '21+1',
                'Наличие реверса': 'есть',
                'Тип скидки': 'Силовое',
                'Емкость аккумулятора': '1.5 А*ч',
                'Индикатор заряда аккумуляторной батареи': 'есть',
                'Штрихкод': '4044996171296',
                'Частота вращения шпинделя': '0-350/0-1350 об/мин',
                'Ссылка на сертификат': 'ttps://instrument.ru/info/sertif/Сертификаты (импорт)/ЕАЭС RU C-CN.ПФ02.В.01621-20.pdf',
                'Частота вращения шпинделя': '0-350/0-1350 об/мин',
                'Ссылка на сертификат': 'ttps://instrument.ru/info/sertif/Сертификаты (импорт)/ЕАЭС RU C-CN.ПФ02.В.01621-20.pdf'
            }
        },
        {
            'id': 3,
            'title': 'Дрель-шуруповерт аккумуляторная CDL-12-02, Li-Ion, 12 В, 1.5 А*ч, 2 аккумулятора Denzel',
            'link': '',
            'code': 717950,
            'available': true,
            'stock': 100,
            'oldPrice': 2051,
            'newPrice': 2051,
            'is_favorite': false,
            'is_compare': true,
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
            ],
            'otherOptions': {
                'Вес': '1.9 кг',
                'Длина в упаковке': '240 мм',
                'Число ступеней регулировки крутящего момента': '',
                'Наличие реверса': '',
                'Тип скидки': 'Силовое',
                'Емкость аккумулятора': '1.5 А*ч',
                'Индикатор заряда аккумуляторной батареи': '',
                'Штрихкод': '4044996171296',
                'Частота вращения шпинделя': '0-350/0-1350 об/мин',
                'Ссылка на сертификат': 'ttps://instrument.ru/info/sertif/Сертификаты (импорт)/ЕАЭС RU C-CN.ПФ02.В.01621-20.pdf',
                'Частота вращения шпинделя': '0-350/0-1350 об/мин',
                'Ссылка на сертификат': 'ttps://instrument.ru/info/sertif/Сертификаты (импорт)/ЕАЭС RU C-CN.ПФ02.В.01621-20.pdf'
            }
        },
        {
            'id': 4,
            'title': 'Дрель-шуруповерт аккумуляторная CDL-12-02, Li-Ion, 12 В, 1.5 А*ч, 2 аккумулятора Denzel',
            'link': '',
            'code': 717950,
            'available': true,
            'stock': 100,
            'oldPrice': 3819,
            'newPrice': 2819,
            'is_favorite': true,
            'is_compare': true,
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
            ],
            'otherOptions': {
                'Вес': '2.55 кг',
                'Длина в упаковке': '490 мм',
                'Число ступеней регулировки крутящего момента': '18+1',
                'Наличие реверса': 'есть',
                'Тип скидки': 'Силовое',
                'Емкость аккумулятора': '1.5 А*ч',
                'Индикатор заряда аккумуляторной батареи': 'есть',
                'Штрихкод': '4044996171296',
                'Частота вращения шпинделя': '0-350/0-1350 об/мин',
                'Ссылка на сертификат': 'ttps://instrument.ru/info/sertif/Сертификаты (импорт)/ЕАЭС RU C-CN.ПФ02.В.01621-20.pdf',
                'Частота вращения шпинделя': '0-350/0-1350 об/мин',
                'Ссылка на сертификат': 'ttps://instrument.ru/info/sertif/Сертификаты (импорт)/ЕАЭС RU C-CN.ПФ02.В.01621-20.pdf'
            }
        },
        {
            'id': 5,
            'title': 'Дрель-шуруповерт аккумуляторная CDL-12-02, Li-Ion, 12 В, 1.5 А*ч, 2 аккумулятора Denzel',
            'link': '',
            'code': 717950,
            'available': true,
            'stock': 100,
            'oldPrice': 3819,
            'newPrice': 2819,
            'is_favorite': true,
            'is_compare': true,
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
            ],
            'otherOptions': {
                'Вес': '2.55 кг',
                'Длина в упаковке': '240 мм',
                'Число ступеней регулировки крутящего момента': '',
                'Наличие реверса': '',
                'Тип скидки': 'Силовое',
                'Емкость аккумулятора': '1.5 А*ч',
                'Индикатор заряда аккумуляторной батареи': '',
                'Штрихкод': '4044996171296',
                'Частота вращения шпинделя': '0-350/0-1350 об/мин',
                'Ссылка на сертификат': 'ttps://instrument.ru/info/sertif/Сертификаты (импорт)/ЕАЭС RU C-CN.ПФ02.В.01621-20.pdf',
                'Частота вращения шпинделя': '0-350/0-1350 об/мин',
                'Ссылка на сертификат': 'ttps://instrument.ru/info/sertif/Сертификаты (импорт)/ЕАЭС RU C-CN.ПФ02.В.01621-20.pdf'
            }
        },
    ];

let demoSortingListing = {
    products: [
        {
            'id': 1,
            'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
            'link': '',
            'code': 717950,
            'available': true,
            'stock': 100,
            'oldPrice': 3819.3565,
            'newPrice': 2819.6569,
            'is_favorite': false,
            'is_compare': false,
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
            'oldPrice': 3819,
            'newPrice': 2819,
            'is_favorite': false,
            'is_compare': false,
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
            'oldPrice': 3819,
            'newPrice': 2819,
            'is_favorite': false,
            'is_compare': false,
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
    sort_type: 'discount',
    shields: [],
    // filters,
    view_type: 'grid',
    pagination: {}
};

let orderSuccessAnswer = {
    order: 4554465465,
    payment_form: demoBase64EncodeUnicode('<form action="https://integration.bitrix.info/app/authorize/v4/handler.php" method="POST"><input type="hidden" name="paymentid" value="507"><input type="hidden" name="paymentpay" value="68.12"><input type="hidden" name="currency" value="USD"><input type="hidden" name="memberid" value="a0acc530a106712468f1c0c57f628b19"><input type="hidden" name="BX_PAYSYSTEM_ID" value="9"><input name="button" value="Pay" type="submit"></form>')
};

let favorites = [
    {
        'id': 1,
        'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        'link': '',
        'code': 717950,
        'available': true,
        'stock': 100,
        'oldPrice': 3819,
        'newPrice': 2819,
        'is_favorite': true,
        'is_compare': false,
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
        'oldPrice': 3819,
        'newPrice': 2819,
        'is_favorite': true,
        'is_compare': false,
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
        'id': 11,
        'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        'link': '',
        'code': 717950,
        'available': true,
        'stock': 100,
        'oldPrice': 3819,
        'newPrice': 2819,
        'is_favorite': false,
        'is_compare': false,
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
        'id': 556,
        'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        'link': '',
        'code': 717950,
        'available': true,
        'stock': 100,
        'oldPrice': 3819,
        'newPrice': 2819,
        'is_favorite': false,
        'is_compare': false,
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
];

let compares = [
    {
        'id': 1,
        'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        'link': '',
        'code': 717950,
        'available': true,
        'stock': 100,
        'oldPrice': 3819,
        'newPrice': 2819,
        'is_favorite': false,
        'is_compare': false,
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
        'oldPrice': 3819,
        'newPrice': 2819,
        'is_favorite': false,
        'is_compare': false,
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
        'id': 11,
        'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        'link': '',
        'code': 717950,
        'available': true,
        'stock': 100,
        'oldPrice': 3819,
        'newPrice': 2819,
        'is_favorite': false,
        'is_compare': false,
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
        'id': 556,
        'title': 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel',
        'link': '',
        'code': 717950,
        'available': true,
        'stock': 100,
        'oldPrice': 3819,
        'newPrice': 2819,
        'is_favorite': false,
        'is_compare': false,
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
];


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
            case 'instrument2:rest.api.order.calc':
                
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: {
                                base_price: 12345,
                                price: 1234,
                                delivery_price: 100,
                                discounts: {
                                    personal: {percent: 5, value: 387},
                                    action: {percent: 3, value: 115},
                                    total: {percent: 8, value: 502},
                                },
                            }
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.auth.sign_in':
                resolve({
                    data: {
                        data: {
                            status: 1,
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.auth.out':
                resolve({
                    data: {
                        data: {
                            status: 1,
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.auth.sign_up':
                resolve({
                    data: {
                        data: {
                            status: 1,
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
            case 'instrument2:rest.api.user.dashboard':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: dashboardParams
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.user.discount.list':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoDiscount
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

            case 'instrument2:rest.api.user.base.change_password':
                if (!config.data || !config.data.password || !config.data.confirmPassword) {
                    reject(new Error('Wrong config'));
                }
                if (config.data.password === config.data.confirmPassword) {
                    resolve({
                        data: {
                            data: {
                                status: 1,
                                answer: true
                            }
                        }
                    });
                } else {
                    resolve({
                        data: {
                            data: {
                                status: 0,
                                errors: [
                                    {
                                        code: 'not_identical_passwords',
                                        message: 'Not identical passwords'
                                    }
                                ]
                            }
                        }
                    });
                }
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
                    'order': 1,
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
            case 'instrument2:rest.api.user.finance.list':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: {
                                financeData: financeData,
                                pagination: {
                                    current: 1,
                                    total: 5
                                }
                            },
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.user.feeds.get':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoFeeds
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.user.order.list':

                if (!config.data) {
                    reject(new Error('Wrong config'));
                }

                if (!config.data.status) {
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
                } else {
                    const filterOrders = (status) => {
                        return demoOrders.filter(order => {
                            return order.status.value === status
                        })
                    }  
                    const demoSortedOrders = filterOrders(config.data.status)
                    resolve({
                        data: {
                            data: {
                                status: 1,
                                answer: {
                                    orders: demoSortedOrders,
                                    pagination: {
                                        current: 1,
                                        total: 5
                                    }
                                },
                            }
                        }
                    });
                }         
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
                    priceTotal: foundOrder.priceTotal,
                    status: foundOrder.status,
                    qty: foundOrder.qty,
                    paid: foundOrder.paid,
                    discount: foundOrder.discount,
                    documents: foundOrder.documents,
                    delivery_address: foundOrder.delivery_address,
                    delivery_person: foundOrder.delivery_person,
                    payment: foundOrder.payment,
                    basket: foundOrder.basket,
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
            case 'instrument2:rest.api.catalog.next':

                resolve({
                    data: {
                        data: {
                            answer: {
                                url: '',
                                output: demoFilteredListing,
                            },
                            status: 1,
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.catalog.get':

                resolve({
                    data: {
                        data: {
                            answer: {
                                url: '',
                                output: demoFilteredListing,
                            },
                            status: 1,
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.catalog.update':

                resolve({
                    data: {
                        data: {
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
                                            from: 1,
                                            to: 100
                                        },

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
                                        type: "switch",
                                        values: [{
                                            title: "В наличии",
                                            value: "in_stock",
                                            checked: false,
                                            count: 19
                                        }]
                                    },
                                    {
                                        title: "Бренд",
                                        code: "brand",
                                        type: "checkbox",
                                        values: [
                                            {
                                                title: "Denzel",
                                                value: "denzel",
                                                checked: false,
                                                available: true,
                                                count: 7
                                            },
                                            {
                                                title: "Сибртех",
                                                value: "sibteh",
                                                checked: false,
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
                                        title: "",
                                        code: "switch_toggle",
                                        type: "switch",
                                        values: [
                                            {
                                                title: "Бестселлеры",
                                                value: "bestsellers",
                                                checked: false
                                            },
                                            {
                                                title: "Новинки",
                                                value: "news",
                                                checked: false
                                            },
                                        ]

                                    },
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
            case 'instrument2:rest.api.favorite.toggle':
                let favorite = favorites.find(item => item.id === config.data.id)
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
            case 'instrument2:rest.api.favorite.get':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoMockupFavorites
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.favorite.clear':
                demoMockupFavorites = []
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoMockupFavorites
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.compare.toggle':
                let compare = compares.find(item => item.id === config.data.id)
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
            case 'instrument2:rest.api.compare.get':
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoMockupComparisons
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.compare.clear':
                demoMockupComparisons = []
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: demoMockupComparisons
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.location.find.city':
                
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: {
                                'query': config.data,
                                'list': 
                                    [
                                        {'name': 'Киев', 'id': 1},
                                        {'name': 'Харьков', 'id': 2},
                                    ]
                                }

                            }
                    }
                });
                break;
            case 'instrument2:rest.api.location.find.street':
                
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: {
                                'query': config.data,
                                'list': 
                                    [
                                        {'name': 'Ленина', 'id': 101, 'city_id': 2},
                                        {'name': 'Советская', 'id': 202, 'city_id': 2},
                                
                                    ]
                                }

                            }
                    }
                });
                break;
            case 'instrument2:rest.api.search.get.history':
                
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: [
                                {title: "Шуруп", link: ''},
                                {title: "Шуруповерт", link: ''},
                                {title: "Шуруповерт какой-нибудь", link: ''}
                            ]
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.search.clear.history':
                
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: []
                        }
                    }
                });
                break;
            case 'instrument2:rest.api.search':
                
                resolve({
                    data: {
                        data: {
                            status: 1,
                            answer: {
                                shields: [
                                    {title: "Лебедки автомобильные", link: ''},
                                    {title: 'Масленки', link: ''},
                                    {title: 'Мебель гаражная', link: ''},
                                    {title: 'Гидравлические опоры', link: ''},
                                    {title: 'Моечные машины высокого давления', link: ''},
                                    {title: 'Домкраты', link: ''},
                                    {title: 'Аксессуары автомобильные', link: ''}
                                ],
                                products: [
                                    {
                                        title: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel 52 сс',
                                        img: '/images/search/item.png',
                                        price: 2819,
                                        link: ''
                                    },
                                    {
                                        title: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel 52 сс',
                                        img: '/images/search/item.png',
                                        price: 2819,
                                        link: ''
                                    },
                                    {
                                        title: 'Trimmer pe benzina GT-52S, multifunctional, 52 сс, 3 cp, tija din 2 parti//Denzel 52 сс',
                                        img: '/images/search/item.png',
                                        price: 2819,
                                        link: ''
                                    }
                                ],
                                url: ''
                            }
                        }
                    }
                });
                break;
        }
    });    
};
