<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { availableCards, type HintCardData } from "@/config/cards";
import LanguageSelectPopup from "@/components/popups/LanguageSelectPopup.vue";
import HintCardPopup from "@/components/popups/HintCardPopup.vue";
import { useI18n } from "vue-i18n";
import { getOptionallyTranslatedText } from "@/config/cards";

// load initial state
const initialStorage = JSON.parse(localStorage.getItem("campaign-state")!);
const config = JSON.parse(localStorage.getItem("config")!);

const showLanguagePopup = ref(!initialStorage || !config || config.firstTime);
const showCardsPopup = ref(true);
const showInvalidCode = ref(false);
const activeCard = ref(null as HintCardData | null);

const route = useRoute();
const { locale } = useI18n({ useScope: "global" });

const gameStore = ref(
  initialStorage ?? {
    collectedCards: [],
    earnedCards: [],
    mosaicParts: [],
  }
);
const gameConfig = ref(
  config ?? {
    language: "sl_m",
    firstTime: true,
  }
);

// initialize storage if necessary
if (showLanguagePopup) {
  localStorage.setItem("campaign-state", JSON.stringify(gameStore.value));
  localStorage.setItem("config", JSON.stringify(gameConfig.value));
}

function generateMosaic() {
  // put elements with undefined z at the start, meaning they render at the bottom
  gameStore.value.mosaicParts = gameStore.value.mosaicParts
    .sort((a: any, b: any) => (a.z < b.z ? 1 : -1))
    .reverse();
}

// ensure already collected mosaic parts are always re-ordered
generateMosaic();

/**
 * Checks whether given code has been redeemed.
 * If code is not given, we pretend as if the code was redeemed, as
 * isCodeRedeemed = false will open the code card popup.
 * @param code
 */
function isCodeRedeemed(code?: string) {
  if (!code) {
    return true;
  }
  return gameStore?.value?.collectedCards?.includes(code);
}

/**
 * Checks whether card has been earned. Card has been earned
 * upon collection if no encryption is present, or upon completion
 * of QR code.
 */
function isCardEarned(code?: string) {
  if (!code) {
    return false;
  }
  return gameStore?.value?.collectedCards?.includes(code);
}

/**
 * Gets a list of mosaic parts that user will be awarded
 * @param n
 */
function getRandomMosaicPart(n: number = 1) {

}

/**
 * Checks whether code is valid.
 * For code to be valid, cards.ts->availableCards must contain object with keys
 * that matches the code. No code given is valid — it will just show our collection
 * of the codes we already gathered
 * @param code
 */
function isCodeValid(code?: string) {
  if (!code) {
    return true;
  }
  return !!availableCards[code];
}

/**
 * Updates language configuration
 * @param updatedConfig
 */
function languageUpdated(updatedConfig: any) {
  gameConfig.value = { ...gameConfig.value, ...updatedConfig };
  showLanguagePopup.value = false;

  localStorage.setItem("config", JSON.stringify(gameConfig.value));
}

/**
 * Updates cards that user has gathered.
 * NOTE: this method doesn't grant mosaic parts
 * @param cardKey
 */
function collectedCardUpdated(cardKey: string) {
  if (gameStore.value.collectedCards.includes(cardKey)) {
    return;
  }
  gameStore.value = {
    ...gameStore.value,
    collectedCards: [...gameStore.value.collectedCards, cardKey],
  };

  console.log("setting campaign state:", gameStore.value);
  localStorage.setItem("campaign-state", JSON.stringify(gameStore.value));
}

/**
 * Grants user new mosaic pieces.
 * @param cardKey
 */
function earnedCardUpdated(cardKey: string) {
  if (gameStore.value.earnedCards.includes(cardKey)) {
    return;
  }

  const newMosaicParts = getRandomMosaicPart()

  gameStore.value = {
    ...gameStore.value,
    earnedCards: [...gameStore.value.earnedCards, cardKey],
  }


}

// determine which card to show
const code = (Array.isArray(route.query.code) ? route.query.code[0] : route.query.code) ?? undefined;

if (!isCodeValid(code)) {
  showInvalidCode.value = true;
}
if (!isCodeRedeemed(code)) {
  if (code) {
    activeCard.value = availableCards[code];
    collectedCardUpdated(code);
    generateMosaic();
  }
}

function setCardsPopupState(state: boolean) {
  showCardsPopup.value = state;
}
function setActiveCard(card: HintCardData) {
  setCardsPopupState(false);
  activeCard.value = card;
}
</script>
<template>
  <div class="bg-black text-white w-full h-full min-h-[90vh] flex flex-col">
    <template v-if="showLanguagePopup">
      <LanguageSelectPopup
        :config="gameConfig"
        @configUpdated="languageUpdated"
        @close="showLanguagePopup = false"
      />
    </template>
    <template v-if="activeCard">
      <HintCardPopup :card="activeCard" @close="activeCard = null" />
    </template>
    <template v-if="showCardsPopup">
      <div class="fixed w-full h-full left-0 top-0 z-30 bg-black text-white">
        <div
          class="w-full mt-8 mb-2 border-b border-orange pb-2 px-4 flex flex-row items-center justify-between"
        >
          <h1>{{ $t("popups.hintCardList.title") }}</h1>
          <button
            class="h-full bg-orange text-black px-4 py-2"
            @click="setCardsPopupState(false)"
          >
            {{ $t("popups.close") }}
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <div
            v-for="cardKey of gameStore.collectedCards"
            :key="cardKey"
            class="flex flex-row p-1 bg-gradient-to-b from-brown to-brown/75 items-center gap-4 px-4"
          >
            <div v-if="availableCards[cardKey]" class="flex flex-col flex-1">
              <div
                class="font-serif font-bold text-emphasis text-xl text-orange"
              >
                {{
                  getOptionallyTranslatedText(
                    availableCards[cardKey].title,
                    locale
                  )
                }}
              </div>
              <div class="text-white/50">
                {{
                  getOptionallyTranslatedText(
                    availableCards[cardKey].name,
                    locale
                  )
                }}
              </div>
            </div>
            <a
              v-if="availableCards[cardKey]?.externalSite?.href"
              class=""
              target="_blank"
              :href="availableCards[cardKey]?.externalSite?.href"
            >
              {{ $t("popups.hintCardList.follow") }}
            </a>
            <button
              @click="setActiveCard(availableCards[cardKey])"
              class="text-orange border border-orange px-4 py-2 bg-gradient-to-b from-orange/25 to-orange/20"
            >
              {{ $t("popups.open") }}
            </button>
          </div>
        </div>
      </div>
    </template>
    <div class="w-full flex flex-row justify-end">
      <div class="" @click="setCardsPopupState(true)">
        Moje kartice ({{ gameStore.collectedCards.length }})
      </div>
    </div>
    <div class="relative w-full h-full flex-1">
      <div
        v-for="mosaicPart of gameStore.mosaicParts"
        :key="mosaicPart.path"
        class="w-full h-full absolute left-0 top-0"
        style="background-size: contain; background-repeat: no-repeat"
        :style="{ 'background-image': `url(${mosaicPart.path})` }"
      ></div>
    </div>
  </div>
</template>
