export default {
    props: ['id'],
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
    },
    template: `
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>{{ product.title }}</span>
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <img class="img-fluid" :src="product.imageUrl" alt="" />
                            </div>
                            <div class="col-sm-6">
                                <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
                                <p>商品描述：{{ product.description }}</p>
                                <p>商品內容：{{ product.content }}</p>
                                <div class="h5" v-if="product.price===product.origin_price">{{ product.price }} 元</div>
                                <div v-else>
                                    <del class="h6">原價 {{ product.origin_price }} 元</del>
                                    <div class="h5">現在只要 {{ product.price }} 元</div>
                                </div>
                                <div>
                                    <div class="input-group">
                                        <select id="" class="form-select" v-model="qty"
                                            :disabled="isLoadingItem===product.id">
                                            <option :value="num" v-for="num in 20" :key="product.id+num">
                                                {{ num }}
                                            </option>
                                        </select>
                                        <button type="button" class="btn btn-primary" @click="addToCart">
                                            加入購物車
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- col-sm-6 end -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}