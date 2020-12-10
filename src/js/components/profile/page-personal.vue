<template>
    <div>
        <div class="personalcab__layout">
            <div class="personalcab__flex_space">

                <h2 class="profile__title">Личные данные</h2>
                <a href="" class="profile__link profile__link_title">
                    <svg viewBox="0 0 20 20">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__download'"></use>
                    </svg>
                    Выгрузить каталог
                </a>

            </div>
            <div class="personalcab__flex_company">

                <div class="profile__company-logo">
                    <svg viewBox="0 0 72 72">
                        <use :xlink:href="templatePath + 'images/sprite.svg#company-logo'"></use>
                    </svg>
                </div>
                <div class="profile__company">
                    <h3 class="profile__company-name">{{profile.company.name}}</h3>
                    <p class="profile__company-type">Юридическое лицо</p>
                </div>

            </div>
            <ul class="personalcab__columns">
                <li class="personalcab__column">
                    <svg viewBox="0 0 24 24">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__user-profile'"></use>
                    </svg>
                    <div>
                        <p class="personalcab__data">Контактное лицо</p>
                        <div class="personalcab__data-value">{{profile.contact}}</div>
                    </div>
                </li>
                <li class="personalcab__column">
                    <svg viewBox="0 0 24 24">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__call'"></use>
                    </svg>
                    <div>
                        <p class="personalcab__data">Телефон</p>
                        <div class="personalcab__data-value">{{profile.phone}}</div>
                    </div>
                </li>
                <li class="personalcab__column">
                    <svg viewBox="0 0 24 24">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__edit'"></use>
                    </svg>
                    <div>
                        <p class="personalcab__data">Код доступа</p>
                        <div class="personalcab__data-value">{{profile.code}}</div>
                    </div>
                </li>
                <li class="personalcab__column">
                    <svg viewBox="0 0 24 24">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__3d'"></use>
                    </svg>
                    <div>
                        <p class="personalcab__data">Компания</p>
                        <div class="personalcab__data-value">{{profile.company.name}}</div>
                    </div>
                </li>
                <li class="personalcab__column">
                    <svg viewBox="0 0 24 24">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__mail'"></use>
                    </svg>
                    <div>
                        <p class="personalcab__data">Электронная почта</p>
                        <div class="personalcab__data-value">{{profile.email}}</div>
                    </div>
                </li>
                <li class="personalcab__column">
                    <svg viewBox="0 0 24 24">
                        <use :xlink:href="templatePath + 'images/sprite.svg#icons__location'"></use>
                    </svg>
                    <div>
                        <p class="personalcab__data">Юридический адрес</p>
                        <div class="personalcab__data-value">{{profile.address}}</div>
                    </div>
                </li>
            </ul>
            <a href="" class="profile__link">Изменить данные</a>
        </div>
        <div class="personalcab__layout">
            <h4 class="personalcab__title">Пароль и авторизация</h4>
            <a href="" class="profile__link">Изменить пароль</a>
        </div>
        <div class="personalcab__layout">
            <h4 class="personalcab__title">Удаление профиля</h4>
            <a href="" class="profile__link">
                <svg viewBox="0 0 20 20">
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__delete'"></use>
                </svg>
                Удалить профиль
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:"page-personal",
    props:{
        profile: {
            required: true,
            type: Object,
        },
    },
}
</script>