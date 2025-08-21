<script setup>
import { computed } from "vue";
import i18n from "@/plugins/i18n";

const localeLang = computed(() => {
  return i18n.global.locale;
});

const change = () => {
  i18n.global.locale = localeLang.value === "ru" ? "en" : "ru";
};
</script>

<template>
  <button class="lang-change" @click="change">
    {{ localeLang === "ru" ? "En" : "Ru" }}
  </button>
</template>

<style scoped lang="scss">
.lang-change {
  position: fixed;
  top: 30px;
  right: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  border-radius: 50%;
  background-color: #fff;
}
</style>
