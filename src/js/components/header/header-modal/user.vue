<template>
    <div class="user">
        <div class="user-tabs">
            <div class="user-tabs__tab">Вход</div>
            <div class="user-tabs__tab">Регистрация</div>
        </div>
        <div class="user-content">
            <div class="user-login">
                <form class="user-login__form">
                    <label name="email" class="user-login__label">
                        <span class="user-login__label-text" v-if="email">Email</span>
                        <input
                            class="user-login__input"
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            autocorrect="off"
                            autocapitalize="off"
                            placeholder="Email"
                            v-model.trim="email">
                        <svg viewBox="0 0 24 24">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg>
                    </label>
                    <label name="password" class="user-login__label">
                        <span class="user-login__label-text" v-if="newPassword">
                            Новый пароль
                        </span>
                        <input
                            class="user-login__input"
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Новый пароль"
                            v-model.trim="newPassword">
                        <svg viewBox="0 0 24 24">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__eye'"></use>
                        </svg>
                    </label>
                    <div class="user-login__text"></div>
                    <input type="submit" class="user-login__button" value="Войти">
                </form>
            </div>
            <div class="user-reg">
                <div class="user-reg__form">
                    <label name="reason" class="user-reg__radio">
                        <input
                            type="radio"
                            name="reason"
                            value="1">
                        <span class="user-reg__check"></span>
                        <span class="user-reg__radio-label">Юридическое лицо</span>
                    </label>
                    <label name="reason" class="user-reg__radio">
                        <input
                            type="radio"
                            name="reason"
                            value="1">
                        <span class="user-reg__check"></span>
                        <span class="user-reg__radio-label">Физическое лицо</span>
                    </label>
                    <label for="" class="user-reg__range">
                        <input type="range">
                        <span>Плательщик НДС</span>
                    </label>
                    <label name="name" class="user-reg__label">
                        <span class="user-reg__label-text" v-if="name">Контактное лицо</span>
                        <input
                            class="user-reg__input"
                            type="text"
                            name="name"
                            id="name"
                            autocomplete="name"
                            autocorrect="off"
                            placeholder="Контактное лицо"
                            v-model.trim="name">
                        <svg viewBox="0 0 24 24">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg>
                    </label>
                    <label name="company" class="user-reg__label">
                        <span class="user-reg__label-text" v-if="company">Компания</span>
                        <input
                            class="user-reg__input"
                            type="text"
                            name="company"
                            id="company"
                            autocomplete="organization"
                            autocorrect="off"
                            placeholder="Компания"
                            v-model.trim="company">
                        <svg viewBox="0 0 24 24">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg>
                    </label>
                    <label name="code" class="user-reg__label">
                        <span class="user-reg__label-text" v-if="code">Код доступа</span>
                        <input
                            class="user-reg__input"
                            type="text"
                            name="code"
                            id="code"
                            placeholder="Код доступа"
                            v-model.trim="code">
                        <svg viewBox="0 0 24 24">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg>
                    </label>
                    <label name="tel" class="user-reg__label">
                        <span class="user-reg__label-text" v-if="phone">Номер телефона</span>
                        <input
                            class="user-reg__input"
                            type="tel"
                            name="tel"
                            id="tel"
                            autocomplete="tel"
                            autocorrect="off"
                            placeholder="Номер телефона"
                            v-model.trim="phone">
                        <svg viewBox="0 0 24 24">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg>
                    </label>
                    <label name="email" class="user-reg__label">
                        <span class="user-reg__label-text" v-if="email">Email</span>
                        <input
                            class="user-reg__input"
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            autocorrect="off"
                            autocapitalize="off"
                            placeholder="Email"
                            v-model.trim="email">
                        <svg viewBox="0 0 24 24">
                            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
                        </svg>
                    </label>
                    <input type="submit" class="user-reg__button" value="Зарегистрироваться">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'user',

}
</script>