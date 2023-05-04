<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
let code = "";

const emit = defineEmits(["correctCodeInputted"]);
const props = defineProps({
  correctPassword: {
    type: String,
    required: true,
  },
  decodedMessage: {
    type: String,
    required: true,
  },
});

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

const { locale } = useI18n({ useScope: "global" });
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
    emit("correctCodeInputted", true);
  }
};
</script>
<template>
  <span>{{ message }}</span>
  <input
    class="encryption-input"
    type="text"
    v-model="code"
    @keyup="decode()"
  />
</template>

<style lang="scss">
.encryption-input {
  color: #000;
}
</style>
