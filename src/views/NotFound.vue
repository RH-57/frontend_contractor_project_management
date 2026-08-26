<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const goBack = () => {
    router.back()
}
</script>

<template>
    <div class="min-h-screen bg-[#0B1C33] flex flex-col items-center justify-center px-4 font-sans text-center">
        <div class="relative">
            <h1 class="text-9xl font-extrabold text-slate-800 tracking-widest select-none">
                404
            </h1>
            <div class="absolute inset-0 flex items-center justify-center">
                <span class="bg-[#FBB03B] text-[#0B1C33] px-4 py-1 rounded-md text-sm font-bold uppercase tracking-wider shadow-lg">
                    Page Not Found
                </span>
            </div>
        </div>

        <h2 class="mt-8 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Oops! you lost.
        </h2>
        <p class="mt-2 text-sm text-slate-300 max-w-md">
            The page you're looking for doesn't exist or has been moved to another address.
        </p>

        <div class="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <button
                @click="goBack"
                class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FBB03B] hover:bg-[#F0A328] text-[#0B1C33] text-sm font-bold transition duration-150 shadow-md shadow-amber-500/10"
            >
                Jump to Dashboard
            </button>
        </div>
    </div>
</template>