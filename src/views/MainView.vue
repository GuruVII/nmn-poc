<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { availableCards, type HintCardData } from "@/config/cards";
import LanguageSelectPopup from "@/components/popups/LanguageSelectPopup.vue";
import SimpleTutorialPopup from "@/components/popups/SimpleTutorialPopup.vue";
import HintCardPopup from "@/components/popups/HintCardPopup.vue";
import { useI18n } from "vue-i18n";
import { getOptionallyTranslatedText } from "@/config/cards";

// load initial state
const initialStorage = JSON.parse(localStorage.getItem("campaign-state")!);
const config = JSON.parse(localStorage.getItem("config")!);

const showLanguagePopup = ref(!initialStorage || !config);
const showTutorial = ref(!initialStorage || !config || config.showTutorial)
const showCardsPopup = ref(true);
const showInvalidCode = ref(false);
const activeCard = ref(null as HintCardData | null);
const activeCardCode = ref(null as string | null);

// how many tiles will the full mosaic have.
// mosaic images are named 0.webp -> [mosaicSize - 1].webp
const mosaicSize = 16;

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
    showTutorial: true,
  }
);

// initialize storage if necessary
if (showLanguagePopup) {
  console.info('We are showing language popup because user prolly visited the page for the first time.');
  console.info('config?', config, 'first time?', !!config?.firstTime, 'initial storage:', initialStorage);
  localStorage.setItem("campaign-state", JSON.stringify(gameStore.value));
  localStorage.setItem("config", JSON.stringify(gameConfig.value));
}

// Generate mosaic code is currently obsolete
// function generateMosaic() {
//   // put elements with undefined z at the start, meaning they render at the bottom
//   gameStore.value.mosaicParts = gameStore.value.mosaicParts
//     .sort((a: any, b: any) => (a.z < b.z ? 1 : -1))
//     .reverse();
// }

// // ensure already collected mosaic parts are always re-ordered
// generateMosaic();

function updateConfig(key: 'language' | 'firstTime' | 'showTutorial', value: any) {
  gameConfig.value[key] = value;
  localStorage.setItem("config", JSON.stringify(gameConfig.value));
}

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
  const parts: number[] = [];
  let grantedParts = 0;

  while (grantedParts < n) {
    // if all mosaic parts were granted, there's no mosaics left to collect
    if (gameStore.value.mosaicParts.length === mosaicSize) {
      return parts;
    }

    const draw = Math.floor(Math.random() * mosaicSize);

    // re-draw if we already got the current piece
    if (gameStore.value.mosaicParts.includes(draw)) {
      continue;
    }
    gameStore.value.mosaicParts.push(draw);
    grantedParts++;
  }

  return parts;
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
  updateConfig('firstTime', false);

  localStorage.setItem("config", JSON.stringify(gameConfig.value));
}

function tutorialCompleted() {
  console.log('tutorial completed!');
  updateConfig('firstTime', false);
  updateConfig('showTutorial', false);
  showTutorial.value = false;
}

function reset() {
  localStorage.removeItem('campaign-state');
  window.location.reload();
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

  // console.log("setting campaign state:", gameStore.value);
  localStorage.setItem("campaign-state", JSON.stringify(gameStore.value));
}

/**
 * Grants user new mosaic pieces.
 * @param cardKey
 */
function earnedCardUpdated(cardKey?: string | null) {
  if (!cardKey) {
    return;
  }
  if (gameStore.value.earnedCards.includes(cardKey)) {
    return;
  }

  const newMosaicParts = getRandomMosaicPart(availableCards[cardKey].grants)

  gameStore.value = {
    ...gameStore.value,
    earnedCards: [...gameStore.value.earnedCards, cardKey],
    mosaicParts: [...gameStore.value.mosaicParts, ...newMosaicParts]
  }
  localStorage.setItem("campaign-state", JSON.stringify(gameStore.value));
}

/**
 * Shows popup with card content
 * @param card
 * @param code
 */
function setActiveCard(card: HintCardData, code: string) {
  setCardsPopupState(false); // HIDE GOD DAMN POPUP WITH CARD LIST
  activeCard.value = card;
  activeCardCode.value = code;
}

/**
 * Sets state of popup that shows collected cards.
 * @param state
 */
function setCardsPopupState(state: boolean) {
  showCardsPopup.value = state;
}

function clearSelectedCard() {
  activeCard.value = null;
  activeCardCode.value = null;
}

// determine which card to show
const code = (Array.isArray(route.query.code) ? route.query.code[0] : route.query.code) ?? undefined;

if (!isCodeValid(code)) {
  showInvalidCode.value = true;
} else {
  console.log(`code`, code, 'is valid!');
}
if (!isCodeRedeemed(code)) {
  console.log('code is not redeemed. showing popup ...')
  if (code) {
    collectedCardUpdated(code);
    setActiveCard(availableCards[code], code);
    earnedCardUpdated(code);
  }
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
    <template v-else-if="showTutorial">
      <SimpleTutorialPopup @close="tutorialCompleted"></SimpleTutorialPopup>
    </template>
    <template v-else-if="activeCard">
      <HintCardPopup
        :card="activeCard"
        @earned="earnedCardUpdated(activeCardCode)"
        @close="clearSelectedCard"
       />
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
          <!-- :class="{'bg-gradient-to-b from-orange to-orange/75': isCardEarned(cardKey)}" -->
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
              @click="setActiveCard(availableCards[cardKey], cardKey)"
              class="text-orange border border-orange px-4 py-2 bg-gradient-to-b from-orange/25 to-orange/20"
            >
              {{ $t("popups.open") }}
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- header -->
    <div
      class="flex flex-row items-center bg-gradient-to-b from-brown to-brown/75 space-between w-full px-3 py-2 -m-4 mb-4 w-[calc(100%+2rem)]"
    >
      <h1 class="flex flex-col flex-1 text-orange">{{ $t('main.title') }}</h1>
      <button
        class="h-full border border-orange bg-gradient-to-b from-orange/25 to-orange/20 text-orange px-6 flex items-center justify-center"
        @click="setCardsPopupState(true)"
      >
        {{ $t("main.myCards") }}  ({{ gameStore.collectedCards.length }})
      </button>
    </div>

    <!-- content -->
    <div class="relative w-full h-full flex-1">
      <div
        v-for="mosaicPart of gameStore.mosaicParts"
        :key="mosaicPart.path"
        class="w-full h-full absolute left-0 top-0"
        style="background-size: contain; background-repeat: no-repeat"
        :style="{ 'background-image': `url('/images/mosaic/${mosaicPart}.webp')` }"
      ></div>
    </div>
  </div>
</template>
