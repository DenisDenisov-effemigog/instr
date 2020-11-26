<template>
    <div class="catalogue">

        <catalogue-mobile :categories="categories"></catalogue-mobile>

        <div class="catalogue_tablet">
            <div class="container">
                <ul class="catalogue__categories">
                    <div class="catalogue__categories-bg"></div>
                    <li class="catalogue__category" v-for="category in categories">
                        <div>
                            <a href="#" class="catalogue__category-link">
                                {{category.title}}
                                <svg class="" viewBox="0 0 6 10">
                                    <use :xlink:href="'./images/sprite.svg#arrows__arrow-right'"></use>
                                </svg>
                            </a>
                            <catalogue-subcategories :categories="category.subcategories"></catalogue-subcategories>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import catalogueMobile from './mobile/catalogue-mobile.vue'
    import catalogueSubcategories from './catalogue-subcategories.vue';
    import headerMenuMobile from '../header/mobile/home-menu.vue';

    export default {
        name: "catalogue",
        components: {
            catalogueMobile,
            catalogueSubcategories,
            headerMenuMobile
        },
        data() {
            return {
               categories: [
                    {
                        'title': 'Автомобильный инструмент',
                        'subcategories': [
                            {'title': 'Аксессуары автомобильные',
                            'categories': ['Ареометры', 'Воронки', 'Держатели телефонов и планшетов', 
                                'Знаки аварийной остановки', 'Канистры для топлива', 'Компрессоры автомобильные', 
                                'Органайзеры', 'Пакеты для шин', 'Провода стартовые', 'Резинки багажные', 'Ремни багажные', 
                                'Салфетки и губки', 'Скребки и водосгоны', 'Тросы буксировочные', 'Удобства в автомобиле', 
                                'Щетки стеклоочистителя', 'Щетки-сметки']
                            },
                            {
                                'title': 'Домкраты',
                                'categories': ['Домкраты гидравлические подкатные', 'Домкраты гидравлические бутылочные', 
                                    'Домкраты механические бутылочные', 'Домкраты реечные', 'Домкраты ромбовые'],
                            },
                            {
                                'title': 'Пневмоинструмент',
                                'categories': ['Аксессуары к компрессору', 'Гвозди для пневмо нейлера', 'Краскораспылители', 
                                    'Наборы пневмоинструмента', 'Нейлеры пневматические', 'Пистолеты пневматические', 
                                    'Ремкомплекты для краскораспылителей', 'Скобы для пневмостеплера', 'Степлеры пневматические', 
                                    'Шланги спиральные']
                            },
                            {
                                'title': 'Пробники автомобильные'
                            },
                            {'title': 'Перчатки'},
                            {'title': 'Растяжки гидравлические'},
                            {'title': 'Специальные приспособления'},
                            {'title': 'Тали'},
                            {'title': 'Поддоны для сбора масла'},
                            {'title': 'Тельферы'},
                            {'title': 'Лебедки автомобильные'},
                            {'title': 'Масленки'},
                            {'title': 'Мебель гаражная'},
                            {'title': 'Моечные машины высокого давления'},
                            {'title': 'Насосы гидравлические'},
                            {'title': 'Поддоны для сбора масла'},
                            {'title': 'Подставки под машину регулируемые'},
                            {'title': 'Прессы гидравлические'},
                            {'title': 'Специальные приспособления'},
                            {'title': 'Трубогибы гидравлические'},
                            {'title': 'Цилиндры гидравлические'},
                            {'title': 'Пробники автомобильные'},
                            {'title': 'Подставки под машину регулируемые'},
                        ]
                    },
                    {
                        'title': 'Слесарный инструмент',
                        'subcategories': [
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            },
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            },
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            },
                            {'title': 'Тельферы'},
                            {'title': 'Лебедки автомобильные'},
                            {'title': 'Масленки'},
                            {'title': 'Мебель гаражная'},
                            {'title': 'Моечные машины высокого давления'},
                            {'title': 'Насосы гидравлические'}
                        ]
                    },
                    {
                        'title': 'Столярный инструмент',
                        'subcategories': [
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            },
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            },
                            {'title': 'Тельферы'},
                            {'title': 'Лебедки автомобильные'},
                            {'title': 'Масленки'},
                            {'title': 'Мебель гаражная'},
                        ]
                    },
                    {
                        'title': 'Измерительный инструмент',
                        'subcategories': [
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            },
                            {'title': 'Тельферы'},
                        ]
                    },
                    {
                        'title': 'Крепежный инструмент',
                        'subcategories': [
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            }
                        ]
                    },
                    {
                        'title': 'Садовый инвентарь',
                        'subcategories': [
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            }
                        ]
                    },
                    {
                        'title': 'Режущий инструмент',
                        'subcategories': [
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            },
                            {'title': 'Тельферы'}
                        ]
                    },
                    {
                        'title': 'Отделочный инструмент',
                        'subcategories': [
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            }
                        ]
                    },
                    {
                        'title': 'Силовое оборудование',
                        'subcategories': [
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            },
                            {'title': 'Тельферы'}
                        ]
                    },
                    {
                        'title': 'Средства индивидуальной защиты',
                        'subcategories': [
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            }
                        ]
                    },
                    {
                        'title': 'Товары первой необходимости',
                        'subcategories': [
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            },
                            {'title': 'Тельферы'},
                            {'title': 'Лебедки автомобильные'}
                        ]
                    },
                    {
                        'title': 'Прочий инструмент',
                        'subcategories': [
                            {
                                'title': 'accessories',
                                'categories' : ['aroma', 'holders',]
                            }
                        ]
                    }

                ] 
            }
        }

    }
</script>


