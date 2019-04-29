<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur autem, quisquam ducimus!</p>
          </div>
          <div class="col-md-6">
            <img src="../../public/img/svg/products.svg" alt class="img-fluid">
          </div>
        </div>
      </div>

      <hr>

      <div class="product-test">
        <h3 class="d-inline-block">Product list</h3>
        <button @click="addNew" class="btn btn-primary float-right">Add Product</button>
        <div class="tabe-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Modify</th>
              </tr>
            </thead>

            <thead>
              <tr v-for="product in products">
                <td>{{product.name}}</td>

                <td>{{product.price}}</td>

                <td>
                  <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
                  <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="product" aria-describedby="editLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-8">
                <div class="form-group">
                  <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                </div>

                <div class="form-group">
                  <vue-editor v-model="product.description"></vue-editor>
                  <!-- <textarea name="description" class="form-control" placeholder="Product description" v-model="product.description"></textarea> -->
                </div>
              </div>

              <div class="col-md-4">
                <h4 class="display-6">Product Details</h4>
                <hr>

                <div class="form-group">
                  <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                </div>

                <div class="form-group">
                  <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">

                  <div class="d-flex">
                    <p v-for="tag in product.tags">
                      <span class="p-1">{{ tag }}</span>
                    </p>
                  </div>
                </div>

                <div class="form-group">
                  <label for="product_image">Product Image</label>
                  <input type="file" @change="uploadImage" class="form-control">
                </div>

                <div class="form-group d-flex">
                  <div width="80px" v-for="(image, index) in product.images" class="p-1">
                    <div class="img-wrapp">
                      <img :src="image" alt width="80px">
                    <span class="delete-img" @click="deleteImgae(image, index)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->

            <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
            <button @click="updateProduct()" type="button"  class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import { VueEditor } from "vue2-editor";
import { fb, db } from "../firebase.js";
import { storage } from "firebase";
export default {
  name: "Products",
  props: {
    msg: String
  },
  components: {
    VueEditor
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      },
      activeItem: null,
      modal: null,
      tag: null
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    deleteImgae(img, index){
      let image = fb.storage().refFromURL(img);

      this.product.images.splice(index, 1);

      image.delete().then(function(){
        console.log('image deleted');
      }).catch(function(error){
        console.log('an error occured');
      })
    },


    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },


    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];

        var storageRef = fb.storage().ref("products/" + file.name);

        let uploadTask = storageRef.put(file);

        console.log(e.target.files[0]);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.product.images.push(downloadURL);
              console.log("File available at", downloadURL);
            });
          }
        );
      }
    },

    reset(){
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      }
    },

    addNew() {
      this.modal = "new";
      this.reset();
      $("#product").modal("show");
    },


    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      Toast.fire({
        type: "success",
        title: "Updated  successfully"
      });
      $("#product").modal("hide");
    },


    editProduct(product) {
      this.product = product;
      this.modal = "edit";
      // this.activeItem = product['.key'];
      $("#product").modal("show");
    },


    deleteProduct(doc) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.products.doc(doc.id).delete();
          Toast.fire({
            type: "success",
            title: "Deleted  successfully"
          });
        }
      });
    },

    
    readData() {},


    addProduct() {
      this.$firestore.products.add(this.product);
      Toast.fire({
        type: "success",
        title: "Product created  successfully"
      });
      $("#product").modal("hide");
    }
  },
  created() {}
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-wrapp {
  position: relative;
}
.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}
.img-wrapp span.delete-img:hover {
  cursor: pointer;
}
</style>