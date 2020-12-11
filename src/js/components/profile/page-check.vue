<template>
    <div class="my-check">
        <h2 class="profile__title">Мой счет</h2>
        <div class="my-check__info">
            <div class="my-check__info-icon">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__wanted'"></use>
                </svg>
            </div>
            <div class="my-check__info-text">
                В этом разделе вы найдете информацию о заказах, сделанных на сайте
            </div>
        </div>
        <div class="my-check__main">
            <ul class="my-check__list">
                <li class="my-check__item my-check__item--head">
                    <div class="my-check__sum">Сумма</div>
                    <div class="my-check__date">Время и дата</div>
                    <div class="my-check__operation">Операция</div>
                    <div class="my-check__code my-check__code--head">Код операции</div>
                </li>
                <li class="my-check__item">
                    <div class="my-check__sum my-check__sum--red">1000000 RON</div>
                    <div class="my-check__date">23.12.2020 в 24:10</div>
                    <div class="my-check__operation">Оплата заказа #3895347</div>
                    <div class="my-check__code">23064560-0006</div>
                    <div class="my-check__order">#325214</div>
                </li>
                <li class="my-check__item">
                    <div class="my-check__sum">+1500 RON</div>
                    <div class="my-check__date">23.12.2020 в 24:10</div>
                    <div class="my-check__operation">Пополнение баланса</div>
                    <div class="my-check__code">23064560-0006</div>
                    <div class="my-check__order">#325214</div>
                </li>
                <li class="my-check__item">
                    <div class="my-check__sum">+1500 RON</div>
                    <div class="my-check__date">23.12.2020 в 24:10</div>
                    <div class="my-check__operation">Пополнение баланса</div>
                    <div class="my-check__code">23064560-0006</div>
                    <div class="my-check__order">#325214</div>
                </li>
                <li class="my-check__item">
                    <div class="my-check__sum">+1500 RON</div>
                    <div class="my-check__date">23.12.2020 в 24:10</div>
                    <div class="my-check__operation">Пополнение баланса</div>
                    <div class="my-check__code">23064560-0006</div>
                    <div class="my-check__order">#325214</div>
                </li>
                <li class="my-check__item">
                    <div class="my-check__sum my-check__sum--red">-1500 RON</div>
                    <div class="my-check__date">23.12.2020 в 24:10</div>
                    <div class="my-check__operation">Оплата заказа</div>
                    <div class="my-check__code">23064560-0006</div>
                    <div class="my-check__order">#325214</div>
                </li>
                <li class="my-check__item">
                    <div class="my-check__sum">+1500 RON</div>
                    <div class="my-check__date">23.12.2020 в 24:10</div>
                    <div class="my-check__operation">Пополнение баланса</div>
                    <div class="my-check__code">23064560-0006</div>
                    <div class="my-check__order">#325214</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:"page-check",
    props:{
    }
}
</script>