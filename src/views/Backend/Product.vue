<template>
  <div>
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg subheader">
      <h3 style="color: green; font-size: 30px">Product Information</h3>
      <v-col lg="5" cols="6">
        <v-form @submit.prevent="search">
          <v-text-field
            v-model="keyword"
            class="p-0 m-0 mt-6"
            full-width
            dense
            append-icon="mdi-magnify"
            outlined
            rounded
            placeholder="Search"
          />
          <button @enter="search" type="submit" hidden></button>
        </v-form>
      </v-col>
      <v-btn color="success" outlined @click="toggleDialogNewProduct = true">
        New Product
      </v-btn>
    </v-subheader>

    <!-- Product -->
    <v-card elevation="2">
      <v-simple-table height="auto">
        <template>
          <thead>
            <tr>
              <th class="text-left">Number</th>
              
              <th class="text-left">Image</th>
              <th class="text-left">Name</th>
              <th class="text-left">Price</th>
              <th class="text-left">Amount</th>
              <th class="text-left">Description</th>
              <th class="text-left">Created At</th>
              <th class="text-left">Updated At</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item,index) in products" :key="item.id">
              <td>{{ index+1}}</td>
            
              <td><img :src="item.image" width="50px" /></td>
              <td>{{ item.name }}</td>
              <td>{{ format_price(item.price) }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.description }}</td>
              <td>{{ format_date(item.created_at) }}</td>
              <td>{{ format_date(item.updated_at) }}</td>
              <td>
                <i
                  class="bx bx-edit-alt edit-icon"
                  @click="EditProduct(item)"
                ></i>
                <i
                  class="bx bx-trash trash-icon"
                  @click="DeleteProduct(item)"
                ></i>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <!-- New Product -->
    <v-row justify="center">
      <v-dialog v-model="toggleDialogNewProduct" persistent max-width="600px">
        <v-form ref="form">
          <v-card>
            <v-card-title>
              <span class="text-h5">New Product</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Product Name"
                      v-model="newProduct.productName"
                      :rules="newProduct.nameRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Price"
                      v-model="newProduct.productPrice"
                      :rules="newProduct.priceRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Amount"
                      type="number"
                      v-model="newProduct.productAmount"
                      :rules="newProduct.amountRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      label="Description"
                      v-model="newProduct.productDescription"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Category"
                      v-model="newProduct.productCategory"
                      :rules="newProduct.categoryRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-row>
                    <v-col cols="4"></v-col>
                    <v-col cols="4">
                      <img
                        v-if="newProduct.productImage"
                        :src="newProduct.productImage"
                        width="200px"
                        height="200px"
                      />
                    </v-col>
                    <v-col cols="4"></v-col>
                  </v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Link Image"
                      v-model="newProduct.productImage"
                      :rules="newProduct.imageRules"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="toggleDialogNewProduct = false"
              >
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="submitFormNewProduct">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>

    <!-- Edit Product -->
    <v-row justify="center">
      <v-dialog v-model="toggleDialogEditProduct" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit Product</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Product Name"
                    :rules="editProduct.editNameRules"
                    v-model="editProduct.editProductName"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Price"
                    :rules="editProduct.editPriceRules"
                    v-model="editProduct.editProductPrice"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Amount"
                    type="number"
                    :rules="editProduct.editAmountRules"
                    v-model="editProduct.editProductAmount"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="Description"
                    v-model="editProduct.editProductDescription"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Category"
                    :rules="editProduct.editCategoryRules"
                    v-model="editProduct.editProductCategory"
                    required
                  ></v-text-field>
                </v-col>
                <v-row>
                  <v-col cols="4"></v-col>
                  <v-col cols="4">
                    <img
                      v-if="editProduct.editProductImage"
                      :src="editProduct.editProductImage"
                      width="200px"
                      height="200px"
                    />
                  </v-col>
                  <v-col cols="4"></v-col>
                </v-row>

                <v-col cols="12">
                  <v-text-field
                    label="Link Image"
                    v-model="editProduct.editProductImage"
                    :rules="editProduct.editImageRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="toggleDialogEditProduct = !toggleDialogEditProduct"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="submitFormEditProduct(editProduct.editID)"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import http from "../../Services/BackendService";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  data() {
    return {
      keyword: "",

      products: [],
      toggleDialogEditProduct: false,
      toggleDialogNewProduct: false,
      newProduct: {
        productImage: "",
        imageRules: [(v) => !!v || "Product image is required"],

        productName: "",
        nameRules: [
          (v) => !!v || "Product name is required",
          (v) =>
            (v && v.length <= 100) ||
            "Product name must be no more than 100 characters",
        ],

        productPrice: "",
        priceRules: [(v) => !!v || "Product price is required"],

        productDescription: "",

        productAmount: 0,
        amountRules: [(v) => !!v || "Product amount is required"],

        productCategory: "",
        categoryRules: [(v) => !!v || "Product category is required"],
      },
      editProduct: {
        editID: null,
        editProductImage: "",
        editImageRules: [(v) => !!v || "Product image is required"],

        editProductName: "",
        editNameRules: [
          (v) => !!v || "Product name is required",
          (v) =>
            (v && v.length <= 100) ||
            "Product name must be no more than 100 characters",
        ],

        editProductPrice: "",
        editPriceRules: [(v) => !!v || "Product price is required"],

        editProductDescription: "",

        editProductAmount: 0,
        editAmountRules: [(v) => !!v || "Product amount is required"],

        editProductCategory: "",
        editCategoryRules: [(v) => !!v || "Product category is required"],
      },
    };
  },
  created() {
    http
      .get("productRead")
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    search() {
      if (this.keyword != "") {
        http.get(`productSearch/${this.keyword}`).then((response) => {
          this.products = response.data;
        });
      } else {
        http
          .get("productRead")
          .then((response) => {
            this.products = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    DeleteProduct(item) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            http
              .delete(`productDelete/${item.id}`)
              .then(() => {
                swalWithBootstrapButtons
                  .fire("Deleted!", "Your file has been deleted.", "success")
                  .then(() => {
                    window.location.href = "/backend/product";
                  });
              })
              .catch((error) => {
                if (error.response.status == 401) {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener("mouseenter", Swal.stopTimer);
                      toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                  });

                  Toast.fire({
                    icon: "error",
                    title: "You are not logged in!!!",
                  });
                } else {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener("mouseenter", Swal.stopTimer);
                      toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                  });

                  Toast.fire({
                    icon: "error",
                    title: "Something went wrong!!! " + error.message,
                  });
                }
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Cancle Successfully!!!",
              "error"
            );
          }
        });
    },
    EditProduct(item) {
      http
        .get(`productReadID/${item.id}`)
        .then((response) => {
          this.editProduct.editID = response.data.id;
          this.editProduct.editProductImage = response.data.image;
          this.editProduct.editProductName = response.data.name;
          this.editProduct.editProductPrice = response.data.price;
          this.editProduct.editProductDescription = response.data.description;
          this.editProduct.editProductAmount = response.data.amount;
          this.editProduct.editProductCategory = response.data.category;

          this.toggleDialogEditProduct = true;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    submitFormNewProduct() {
      let newProducts = {
        image: this.newProduct.productImage,
        name: this.newProduct.productName,
        price: this.newProduct.productPrice,
        description: this.newProduct.productDescription,
        amount: this.newProduct.productAmount,
        category: this.newProduct.productCategory,
      };
      http
        .post("productCreate", newProducts)
        .then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Create Product Successfully!!!",
          }).then(() => {
            this.toggleDialogNewProduct = !this.toggleDialogNewProduct;
            window.location.href = "/backend/product";
          });
        })
        .catch((error) => {
          if (error.response.status == 401) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "error",
              title: "You are not logged in!!!",
            });
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "error",
              title: "Something went wrong!!!",
            });
          }
        });
    },
    submitFormEditProduct(id) {
      let editProducts = {
        image: this.editProduct.editProductImage,
        name: this.editProduct.editProductName,
        price: this.editProduct.editProductPrice,
        description: this.editProduct.editProductDescription,
        amount: this.editProduct.editProductAmount,
        category: this.editProduct.editProductCategory,
      };
      http
        .put(`productUpdate/${id}`, editProducts)
        .then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Update Product Successfully",
          }).then(() => {
            this.toggleDialogEditProduct = !this.toggleDialogEditProduct;
            window.location.href = "/backend/product";
          });
        })
        .catch((error) => {
          if (error.response.status == 401) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "error",
              title: "You are not logged in!!!",
            });
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "error",
              title: "Something went wrong!!!",
            });
          }
        });
    },

    // Function จัด Format วันที่
    format_date(value) {
      return moment(String(value)).format("DD/MM/YYYY hh:mm:ss");
    },

    // Function จัด Format สกุลเงิน
    format_price(value) {
      let val = (value / 1).toFixed(2).replace(",", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style>
.edit-icon {
  color: #ffffff;
  padding: 6px;
  border-radius: 6px;
  background: rgb(255, 208, 0);
  margin-right: 6px;
}
.edit-icon:hover {
  color: #ffffff;
  padding: 6px;
  border-radius: 6px;
  background: rgb(255, 175, 0);
  margin-right: 6px;
  cursor: pointer;
}
.trash-icon {
  color: #ffffff;
  padding: 6px;
  border-radius: 6px;
  background: red;
}
.trash-icon:hover {
  color: #ffffff;
  padding: 6px;
  border-radius: 6px;
  background: rgb(220, 0, 0);
  cursor: pointer;
}
.btn {
  display: inline-block;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  margin: 0 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.25;
  border-radius: 0.25rem;
  transition: all 0.15s ease-in-out;
}
.btn-success {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}
.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}
.subheader {
  margin-top: -15px;
  margin-bottom: 15px;
}
</style>
