<template>
  <CartMain :t="query.t" />
</template>

<script setup lang="ts">
import CartMain from '@/pages/cart/components/CartMain.vue'

const query = defineProps<{
  t: number
}>()
</script>
