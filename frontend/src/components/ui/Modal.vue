<template>
  <Teleport to="#modal-root">
    <div v-if="isOpen" class="modal-container" @click="handleClose">
      <div
        class="modal-content"
        :class="{ 'modal-show': showModal }"
        @click.stop
      >
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const showModal = ref(false);

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      setTimeout(() => {
        showModal.value = true;
      }, 10);
    } else {
      showModal.value = false;
    }
  }
);

const handleClose = () => {
  showModal.value = false;
  setTimeout(() => {
    emit("close");
  }, 300);
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  z-index: 99;
  transition: opacity 0.3s ease-in-out;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 450px;
  z-index: 100;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transform: scale(0.8);
  opacity: 0;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.modal-show {
  transform: scale(1);
  opacity: 1;
}

.close-btn {
  margin-top: 10px;
  background: red;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
