<template>
  <ul
    ref="sub"
    class="catalogue__subcategories"
    :class="{ 'catalogue__subcategories--open': openFlag }"
  >
    <li
      class="catalogue__subcategory"
      v-for="(subcategory, index) in subcategories"
      :key="index"
    >
      <a :href="subcategory.url" class="catalogue__subcategory-link">{{
        subcategory.title
      }}</a>
      <furtherSubcategories
        :categories="subcategory.subcategories"
      ></furtherSubcategories>
    </li>
  </ul>
</template>

<script>
import furtherSubcategories from "./catalogue-further-subcategories.vue";

export default {
  name: "catalogue-subcategories",
  props: {
    categories: {
      type: Array,
      default: () => ({}),
      required: true,
    },
    openFlag: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    furtherSubcategories,
  },
  computed: {
    subcategories() {
      return this.categories;
    },
  },
  methods: {
    catHeight() {
    //   let category = this.$refs.sub.classList.contains(
    //     "catalogue__subcategories--open"
    //   );
      let height = 0;
      if (openFlag && window.innerWidth > 990) {
        this.$refs.sub.children.forEach(function (item) {
        height += item.clientHeight + 26;
        })
        if (height / 3 > 1014) {
          this.$emit("catHeight", height / 3);
        } else {
          this.$emit("catHeight", 1014);
        }

        // if (window.innerWidth < 1440) {
        //     this.$refs.sub.children.forEach(function (item) {
        //     height += item.clientHeight + 26;
        //   });
        //   if (height / 3 > 1014) {
        //     this.$emit("catHeight", height / 3);
        //   }
        // } else {
        //   this.$emit("catHeight", 1014);
        // }
      }
    },
  },
  mounted() {
    this.catHeight();
  },
  created() {
    this.$eventBus.$on("catMouseOver", this.catHeight);
    window.addEventListener("resize", this.catHeight);
  },
};
</script>
