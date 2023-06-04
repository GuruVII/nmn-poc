<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const { locale } = useI18n({ useScope: "global" });
const props = defineProps({
  correctPassword: {
    type: String,
    required: true,
  },
  decodedMessage: {
    type: String,
    required: true,
  },
  collected: {
    type: Boolean
  }
});
const emit = defineEmits(["decrypted"]);


let code = "";
const labels = {
  code: {
    sl_m: "Vnesite kodo",
    sl_f: "Vnesite kodo",
    en: "Input the password",
  },
  message: {
    sl_m: "Dekodirano sporočilo",
    sl_f: "Dekodirano sporočilo",
    en: "Decoded message",
  },
};

const correctCodeIntegerValue = [...props.correctPassword].reduce(
  (acc, item) => {
    return acc + item.charCodeAt(0);
  },
  0
);
let messageIntegerArray = [...props.decodedMessage].map(
  (item) => item.charCodeAt(0) + correctCodeIntegerValue
);
let message = ref(
  String.fromCharCode(...messageIntegerArray.map((item) => item - 1))
);

const decode = () => {
  let passwordIntegerValue = [...code].reduce((acc, item) => {
    return acc + item.charCodeAt(0);
  }, 0);
  if (
    passwordIntegerValue === correctCodeIntegerValue &&
    props.correctPassword !== code
  ) {
    passwordIntegerValue + 1;
  }
  message.value = String.fromCharCode(
    ...messageIntegerArray.map((item) => item - passwordIntegerValue)
  );
  if (code === props.correctPassword) {
    console.log(message.value);
    emit("decrypted", true);
  }
};

// dont require password entry on already earned cards
if (props.collected) {
  code = props.correctPassword;
  decode();
}
</script>
<template>
  <div class="flex flex-col w-full encryption-positioning">
    <div class="flex encryption-positioning">
      <span>{{ $t('encryption.message') }}:</span><span>{{ message }}</span>
    </div>
    <div class="flex flex-row w-full encryption-positioning">
      <span>{{ $t('encryption.code') }}: </span>
      <input
        class="encryption-input"
        type="text"
        v-model="code"
        @keyup="decode()"
      />
    </div>
  </div>
</template>

<style lang="scss">
.encryption-positioning {
  gap: 1rem;
  &.flex-col {
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
  }
}
.encryption-input {
  color: #000;
  width: 50%;
  margin-right: 1rem;
}
</style>
