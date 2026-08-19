<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// State Form
const form = reactive({
  username: '',
  password: '',
});

// State UI & Validation
const showPassword = ref(false);
const isLoading = ref(false);
const errors = ref<Record<string, string>>({});

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Handle Form Submit
const handleLogin = async () => {
  isLoading.value = true;
  errors.value = {};

  try {
    // Panggil logika login API Anda di sini
    // await loginMutation.mutateAsync(form);
    // router.push('/dashboard');
  } catch (err: any) {
    if (err.response?.data?.errors) {
      errors.value = err.response.data.errors;
    } else {
      errors.value = { global: 'Username atau password yang Anda masukkan salah.' };
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#0B1C33] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo Container -->
      <div class="mx-auto h-14 w-14 rounded-2xl bg-[#FBB03B] flex items-center justify-center shadow-lg shadow-amber-500/20">
        <!-- Building/Construction Icon matching theme -->
        <svg class="w-8 h-8 text-[#0B1C33]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 2H9c-1.1 0-2 .9-2 2v6H5c-1.1 0-2 .9-2 2v10h18V4c0-1.1-.9-2-2-2zm-6 16h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2z"/>
        </svg>
      </div>

      <!-- Title & Subtitle -->
      <h2 class="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
        KSP KONTRAKTOR
      </h2>
      <p class="mt-2 text-center text-sm text-slate-300">
        Silakan masuk ke akun Anda untuk melanjutkan
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-6 shadow-2xl rounded-2xl border border-slate-100 sm:px-10">
        
        <!-- Global Error Alert -->
        <div v-if="errors.global" class="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start space-x-3">
          <svg class="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-xs sm:text-sm font-medium text-rose-700 leading-tight">{{ errors.global }}</span>
        </div>

        <form class="space-y-5" @submit.prevent="handleLogin">
          <!-- Input Username -->
          <div>
            <label for="username" class="block text-xs font-semibold uppercase tracking-wider text-[#0B1C33] mb-1.5">
              Username
            </label>
            <div class="relative">
              <input
                id="username"
                v-model="form.username"
                type="username"
                autocomplete="username"
                required
                placeholder="nama@kspkontraktor.com"
                :class="[
                  'w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border transition duration-150 focus:outline-none focus:ring-2',
                  errors.username 
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 text-rose-900 placeholder-rose-300' 
                    : 'border-slate-200 focus:border-[#FBB03B] focus:ring-amber-100 text-slate-900 placeholder-slate-400'
                ]"
              />
            </div>
            <p v-if="errors.username" class="mt-1.5 text-xs text-rose-600 font-medium">
              {{ errors.username }}
            </p>
          </div>

          <!-- Input Password -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label for="password" class="block text-xs font-semibold uppercase tracking-wider text-[#0B1C33]">
                Kata Sandi
              </label>
            </div>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                :class="[
                  'w-full pl-4 pr-11 py-2.5 sm:py-3 text-sm rounded-xl border transition duration-150 focus:outline-none focus:ring-2',
                  errors.password 
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 text-rose-900 placeholder-rose-300' 
                    : 'border-slate-200 focus:border-[#FBB03B] focus:ring-amber-100 text-slate-900 placeholder-slate-400'
                ]"
              />
              <!-- Toggle Password Eye Icon -->
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.98 8.98 0 013.682-.783c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1.5 text-xs text-rose-600 font-medium">
              {{ errors.password }}
            </p>
          </div>

          <!-- Submit Button (Yellow Theme) -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-bold text-[#0B1C33] bg-[#FBB03B] hover:bg-[#f0a328] active:bg-[#e0941f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FBB03B] shadow-md shadow-amber-500/10 transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <!-- Spinner Loading -->
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2.5 h-4 w-4 text-[#0B1C33]" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'Memproses...' : 'Masuk ke Akun' }}</span>
            </button>
          </div>
        </form>

        <!-- Footer Link -->
        <div class="mt-6 text-center border-t border-slate-100 pt-5">
          <p class="text-xs sm:text-sm text-slate-600">
            Belum memiliki akun?
            <router-link to="/register" class="font-semibold text-[#0B1C33] hover:text-[#FBB03B] transition duration-150">
              Daftar sekarang
            </router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>