<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="cardContainer">
      <div class="cardBackground1">
        <img src="../assets/cocktail_1.png" alt="cocktail_1" width="300px" />
      </div>
    </div>
    <div class="cardContainer">
      <div class="cardBackground2">
        <img src="../assets/cocktail_1.png" alt="cocktail_1" width="300px" />
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <router-link to="/menu" class="btn btn-outline-warning">Menu</router-link>
  </div>
</template>

<style scoped>
.container {
  height: calc(100vh - 250px);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.cardContainer {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background-color: white;
  width: 300px;
  height: 500px;
  padding: 40px;
}

.cardBackground1 {
  background-color: #91c2c5;
  display: flex;
  justify-content: center;
}
.cardBackground2 {
  background-color: #92c991;
  display: flex;
  justify-content: center;
}
</style>
