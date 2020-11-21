<template>
    <div class="catalogue">

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
                        <!-- <div class="catalogue__subcategories">
                            <div class="catalogue__subcategory">
                                <a href="#" class="catalogue__subcategory-link">Аксессуары автомобильные</a>
                                <ul class="catalogue__further-subcategories">
                                    <li>
                                        <a href="#" class="catalogue__further-subcategory">Ареометры</a>
                                    </li>
                                    <li>
                                        <a href="#" class="catalogue__further-subcategory">Ареометры</a>
                                    </li>
                                    <li>
                                        <a href="#" class="catalogue__further-subcategory">Ареометры</a>
                                    </li>
                                    <li>
                                        <a href="#" class="catalogue__further-subcategory">Ареометры</a>
                                    </li>
                                    <li>
                                        <a href="#" class="catalogue__further-subcategory">Ареометры</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="catalogue__subcategory">
                                <a href="#" class="catalogue__subcategory-link">Аксессуары автомобильные</a>
                                <ul class="catalogue__further-subcategories">
                                    <li>
                                        <a href="#" class="catalogue__further-subcategory">Ареометры</a>
                                    </li>
                                    <li>
                                        <a href="#" class="catalogue__further-subcategory">Ареометры</a>
                                    </li>
                                    <li>
                                        <a href="#" class="catalogue__further-subcategory">Ареометры</a>
                                    </li>
                                    <li>
                                        <a href="#" class="catalogue__further-subcategory">Ареометры</a>
                                    </li>
                                    <li>
                                        <a href="#" class="catalogue__further-subcategory">Ареометры</a>
                                    </li>
                                </ul>
                            </div>
                        </div> -->
                    </div>

                    <!-- <subcategories :subcategories="category.subcategories"></subcategories> -->
                            <!-- <li v-for="subcategory in category.subcategories">
                                <a href="#" class="catalogue__subcategory-link">{{subcategory}}</a>
                                <furtherSubcategories :subcategory="subcategory"></furtherSubcategories>
                                <ul>
                                    <li v-for="further-subcategory in subcategory">
                                        <a href="#" class="catalogue__further-subcategory">{{furtherSubcategory}}</a>
                                    </li>
                                </ul>
                            </li> -->

                </li>
            </ul>
        </div>
        <!-- container end -->
    </div>
</template>

<script>
    import catalogueSubcategories from './catalogue-subcategories.vue';

    export default {
        name: "catalogue",
        components:{
            catalogueSubcategories
        },
        data() {
            return {
               categories: [
                    {
                        'title': 'Автомобильный инструмент',
                        'subcategories': {
                            'Аксессуары автомобильные': ['Ареометры', 'Воронки', 'Держатели телефонов и планшетов', 
                                'Знаки аварийной остановки', 'Канистры для топлива', 'Компрессоры автомобильные', 
                                'Органайзеры', 'Пакеты для шин', 'Провода стартовые', 'Резинки багажные', 'Ремни багажные', 
                                'Салфетки и губки', 'Скребки и водосгоны', 'Тросы буксировочные', 'Удобства в автомобиле', 
                                'Щетки стеклоочистителя', 'Щетки-сметки'],
                            'Домкраты': ['Домкраты гидравлические подкатные', 'Домкраты гидравлические бутылочные', 
                                'Домкраты механические бутылочные', 'Домкраты реечные', 'Домкраты ромбовые'],
                            'Пневмоинструмент': ['Аксессуары к компрессору', 'Гвозди для пневмо нейлера', 'Краскораспылители', 
                                'Наборы пневмоинструмента', 'Нейлеры пневматические', 'Пистолеты пневматические', 
                                'Ремкомплекты для краскораспылителей', 'Скобы для пневмостеплера', 'Степлеры пневматические', 
                                'Шланги спиральные'],
                            'Пробники автомобильные': [],
                            'Перчатки': [],
                            'Растяжки гидравлические': [],
                            'Специальные приспособления': [],
                            'Тали': [],
                            'Поддоны для сбора масла': [],
                            'Тельферы': [],
                            'Лебедки автомобильные': [],
                            'Масленки': [],
                            'Мебель гаражная': [],
                            'Моечные машины высокого давления': [],
                            'Насосы гидравлические': [],
                            'Поддоны для сбора масла': [],
                            'Подставки под машину регулируемые':[],
                            'Прессы гидравлические':[],
                            'Специальные приспособления':[],
                            'Трубогибы гидравлические':[],
                            'Цилиндры гидравлические':[],
                            'Пробники автомобильные':[],
                            'Подставки под машину регулируемые':[],
                        }
                    },
                    {
                        'title': 'Слесарный инструмент',
                        'subcategories': {
                            'accessories': [
                                'aroma',
                                'holders',
                            ],
                            'Тельферы': [],
                            'Лебедки автомобильные': [],
                            'Масленки': [],
                            'Мебель гаражная': [],
                            'Моечные машины высокого давления': [],
                            'Насосы гидравлические': []
                        }
                    },
                    {
                        'title': 'Столярный инструмент',
                        'subcategories': {
                            'accessories': [
                                'aroma',
                                'holders'
                            ],
                            'Тельферы': [],
                            'Лебедки автомобильные': [],
                            'Масленки': [],
                            'Мебель гаражная': []
                        }
                    },
                    {
                        'title': 'Измерительный инструмент',
                        'subcategories': {
                            'accessories': [
                                'aroma',
                                'holders'
                            ]
                        }
                    },
                    {
                        'title': 'Крепежный инструмент',
                        'subcategories': {
                            'accessories': [
                                'aroma',
                                'holders'
                            ]
                        }
                    },
                    {
                        'title': 'Садовый инвентарь',
                        'subcategories': {
                            'accessories': [
                                'aroma',
                                'holders'
                            ]
                        }
                    },
                    {
                        'title': 'Режущий инструмент',
                        'subcategories': {
                            'accessories': [
                                'aroma',
                                'holders'
                            ]
                        }
                    },
                    {
                        'title': 'Отделочный инструмент',
                        'subcategories': {
                            'accessories': [
                                'aroma',
                                'holders'
                            ]
                        }
                    },
                    {
                        'title': 'Силовое оборудование',
                        'subcategories': {
                            'accessories': [
                                'aroma',
                                'holders'
                            ]
                        }
                    },
                    {
                        'title': 'Средства индивидуальной защиты',
                        'subcategories': {
                            'accessories': [
                                'aroma',
                                'holders'
                            ]
                        }
                    },
                    {
                        'title': 'Товары первой необходимости',
                        'subcategories': {
                            'accessories': [
                                'aroma',
                                'holders'
                            ]
                        }
                    },
                    {
                        'title': 'Прочий инструмент',
                        'subcategories': {
                            'accessories': [
                                'aroma',
                                'holders'
                            ]
                        }
                    }

                ] 
            }
        }

    }
</script>


