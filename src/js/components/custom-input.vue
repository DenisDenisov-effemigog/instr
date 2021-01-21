<template>
    <label :name=item.name class="custom__label">
        <input 
            :name=item.name 
            type="text" 
            class="custom__input"
            :class="{'custom__input_error': $v.item.name.$error}"
            v-model.trim="$v.item.name.$model">
        <span class="custom__label-text"
            :class="{'custom__label-text_up': $v.item.name.required}"
        >{{item.title}}</span>
        <svg viewBox="0 0 24 24"
            class="custom__label-icon"
            v-if="$v.item.name.required"
            @click="$v.item.name.$model = ''"
        >
            <use :xlink:href="templatePath + 'images/sprite.svg#icons__times-small'"></use>
        </svg>
        <div class="custom__error-text custom__error-text_invalid"
            v-if="$v.item.name.$error">
            Ошибка при вводе данных
        </div>
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