<template>
    <a :href="catalogLink" class="catalogue-btn">{{ $tc('button.move_to_catalog') }}</a>
</template>

<script>
    import config from "../config";
export default {
    name:"catalogue-btn",
    data() {
        return {
            catalogLink: config.links.catalog,
        }
    },
}
</script>