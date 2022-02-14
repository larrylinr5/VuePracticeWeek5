import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.prod.min.js";

const app = createApp({
    data() {
        return {
            //#region call api 變數
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "larrylinr5",
            //#endregion

            // 購物車列表
            cartData: {},
            // 產品列表
            products: [],
            //產品id
            productId: '',
            //局部讀取效果
            isLoadingItem: ''
        }
    },
    methods: {
        getProducts() {
            axios.get(`${this.url}/api/${this.path}/products/all`)
                // 成功的結果
                .then((response) => {
                    this.products = response.data.products;
                })
                // 失敗的結果
                .catch((error) => {
                    alert('取得產品列表失敗');
                });
        },
        openProductModal(id) {
            this.productId = id
            this.$refs.productModal.openModal()
        },
        getCart() {
            axios.get(`${this.url}/api/${this.path}/cart`)
                // 成功的結果
                .then((response) => {
                    this.cartData = response.data.data;
                })
                // 失敗的結果
                .catch((error) => {
                    alert('取得購物車失敗');
                });
        },
        addToCart(id, qty = 1) {
            const data = {
                product_id: id,
                qty
            }
            this.isLoadingItem = id
            axios.post(`${this.url}/api/${this.path}/cart`, { data })
                // 成功的結果
                .then((response) => {
                    this.getCart()
                    this.isLoadingItem = ''
                    this.$refs.productModal.closeModal()
                })
                // 失敗的結果
                .catch((error) => {
                    alert('新增購物失敗');
                    this.isLoadingItem = ''
                });
        },
        removeCartItem(id) {
            this.isLoadingItem = id
            axios.delete(`${this.url}/api/${this.path}/cart/${id}`)
                // 成功的結果
                .then((response) => {
                    this.getCart()
                    this.isLoadingItem = ''
                })
                // 失敗的結果
                .catch((error) => {
                    alert('刪除失敗');
                    this.isLoadingItem = ''
                });
        },
        removeCart() {
            axios.delete(`${this.url}/api/${this.path}/carts`)
                // 成功的結果
                .then((response) => {
                    this.getCart()
                })
                // 失敗的結果
                .catch((error) => {
                    alert('清空失敗');
                });
        },
        UpdateCartItem(item) {
            const data = {
                product_id: item.id,
                qty: item.qty
            }
            this.isLoadingItem = item.id
            axios.put(`${this.url}/api/${this.path}/cart/${item.id}`, { data })
                // 成功的結果
                .then((response) => {
                    this.getCart()
                    this.isLoadingItem = ''
                })
                // 失敗的結果
                .catch((error) => {
                    alert('更新失敗');
                    this.isLoadingItem = ''
                });
        },
    },
    mounted() {
        this.getProducts()
        this.getCart()
    }
})

app.component('product-modal', {
    props: ['id'],
    template: '#userProductModal',
    data() {
        return {
            //#region call api 變數
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "larrylinr5",
            //#endregion

            //modal實體
            modal: '',
            //產品物件
            product: {},
            qty: 1
        }
    },
    //在這個生命週期設定Modal
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal);
    },
    watch: {
        id() {
            this.getProduct()
        }
    },
    methods: {
        //開啟元件的modal
        openModal() {
            this.modal.show()
        },
        //關閉元件的modal
        closeModal() {
            this.modal.hide()
        },
        //透過id取得一筆取得產品物件
        getProduct() {
            axios.get(`${this.url}/api/${this.path}/product/${this.id}`)
                // 成功的結果
                .then((response) => {
                    this.product = response.data.product;
                })
                // 失敗的結果
                .catch((error) => {
                    alert('透過id取得一筆取得產品物件失敗');
                });
        },
        addToCart(id) {
            this.$emit('add-cart', this.product.id, this.qty)
        }
    }
})

app.mount("#app");