<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

</script>

<template>
  <UCard class="m-1">
    <div class="flex justify-stretch content-center items-center">
      <div class="flex-1">
        <div class="flex items-center">
<!--          <UIcon style="width: 50px; height: 50px" name="i-heroicons-moon"/>-->
          <h1 class="m-1">Espaço para divulgação de vagas para front-enders.</h1>

        </div>

      </div>

      <div>
        <UButton
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
        />
      </div>
    </div>
  </UCard>
</template>

<style scoped>

</style>
