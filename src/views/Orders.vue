<template>
  <div class="products">
      <div class="container">
        <div class="intro h-100">
        <div class="row h-100 justify-content align-items-center">
          <div class="col-md-6">
            <h3>Order Page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur autem, quisquam ducimus accusamus libero suscipit soluta neque quibusdam itaque tempore atque, consectetur, perspiciatis dolorem illum voluptatem. Maiores ipsum eum sed!
            </p>
          </div>
          <div class="col-md-6">
            <img src="../../public/img/svg/orders.svg" alt="" class="img-fluid">
          </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Orders",
  props:{
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