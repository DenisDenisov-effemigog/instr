import VueSlickCarousel from "vue-slick-carousel";
/*elements*/
import country from './components/country.vue';
import modal from './components/modal.vue';
import mobileMenu from './components/mobile-menu.vue';
import stickyMenu from './components/sticky-menu.vue';
import stickyMobileButton from './components/sticky-mobile-button.vue';
import inFavorite from './components/in-favorite.vue';
import toCompare from './components/to-compare.vue';
import mediaButton from './components/media-button.vue';
/*catalogue*/
import catalogue from './components/catalogue/catalogue.vue';
/*header*/
import headerBlock from './components/header/header-block.vue';
import stickyHeader from './components/header/sticky-header.vue';
import homeMenu from './components/header/mobile/home-menu.vue';
import topnavSwitch from './components/topnav/topnav-switch.vue';
/*main-page*/
import sliderMain from './components/main-page/slider-main.vue';
import sliderPromo from './components/main-page/slider-promo.vue';
import sliderPromoModal from './components/main-page/slider-promo-modal.vue';
import sliderAction from './components/main-page/slider-action.vue';
import sliderCards from './components/main-page/slider-cards.vue';
/*card*/
import card from './components/card/card.vue';
import sliderPhotoCard from './components/card/slider-photo-card.vue';
import sliderPhotoDots from './components/card/slider-photo-dots.vue';
import addToCart from './components/card/add-to-cart.vue';
/*product-card*/
import productCardSlider from './components/poduct-card/product-card-slider.vue';
import productTabs from './components/poduct-card/product-tabs.vue';
import productTabsQuestions from './components/poduct-card/product-tabs-questions.vue';
import stickyCard from './components/poduct-card/sticky-card.vue';
import productCardArticle from './components/poduct-card/product-card-article.vue';
import photoModal from './components/poduct-card/photo-modal.vue';
import productInfoAll from './components/poduct-card/product-info-all.vue';
/*profile*/
import profile from './components/profile/profile.vue';
import profileMenuMobile from './components/profile/profile-menu-mobile.vue';
import pagePersonal from './components/profile/page-personal.vue';
import pageOrders from './components/profile/page-orders.vue';
import pageOrder from './components/profile/page-orders/page-order.vue';
import orderList from './components/profile/page-orders/order-list.vue';
import orderProductList from './components/profile/page-orders/order-product-list.vue';
import selectList from './components/profile/select-list.vue';
import pageCheck from './components/profile/page-check.vue';
import pageDelivery from './components/profile/page-delivery.vue';
import pageFavorite from './components/profile/page-favorite.vue';
import pageActions from './components/profile/page-actions.vue';
import editProfile from './components/profile/page-modals/edit-profile.vue';
import changePassword from './components/profile/page-modals/change-password.vue';
import deleteProfile from './components/profile/page-modals/delete-profile.vue';
import addAddress from './components/profile/page-modals/add-address.vue';

export default {
    components: {
        country,
        topnavSwitch,
        headerBlock,
        stickyHeader,
        sliderMain,
        sliderPromo,
        sliderAction,
        sliderCards,
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
        productTabs,
        productTabsQuestions,
        VueSlickCarousel,
        sliderPhotoDots,
        productCardArticle,
        photoModal,
        productInfoAll,
        stickyCard,
        sliderPromoModal,
        inFavorite,
        toCompare,
        mediaButton,
        profile,
        profileMenuMobile,
        pagePersonal,
        pageOrders,
        pageCheck,
        pageDelivery,
        pageFavorite,
        pageActions,
        selectList,
        orderList,
        orderProductList,
        editProfile,
        changePassword,
        deleteProfile,
        addAddress,
        pageOrder,
    },
}