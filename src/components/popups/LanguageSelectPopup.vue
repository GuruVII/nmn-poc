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
        <h3>Jezik/language</h3>
        <div class="flex flex-row gap-4 text-center mt-4">
          <a
            class="px-6 py-2 border border-orange"
            :class="{
              'bg-orange text-black hover:text-black': locale === 'sl_m'
            }"
            @click="selectLocale('sl_m')"
          >
            Slovenščina<br/>
            <small>(moški spol)</small>
          </a>
          <a
            class="px-6 py-2 border border-orange"
            :class="{
              'bg-orange text-black hover:text-black': locale === 'sl_f'
            }"
            @click="selectLocale('sl_f')"
          >
            Slovenščina<br/>
            <small>(ženski spol)</small>
          </a>
          <a
            class="px-6 py-2 border border-orange"
            :class="{
              'bg-orange text-black hover:text-black': locale === 'en'
            }"
            @click="selectLocale('en')"
          >
            English
          </a>
        </div>

        <div class="text-center mt-16">
          <h3>{{$t('languageSelectPopup.gdprH3')}}</h3>
          <p>{{$t('languageSelectPopup.gdprP1')}}</p>
          <p>{{$t('languageSelectPopup.gdprP2')}}</p>
          <p><small>{{$t('languageSelectPopup.gdprP3')}}</small></p>
        </div>

        <div class="mt-8">
          <button class="border border-orange text-orange px-6 py-3" @click="emit('close')">
            <template v-if="props.config?.firstTime">{{ $t('languageSelectPopup.continue') }}</template>
            <template v-else>{{ $t('languageSelectPopup.close') }}</template>
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
