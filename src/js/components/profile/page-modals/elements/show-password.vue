<template>
    <div>
        <div class="profile-modal__icon" @click="hidePassword = !hidePassword">
            <svg viewBox="0 0 24 24" v-if="hidePassword">
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__eye-closed'"></use>
            </svg>
            <svg viewBox="0 0 24 24" v-else>
                <use :xlink:href="templatePath + 'images/sprite.svg#icons__eye'"></use>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'show-password',
        props: {
            value: {
                type: Boolean,
                required: true
            }
        },
        model: {
            prop: 'value',
            event: 'internal_model_change',
        },
        computed: {
            hidePassword: {
                get: function () {
                    return this.value;
                },
                set: function (newValue) {
                    this.$emit('internal_model_change', newValue);
                }
            }
        }

    }
</script>