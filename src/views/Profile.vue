<template>
  <div class="products">
      <div class="container">
        <div class="intro h-100">
        <div class="row h-100 justify-content align-items-center">
          <div class="col-md-6">
            <h3>Profile settings</h3>
            <p>
              Change your profile settings here
            </p>
          </div>
          <div class="col-md-6">
            <img src="../../public/img/svg/profile.svg" alt="" class="img-fluid">
          </div>
        </div>
      </div>

      <div class="profile-content">
        <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
          </li>

          <li class="nav-item">
            <a class="nav-link"  id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="false">Account settings</a>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active pt-3" id="profile" role="tabpanel" aria-describedby="profile-tab">

            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" v-model="profile.name" name="" placeholder="Full name" class="form-control">
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" v-model="profile.phone" name="" placeholder="Phone" class="form-control">
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <input type="text" v-model="profile.address" name="" placeholder="Address" class="form-control">
                  </div>
                </div>

                <div class="col-md-8">
                  <div class="form-group">
                    <input type="text" v-model="profile.postCode" name="" placeholder="Postcode" class="form-control">
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <input type="submit" @click="updateProfile" name="" value="Save Changes" class="btn btn-primary w-100">
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-describedby="account-tab">
            <div class="container">
              <div class="row">
                <div class="col-md-">
                  <!-- <div class="alert alert-info">
                    Please use the Reset password email button for reseting the password. The form doens't work currently
                  </div> -->
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" v-model="account.name" placeholder="User name" class="form-control">
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" v-model="account.email"  placeholder="Email address" class="form-control">
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" v-model="account.password" placeholder="New password" class="form-control">
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" v-model="account.confirmPassword" placeholder="Confirm password" class="form-control">
                  </div>
                </div>

                <div class="col-md-8">
                  <div class="form-group">
                    <input type="file" @change="uploadImage" class="form-control">
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <input type="submit" value="Save Changes" class="btn btn-primary w-100">
                  </div>
                </div>

                <!-- <div class="col-md-4">
                  <div class="form-group">
                    <input type="button" value="Reset password email" class="btn btn-success w-100">
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { fb, db } from '../firebase.js';
export default {
  name: "profile",
  components: {
    VueEditor
  },
  props:{
    msg: String
  },
  data(){
    return{
      profile:{
        name: null,
        phone: null,
        address: null,
        postCode: null
      },

      account:{
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid:null
      }
    }
  },
  firestore(){
      const user = fb.auth().currentUser;
      return {
        profile: db.collection('profiles').doc(user.uid),
      }
  },
  methods:{
    updateProfile(){
      this.$firestore.profile.update(this.profile);
    },
    uploadImage(){
    },
    created(){

    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
  cursor: pointer;
}
</style>