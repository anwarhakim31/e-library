<template>
  <Teleport to="#action-root">
    <div
      :id="`action-${value}`"
      v-if="openAction === value"
      class="absolute z-50 bg-white border shadow-md rounded-md p-2 min-w-32 flex flex-col"
      :style="{ top: `${position.y}px`, left: `${position.x - 100}px` }"
    >
      <slot></slot>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import {
  defineProps,
  defineEmits,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";

const props = defineProps({
  openAction: { type: String, required: true },
  value: { type: String, required: true },
});

const emit = defineEmits(["update"]);

const position = reactive({ x: 0, y: 0 });
const clickedElement = ref<HTMLElement | null>(null);

const updatePosition = () => {
  if (!clickedElement.value) return;

  const rect = clickedElement.value.getBoundingClientRect();
  position.x = rect.left;
  position.y = rect.top + rect.height;
};

watch(
  () => props.openAction,
  async (newVal) => {
    if (newVal === props.value) {
      clickedElement.value = document.querySelector(`#${props.value}`);
      if (clickedElement.value) updatePosition();
    }
  }
);

const handleClose = (e: MouseEvent) => {
  const button = document.getElementById(props.value);
  const actionElement = document.getElementById(`action-${props.value}`);

  if (
    actionElement &&
    !actionElement.contains(e.target as Node) &&
    !button?.contains(e.target as Node)
  ) {
    emit("update");
  }
};

onMounted(() => {
  window.addEventListener("scroll", () => emit("update"));
  window.addEventListener("resize", () => emit("update"));
  window.addEventListener("click", handleClose);
});

onUnmounted(() => {
  window.removeEventListener("scroll", () => emit("update"));
  window.removeEventListener("resize", () => emit("update"));
  window.removeEventListener("click", handleClose);
});
</script>
