<template>
    <div class="appeals">
        <div class="appeals__head">
            <h2 class="appeals__title">{{ $tc('profile.appeals.title') }}</h2>
            <div class="appeals__btn">
                <svg viewBox="0 0 16 16">
                    <use :xlink:href="templatePath + `images/sprite.svg#icons__plus-small`"></use>
                </svg>
                {{ $tc('profile.appeals.btn') }}
            </div>
        </div>
        <div class="appeals__main">
            <div class="appeals__open">
                <h3 class="appeals__subtitle">{{ $tc('profile.appeals.open_title') }}</h3>
                <ul class="appeals__list">
                    <li class="appeals__item" v-for="item in openAppealsArr">
                        <div class="appeals__top">
                            <div class="appeals__number">№ {{item.number}}{{ $tc('profile.appeals.subtitle') }}</div>
                            <div class="appeals__desc">{{item.desc}}</div>
                        </div>
                        <div class="appeals__bottom">
                            <div class="appeals__status">{{item.status}}</div>
                            <div class="appeals__date">{{item.date}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="appeals__close">
                <h3 class="appeals__subtitle">{{ $tc('profile.appeals.close_title') }}</h3>
                <ul class="appeals__list">
                    <li class="appeals__item" v-for="item in closeAppealsArr">
                        <div class="appeals__top">
                            <div class="appeals__number">№ {{item.number}}{{ $tc('profile.appeals.subtitle') }}</div>
                            <div class="appeals__desc">{{item.desc}}</div>
                        </div>
                        <div class="appeals__bottom"> 
                            <div class="appeals__status">{{item.status}}</div>
                            <div class="appeals__date">{{item.date}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"page-appeals",
        data() {
            return {
                openAppealsArr:[
                    {
                        number: 123456,
                        status: 'Есть ответ',
                        desc: 'Здравствуйте! В описании товара «Триммер бензиновый DT 43S, 43 см3, 2,5 л. с, разъемная штанга, состоит из разъемная штанга, состоит из...',
                        date: '12.03.2020',

                    },
                    {
                        number: 123456,
                        status: 'В работе',
                        desc: 'Здравствуйте! В описании товара «Триммер бензиновый DT 43S, 43 см3, 2,5 л. с, разъемная штанга, состоит из разъемная штанга, состоит из...',
                        date: '12.03.2020',

                    }
                ],
                closeAppealsArr:[
                   {
                        number: 123456,
                        status: 'Закрыто',
                        desc: 'Здравствуйте! В описании товара «Триммер бензиновый DT 43S, 43 см3, 2,5 л. с, разъемная штанга, состоит из разъемная штанга, состоит из...',
                        date: '12.03.2020',

                    },
                    {
                        number: 123456,
                        status: 'Закрыто',
                        desc: 'Здравствуйте! В описании товара «Триммер бензиновый DT 43S, 43 см3, 2,5 л. с, разъемная штанга, состоит из разъемная штанга, состоит из...',
                        date: '12.03.2020',

                    },
                    {
                        number: 123456,
                        status: 'Закрыто',
                        desc: 'Здравствуйте! В описании товара «Триммер бензиновый DT 43S, 43 см3, 2,5 л. с, разъемная штанга, состоит из разъемная штанга, состоит из...',
                        date: '12.03.2020',

                    },
                    {
                        number: 123456,
                        status: 'Закрыто',
                        desc: 'Здравствуйте! В описании товара «Триммер бензиновый DT 43S, 43 см3, 2,5 л. с, разъемная штанга, состоит из разъемная штанга, состоит из...',
                        date: '12.03.2020',

                    },
                    {
                        number: 123456,
                        status: 'Закрыто',
                        desc: 'Здравствуйте! В описании товара «Триммер бензиновый DT 43S, 43 см3, 2,5 л. с, разъемная штанга, состоит из разъемная штанга, состоит из...',
                        date: '12.03.2020',

                    }
                ]
            }
        },
        methods: {
        },
    }
</script>