<template><!--TODO не используется, не понятно как валидировать отдельные поля-->
    <label :name=item.name class="form__label form__label--column">
        <input 
            :name=item.name 
            type="text" 
            class="form__input"
            :class="{'form__input--error': $v.item.name.$error}"
            v-model.trim="$v.item.name.$model">
        <span class="form__label-text"
            :class="{'form__label-text--up': $v.item.name.required}"
        >{{ $tc(item.title) }}</span>
        <svg viewBox="0 0 24 24"
            class="form__label-icon"
            v-if="$v.item.name.required"
            @click="$v.item.name.$model = ''"
        >
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
        </svg>
        <div class="form__error-text form__error-text--invalid"
            v-if="$v.item.name.$error">{{ $tc('text.error') }}</div>
    </label>
</template>

<script>

    import {required} from "vuelidate/lib/validators";

export default {
    name: "custom-input",
    props:{
        item:{
            type: Object,
            required: false
        }
    },
    data(){
        return{
            
        }
    },
    validations:{
        item:{
            name:{
                required
            }
        }
    },
    methods:{
        click(data){
            console.log(data)
        }
    },
}
</script>