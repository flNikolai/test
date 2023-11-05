<template>
  <div class="wrapper">
    <the-header />

    <div class="main">
      <the-sidebar />

      <div class="content">
        <routing />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TheHeader } from '@/widgets/TheHeader'
import { TheSidebar } from '@/widgets/TheSidebar'
import { Routing } from './providers/router'
</script>

<style>
@import './index.scss';
</style>
