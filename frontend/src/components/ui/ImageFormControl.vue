<template>
  <div class="mb-4">
    <label
      :for="id"
      class="sm:col-span-2 text-sm font-medium capitalize mb-2 block"
    >
      {{ name }}
    </label>
    <div class="w-full">
      <div
        class="flex justify-center h-44 rounded-md w-full placeholder:text-sm text-sm ring-0 focus-within:ring-0 bg-gray-50 hover:border-blue-600 focus:border-blue-600 focus:outline-2 focus:outline-blue-100 focus:outline-offset-0 border border-gray-300 px-2.5 py-2.5"
      >
        <div
          v-if="!imagePreview && setProggress === 0"
          class="flex flex-col items-center w-full h-full cursor-pointer justify-center"
          @click="triggerFileInput"
        >
          <ImageUp class="w-8 h-8 text-gray-700" />
          <p class="text-xs mt-2">Unggah Gambar</p>
        </div>
        <div
          v-else-if="!imagePreview && setProggress > 0"
          class="flex flex-col items-center w-full h-full cursor-pointer justify-center"
        >
          <div class="w-full max-w-[200px] bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-blue-600 h-2.5 rounded-full"
              :style="{ width: `${setProggress}%` }"
            ></div>
          </div>
          <p class="text-xs mt-2">Mengunggah Gambar {{ setProggress }}%</p>
        </div>
        <div
          v-else
          class="flex flex-col items-center w-full h-full cursor-pointer justify-center"
          @click="triggerFileInput"
        >
          <img
            :src="imagePreview || ''"
            class="w-24 max-h-24 rounded-md"
            alt="Gambar"
          />
          <button
            @click.stop
            type="button"
            class="mt-2"
            @click="imagePreview = null"
          >
            <X class="text-gray-800 active:text-gray-400 w-4 h-4" />
          </button>
        </div>
      </div>
      <span class="text-xs text-red-500 sm:col-span-10">{{
        errorMessage
      }}</span>
    </div>
  </div>

  <input
    ref="imageInput"
    type="file"
    :id="id"
    accept="image/*"
    :placeholder="placeholder"
    @change="handleFileChange"
    autocomplete="off"
    class="hidden"
  />
</template>

<script lang="ts" setup>
import { ImageUp, X } from "lucide-vue-next";
import { useField } from "vee-validate";
import { ref, watch } from "vue";
import usePostImage from "../../composables/image/usePostImage";

const props = defineProps({
  name: { type: String, required: true },
  id: { type: String, required: true },
  placeholder: { type: String, default: "" },
});

const imageInput = ref<HTMLInputElement | null>(null);
const { value: fieldValue, errorMessage } = useField<string | File>(
  () => props.id
);
const setProggress = ref(0);
const imagePreview = ref<string | null>(null);
const { mutate, isPending } = usePostImage(
  (value) => (setProggress.value = value)
);

const emit = defineEmits(["uploading"]);

const triggerFileInput = () => {
  if (imageInput.value) {
    imageInput.value.click();
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files?.length) {
    mutate(target.files[0], {
      onSuccess(value) {
        fieldValue.value = value?.url;
        target.value = "";
        setProggress.value = 0;
      },
      onError() {
        target.value = "";
        setProggress.value = 0;
      },
    });
  }
};

watch(isPending, (newValue) => {
  emit("uploading", newValue);
});

watch(fieldValue, (newValue) => {
  if (newValue instanceof File) {
    imagePreview.value = URL.createObjectURL(newValue);
  } else {
    imagePreview.value = newValue as string | null;
  }
});
</script>
