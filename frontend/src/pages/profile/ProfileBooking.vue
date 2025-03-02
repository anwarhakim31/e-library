<template>
  <div class="flex items-center gap-2 text-sm mt-10">
    <label for="status"> Status Peminjaman </label>
    <select
      id="status"
      v-model="status"
      @change="handleStatus"
      autocomplete="off"
      class="block rounded-md w-[200px] text-xs bg-gray-50 hover:border-blue-600 focus:border-blue-600 focus:outline-2 focus:outline-blue-100 focus:outline-offset-0 border border-gray-300 px-2.5 py-2.5"
    >
      <option value="semua">Semua</option>
      <option value="menunggu">Menunggu</option>
      <option value="konfirmasi">Di Konfirmasi</option>
      <option value="pinjam">Dipinjam</option>
    </select>
  </div>
  <div
    v-if="data?.data?.length === 0"
    class="flex flex-col items-center justify-center h-full min-h-[calc(100vh-280px)]"
  >
    <Book class="w-7 h-7 text-gray-700 mb-4" />
    <h3 class="text-base font-medium">Belum Ada Buku yang Dipinjam</h3>
    <p class="text-xs mt-2 text-gray-500">
      Anda belum meminjam buku apapun. Mulai jelajahi koleksi perpustakaan kami sekarang!
    </p>
  </div>
  <div v-else class="min-h-[calc(100vh-280px)] space-y-4 mt-12">
    <div
      v-for="item in data?.data"
      :key="item.id"
      class="flex flex-col gap-2 md:flex-row justify-between"
    >
      <div class="flex gap-2">
        <img :src="item?.book?.coverImage" :alt="item?.book?.title" class="w-16 h-24" />
        <div>
          <h3 class="text-sm font-medium">{{ item?.book?.title }}</h3>
          <p class="text-xs">({{ item?.book?.author }})</p>
        </div>
      </div>
      <div class="text-left space-y-2">
        <p class="text-xs">
          <span class="inline-block w-[100px]">Tanggal Pinjam</span> :
          {{ item?.startDate.split("T")[0] }}
        </p>
        <p class="text-xs">
          <span class="inline-block w-[100px]">Tanggal Kembali</span> :
          {{ item?.endDate.split("T")[0] }}
        </p>
        <p class="text-xs">
          <span class="inline-block w-[100px]">Status</span> :
          {{ item.status }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Book } from "lucide-vue-next";
import useGetUserBooking from "../../composables/booking/useGetUserBooking";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const status = ref(route.query.status || "semua");

const { data } = useGetUserBooking();

const handleStatus = (e: Event) => {
  status.value = (e.target as HTMLInputElement).value;

  if ((e?.target as HTMLInputElement).value === "semua") {
    router.replace("/profile/booking");
  } else {
    status.value = (e.target as HTMLInputElement).value;
    router.replace({
      query: {
        ...route.query,
        status: status.value,
      },
    });
  }
};
</script>

<style></style>
