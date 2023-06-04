<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const props = defineProps({
  config: Object
})
const emit = defineEmits(['configUpdated', 'close']);
const { locale } = useI18n({useScope: 'global'});


function selectLocale(newLocale: 'sl_m' | 'sl_f' | 'en') {
  locale.value = newLocale;

  if (!props.config) {
    return;
  }
  props.config.firstTime = false;
  props.config.language = newLocale;

  emit('configUpdated', props.config);
}

</script>
<template>
  <div class="fixed w-full h-full top-0 left-0 z-40 popup-root bg-black text-white">
    <div class="h-full w-full flex justify-center items-center">
      <div class="flex flex-col items-center justify-center">
        <h1 class="mx-4 text-orange text-center" >{{ $t('tutorial.title') }}<br/><small class="text-orange/60">{{ $t('tutorial.tldr') }}</small></h1>

        <div class="text-center mt-16 mx-4">
          <h3 class="text-orange">{{ $t('tutorial.detailTitle') }}</h3>
          <p class="mt-2 text-left">{{ $t('tutorial.intro') }}</p>
          <p class="mt-2 text-left text-white">{{ $t('tutorial.aboutCard') }}</p>
          <p class="mt-2 text-left">{{ $t('tutorial.gib') }}</p>
          <p class="mt-2 font-bold text-orange text-center">{{ $t('tutorial.disclaimer') }}</p>
          <p class="mt-4 text-center text-white/50"><small>{{$t('tutorial.disclaimer2')}}</small></p>
        </div>

        <div class="mt-8">
          <button class="border border-orange text-orange px-6 py-3" @click="emit('close')">
            <template v-if="props.config?.firstTime">{{ $t('languageSelectPopup.continue') }}</template>
            <template v-else>{{ $t('languageSelectPopup.continue') }}</template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.popup-root {

  background-color: #000;
}
</style>
