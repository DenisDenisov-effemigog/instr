import VueSlickCarousel from "vue-slick-carousel";
/*elements*/
import country from './components/country.vue';
import customInput from './components/custom-input.vue';
import addAddressBtn from './components/add-address-btn.vue';
import modal from './components/modal.vue';
import mobileMenu from './components/mobile-menu.vue';
import stickyMenu from './components/sticky-menu.vue';
import stickyMobileButton from './components/sticky-mobile-button.vue';
import inFavorite from './components/in-favorite.vue';
import toCompare from './components/to-compare.vue';
import mediaButton from './components/media-button.vue';
import paginationBtn from './components/partials/pagination-btn.vue';
/*catalogue*/
import catalogue from './components/catalogue/catalogue.vue';
import catalogueSubcategories from './components/catalogue/catalogue-subcategories.vue';
import furtherSubcategories from './components/catalogue/catalogue-further-subcategories.vue';
/*header*/
import cartMini from './components/header/cart-mini.vue';
import headerBlock from './components/header/header-block.vue';
import stickyHeader from './components/header/sticky-header.vue';
import user from './components/header/header-modal/user.vue';
import tooltipProfile from './components/header/tooltip-profile.vue';
import homeMenu from './components/header/mobile/home-menu.vue';
import topnavSwitch from './components/topnav/topnav-switch.vue';
/*main-page*/
import sliderMain from './components/main-page/slider-main.vue';
import sliderPromo from './components/main-page/slider-promo.vue';
import sliderPromoModal from './components/main-page/slider-promo-modal.vue';
import sliderAction from './components/main-page/slider-action.vue';
import sliderCards from './components/main-page/slider-cards.vue';
import sliderCollection from './components/main-page/mobile/slider-collection.vue';
/*card*/
import card from './components/card/card.vue';
import sliderPhotoCard from './components/card/slider-photo-card.vue';
import sliderPhotoDots from './components/card/slider-photo-dots.vue';
import addToCart from './components/card/add-to-cart.vue';
import cardStikers from './components/card/card-stikers.vue';
/*product-card*/
import productCardSlider from './components/product-card/product-card-slider.vue';
import productCardHeader from './components/product-card/product-card-header.vue';
import productTabs from './components/product-card/product-tabs.vue';
import productTabsQuestions from './components/product-card/product-tabs-questions.vue';
import stickyCard from './components/product-card/sticky-card.vue';
import productCardArticle from './components/product-card/product-card-article.vue';
import photoModal from './components/product-card/photo-modal.vue';
import productInfoAll from './components/product-card/product-info-all.vue';
import productOrderBlock from './components/product-card/product-order-block.vue';
import productDiscountInfo from './components/product-card/product-discount-info.vue';
/*profile*/
import profile from './components/profile/profile.vue';
import pagePersonal from './components/profile/page-personal.vue';
import pageOrders from './components/profile/page-orders.vue';
import pageOrder from './components/profile/page-orders/page-order.vue';
import orderList from './components/profile/page-orders/order-list.vue';
import order from './components/profile/page-orders/order.vue';
import orderProductList from './components/profile/page-orders/order-product-list.vue';
import selectList from './components/partials/select-list.vue';
import pageCheck from './components/profile/page-check.vue';
import pageDelivery from './components/profile/page-delivery.vue';
import editProfile from './components/profile/page-modals/edit-profile.vue';
import changePassword from './components/profile/page-modals/change-password.vue';
import deleteProfile from './components/profile/page-modals/delete-profile.vue';
import addAddress from './components/profile/page-modals/add-address.vue';
import repeatOrder from './components/profile/page-modals/repeat-order.vue';
/*listing*/
import filters from './components/listing/filters/filters.vue';
import allCategories from './components/listing/all-categories.vue';
import listingSubcategories from './components/listing/listing-subcategories.vue';
import filterBlock from './components/listing/filters/filter-block.vue';
import filterClearBtn from './components/listing/filters/filter-clear-btn.vue';
import filterControlRange from './components/listing/filters/filter-control-range.vue';
import FilterControlsCheckbox from './components/listing/filters/filter-controls-checkbox.vue';
import FilterControlsSwitch from './components/listing/filters/filter-controls-switch.vue';
import displayingCards from './components/listing/displaying-cards.vue';
import filterButton from './components/listing/filter-button.vue';
import stickyListingActions from './components/listing/sticky-listing-actions.vue';
import listingContent from './components/listing/listing-content.vue';
import listingItemsQuantity from './components/listing/listing-items-quantity.vue';
/*cart*/
import cart from './components/cart/cart.vue';
import cartOrder from './components/cart/cart-order.vue';
import cartOrderHead from './components/cart/cart-order-head.vue';
import cartSearch from './components/cart/cart-search.vue';
import selectedItem from './components/cart/selected-item.vue';
import selectedItems from './components/cart/selected-items.vue';
/*checkout*/
import checkout from './components/checkout/checkout.vue'
import checkoutReg from './components/checkout/checkout-reg.vue'
import checkoutDelivery from './components/checkout/checkout-delivery.vue'
import deliveryAddress from './components/checkout/delivery-address.vue'
import deliveryDate from './components/checkout/delivery-date.vue'
import deliveryComment from './components/checkout/delivery-comment.vue'
import receiveAddress from './components/checkout/receive-address.vue'

export default {
    components: {
        country,
        topnavSwitch,
        cartMini,
        headerBlock,
        stickyHeader,
        sliderMain,
        sliderPromo,
        sliderAction,
        sliderCards,
        sliderCollection,
        card,
        sliderPhotoCard,
        catalogue,
        addToCart,
        mobileMenu,
        homeMenu,
        stickyMenu,
        modal,
        stickyMobileButton,
        productCardSlider,
        productCardHeader,
        productTabs,
        productTabsQuestions,
        VueSlickCarousel,
        sliderPhotoDots,
        productCardArticle,
        photoModal,
        productInfoAll,
        stickyCard,
        sliderPromoModal,
        productOrderBlock,
        productDiscountInfo,
        inFavorite,
        toCompare,
        mediaButton,
        paginationBtn,
        profile,
        pagePersonal,
        pageOrders,
        pageCheck,
        pageDelivery,
        selectList,
        orderList,
        order,
        orderProductList,
        editProfile,
        changePassword,
        deleteProfile,
        addAddress,
        pageOrder,
        repeatOrder,
        user,
        tooltipProfile,
        cardStikers,
        catalogueSubcategories,
        furtherSubcategories,
        filters,
        filterBlock,
        displayingCards,
        filterButton,
        filterControlRange,
        FilterControlsCheckbox,
        FilterControlsSwitch,
        stickyListingActions,
        listingContent,
        listingItemsQuantity,
        filterClearBtn,
        cart,
        allCategories,
        listingSubcategories,
        cartSearch,
        cartOrder,
        cartOrderHead,
        checkout,
        checkoutReg,
        checkoutDelivery,
        deliveryAddress,
        addAddressBtn,
        customInput,
        receiveAddress,
        deliveryDate,
        deliveryComment,
        selectedItem,
        selectedItems,
    },
}