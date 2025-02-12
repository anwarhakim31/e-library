<template>
  <Teleport to="#nav-root">
    <div v-if="isOpen" class="modal-container" @click="handleClose">
      <div
        class="modal-content"
        :class="{ 'modal-show': showModal }"
        @click.stop
      >
        <nav style="background: white">
          <button class="ml-auto" @click="handleClose">
            <X class="w-6 h-6 text-gray-500 active:text-gray-400" />
          </button>
          <RouterLink
            to="/"
            class="font-medium py-5 inline-block text-xs w-full"
            :class="{ 'text-blue-600': route.path === '/' }"
            @click="handleClose"
          >
            Beranda
          </RouterLink>
          <RouterLink
            to="/perpustakaan"
            class="font-medium py-5 inline-block text-xs w-full"
            :class="{ 'text-blue-600': route.path === '/perpustakaan' }"
            @click="handleClose"
          >
            Buku Perpustakaan
          </RouterLink>
          <RouterLink
            to="/e-book"
            class="font-medium py-5 inline-block text-xs w-full"
            :class="{ 'text-blue-600': route.path === '/e-book' }"
            @click="handleClose"
          >
            E-Book
          </RouterLink>
        </nav>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { X } from "lucide-vue-next";
import { defineProps, defineEmits, ref, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  isOpen: Boolean,
});

const route = useRoute();

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

  opacity: 1;
  z-index: 99;
  transition: opacity 0.3s ease-in-out;
}

.modal-content {
  background: white;
  padding: 20px;

  width: 100%;
  z-index: 100;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.modal-show {
  transform: translateY(0);
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
