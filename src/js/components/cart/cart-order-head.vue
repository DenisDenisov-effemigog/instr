<template>
    <div class="cart-order__head" :class="{'cart-order__head--active': mobileFlag}">
        <pre>{{getPercent}}</pre>
        <div class="cart-order__head-circle">
            <svg viewBox="0 0 100 100" class="cart-order__head-shape">
                <circle cx="50" cy="50" r="40" class="cart-order__head-circle--under"></circle>
                <circle ref="circleAbove" cx="50" cy="50" r="40" stroke="#049004" transform="rotate(180 50 50)" class="cart-order__head-circle--above"></circle>
            </svg>
            <div class="cart-order__head-icon">
                <svg>
                    <use :xlink:href="templatePath + 'images/sprite.svg#icons__cube'"></use>
                </svg>
            </div>
        </div>
        <div class="cart-order__head-text">
            Внимание! Добавьте товар на сумму {{getPrice}} ₽, чтобы доставка стала бесплатной
        </div>
    </div>
</template>

<script>
export default {
    name:"cart-order-head",
    data(){
        return{
            rightPrice: 7500
        }
    },
    props:{
        mobileFlag:{
            type:Boolean,
            default: false
        },
        currentPrice:{
            type: Number,

        }
    },
    computed:{
        getPercent(){
            setTimeout(() => {
                let percentPrice =( this.currentPrice * 100) / this.rightPrice
                const circle = this.$refs.circleAbove;
                console.log(circle)
                const dashArray = parseInt(
                    getComputedStyle(circle).getPropertyValue("stroke-dasharray")
                );
                const percent = (dashArray / 100) * (100 - percentPrice);
                return circle.style.strokeDashoffset = percent;
                console.log(dashArray)
                console.log(percent)
            }, 1000);
        },
        getPrice(){
            return this.rightPrice - this.currentPrice
        }
    }
}
</script>