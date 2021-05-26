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
      <a :href="subcategory.url" class="catalogue__subcategory-link">
        {{ subcategory.title }}
      </a>
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
    catHeight: { type: Function}
  },
  data() {
      return {
        height: 1014
      }
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
    blockHeight() {
      let height = 0;
      this.$refs.sub.children.forEach(function(item) {
        height += item.clientHeight + 26;
      })
      if (this.openFlag && window.innerWidth > 990) {
        height / 3 > 1014 ? this.height = height / 3 : this.height = 1014
        // this.$emit("catHeight", this.height)
      }
    },
    // catHeight() {
    //   let height = 0;
    //   this.$refs.sub.children.forEach(function(item) {
    //     height += item.clientHeight + 26;
    //   })
    //   if (this.openFlag && window.innerWidth > 990) {
    //     height / 3 > 1014 ? this.height = height / 3 : this.height = 1014
    //     this.$emit("catHeight", this.height)
    //   }
    // },
  },
  mounted() {
    this.blockHeight();
    if (this.openFlag && window.innerWidth > 990) {
        this.catHeight(this.height);
    }
    // this.catHeight();
  },
  created() {
    this.$eventBus.$on("catMouseOver", this.catHeight);
    window.addEventListener("resize", this.catHeight);
  },
};
</script>
