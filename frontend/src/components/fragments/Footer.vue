<template>
  <footer class="bg-gray-50">
    <div class="py-24 flex justify-between container">
      <div class="space-y-4">
        <img src="/brand/eLibrary-letter-3.png" alt="logo" class="w-48" />
        <p class="text-gray-700 max-w-[400px] text-sm">
          E-Library adalah sebuah perpustakaan digital yang didedikasikan untuk
          memerikan akses mudah dan luas kepada pengetahuan, informasi, dan
          sumber daya pendidikan untuk semua kalangan.
        </p>
        <div>
          <h3 class="font-bold mb-4">Follow Us</h3>
          <div class="flex items-center gap-4">
            <a
              href="https://www.instagram.com/e_library_smkn1/"
              class="w-12 h-12 rounded-full border bg-white hover:text-blue-500 hover:border-blue-500 transition-all duration-300 ease-in-out flex items-center justify-center"
            >
              <Instagram class="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/e_library_smkn1/"
              class="w-12 h-12 rounded-full border bg-white hover:text-blue-400 hover:border-blue-400 transition-all duration-300 ease-in-out flex items-center justify-center"
            >
              <Twitter class="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/e_library_smkn1/"
              class="w-12 h-12 rounded-full border bg-white hover:text-blue-400 hover:border-blue-400 transition-all duration-300 ease-in-out flex items-center justify-center"
            >
              <Facebook class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 border-t">
      <p class="text-center text-xs text-gray-700">
        &copy; {{ new Date().getFullYear() }} Perpus Digital SMK Negeri 1
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { Facebook, Instagram, Twitter } from "lucide-vue-next";
</script>

<style></style>
