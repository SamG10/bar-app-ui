<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();

  const email = ref('');
  const password = ref('');

  const handleSubmit = async () => {
    await authStore.login(email.value, password.value);
    if (authStore.isAuthenticated) {
      router.push('/');
    } else {
      alert('Login failed. Please check your credentials and try again.');
    }
  };
</script>

<template>
  <form @submit.prevent="handleSubmit">
  <div class="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input v-model="email" required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input v-model="password" required type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-warning">Connexion</button>
</form>
</template>

<style scoped>

</style>
