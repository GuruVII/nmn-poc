
<script setup lang="ts">
import type { HintCardData } from '@/config/cards';
import { getOptionallyTranslatedText, HintCardFormat } from '@/config/cards';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props: {card?: HintCardData} = defineProps(['card']);
const emit = defineEmits(['close']);

const { locale } = useI18n({useScope: 'global'});

const currentCardIndex = ref(0)

</script>
<template>
  <div class="fixed top-0 left-0 w-full z-30 h-full bg-black text-white flex flex-col">

    <!-- header -->
    <div class="flex flex-row items-center bg-gradient-to-b from-brown to-brown/75 space-between w-full px-3 py-2">
      <a class="flex flex-col flex-1 text-orange" target="_blank">
        <h1>{{ getOptionallyTranslatedText(props.card?.title ?? '', locale) }}</h1>
        <span class="text-white/75">{{getOptionallyTranslatedText(props.card?.name ?? '', locale) }} <template  v-if="props.card?.externalSite?.href"> — <a class="text-orange/75" :href="props.card?.externalSite?.href" target="_blank">{{ $t('popups.hintCard.follow') }}</a></template></span>
      </a>
      <button class="h-full border border-orange bg-gradient-to-b from-orange/25 to-orange/20 text-orange px-6 flex items-center justify-center" @click="emit('close')">
        {{$t('popups.close')}}
      </button>
    </div>

    <!-- body -->
    <div class="flex flex-1 flex-shrink-1 overflow-auto">

      <!-- card type: text -->
      <template v-if="props.card?.hintCards[currentCardIndex].cardFormat === HintCardFormat.Text">
        <div class="font-hand w-full h-full overflow-auto p-4">
          <div v-html="getOptionallyTranslatedText(props.card?.hintCards[currentCardIndex].text ?? '', locale)"></div>
        </div>
      </template>

      <!-- card type: text + image | image is 1:1 aspect ratio -->
      <template v-else-if="props.card?.hintCards[currentCardIndex].cardFormat === HintCardFormat.ImageText">
        <div class="flex flex-col w-full h-full">

          <!-- image -->
          <div
            class="card-image-text frame flex-grow-0 flex-shrink-0 p-4"
          >
            <div
              class="card-image-text image"
              :style="{'background-image': `url(${props.card?.hintCards[currentCardIndex].imageUrl})` }"
            >
            </div>
          </div>

          <!-- text -->
          <div class="card-image-text text-frame flex-1 overflow-auto">
            <div v-html="getOptionallyTranslatedText(props.card?.hintCards[currentCardIndex].text ?? '', locale)"></div>
          </div>
        </div>
      </template>

      <!-- card type: image only -->
      <template v-else>
        <div
            class="card-image frame w-full h-full"
          >
            <div
              class="card-image image w-full h-full"
              :style="{'background-image': `url(${props.card?.hintCards[currentCardIndex].imageUrl})` }"
            >
            </div>
          </div>
      </template>
    </div>

    <!-- navigation in case of multi-cards -->
    <div class="flex flex-row justify-between bg-gradient-to-b from-brown to-brown/75 h-[3rem] items-center w-full px-4  leading-none">
      <div class="w-[2rem] h-[2rem] border-orange bg-gradient-to-b from-orange/25 to-orange/20 text-orange flex items-center justify-center" @click="currentCardIndex = Math.max(0, currentCardIndex - 1)">
        ←
      </div>

      <div>
        {{ currentCardIndex + 1 }} / {{ props.card?.hintCards.length }}
      </div>

      <div class="w-[2rem] h-[2rem] border-orange bg-gradient-to-b from-orange/25 to-orange/20 text-orange flex items-center justify-center" @click="currentCardIndex = Math.max(0, currentCardIndex + 1)">
        →
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.card-image .image,
.card-image-text .image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.card-image-text .image {
  display: block;
  width: 100%;
  aspect-ratio: 1;
}
</style>
