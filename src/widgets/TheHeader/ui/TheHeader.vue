<template>
  <header class="header">
    <div class="header__inner">
      <RouterLink :to="{ name: 'Home' }"
                  class="logo">
        <h1 class="logo__text">Жилфонд</h1>
      </RouterLink>
      <div class="user">Пользователь</div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
