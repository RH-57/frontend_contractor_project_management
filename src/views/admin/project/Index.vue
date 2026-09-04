<script setup lang="ts">
import { AlertCircle, ArrowRight, Calendar, FolderX, Plus, Search, User } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { useProjects, type Project } from '../../../composables/project/useProjects';
import { useToast } from 'vue-toastification';
import { useQueryClient } from '@tanstack/vue-query';

const toast = useToast()
const queryClient = useQueryClient()

const {data: projects, isLoading, isError, error, refetch} = useProjects()
const searchQuery = ref('')

const filteredProject = computed<Project[]>(() => {
    if (!projects.value) return [];
    if (!searchQuery.value.trim()) return projects.value;

    const query = searchQuery.value.toLowerCase();
    return projects.value.filter((project) =>
        project.name?.toLowerCase().includes(query) ||
        project.code?.toLowerCase().includes(query)
    )
})

const calculateProfit = (contractValue: number, estimatedCost: number): number => {
  return (contractValue || 0) - (estimatedCost || 0)
}

const formatCurrency = (val: number): string => {
    if (!val && val !== 0) return '-'

    const isNegative = val < 0
    const absVal = Math.abs(val)

    let formatted = '0'
    if (absVal >= 1_000_000_000) {
    formatted = `${(absVal / 1_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`
    } else if (absVal >= 1_000_000) {
    formatted = `${(absVal / 1_000_000).toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Jt`
    } else {
    formatted = absVal.toLocaleString('id-ID')
    }

    return isNegative ? `-Rp ${formatted}` : `Rp ${formatted}`
}

const formatDate = (dateStr: string): string => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr

    return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
    })
}

</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Proyek</h1>
                <p class="text-sm text-slate-500 mt-1">Kelola semua proyek</p>
            </div>
            <div>
                <router-link
                    to="/projects/create"
                    type="button"
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FBB03B] hover:bg-[#f0a328] active:bg-[#e0941f] text-[#0B1C33] text-sm font-bold shadow-md shadow-amber-500/10 transition duration-150"
                >
                    <Plus class="w-4 h-4" />
                    <span>Tambah Proyek</span>
                </router-link>
            </div>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div class="relative flex-1">
                <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Cari berdasarkan nama proyek atau kode..."
                    class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FBB03B] focus:ring-2 focus:ring-amber-100 transition duration-150"
                />
            </div>
        </div>

        <!-- STATE 1: LOADING (Menggunakan Skeleton/Spinner) -->
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" class="bg-white rounded-2xl border border-slate-100 p-5 space-y-4 animate-pulse">
                <div class="flex justify-between items-center">
                    <div class="h-4 bg-slate-200 rounded w-1/4"></div>
                    <div class="h-4 bg-slate-200 rounded w-1/5"></div>
                </div>
                <div class="space-y-2">
                    <div class="h-5 bg-slate-200 rounded w-3/4"></div>
                    <div class="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
                <div class="grid grid-cols-2 gap-2 pt-2">
                    <div class="h-8 bg-slate-100 rounded-lg"></div>
                    <div class="h-8 bg-slate-100 rounded-lg"></div>
                </div>
            </div>
        </div>

        <!-- STATE 2: ERROR -->
        <div v-else-if="isError" class="bg-white rounded-2xl border border-red-100 p-8 text-center space-y-3">
            <div class="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle class="w-6 h-6" />
            </div>
            <div>
                <h3 class="text-base font-bold text-slate-900">Gagal Memuat Data</h3>
                <p class="text-xs text-slate-500 mt-1">{{ error?.message || 'Terjadi kesalahan saat mengambil data proyek.' }}</p>
            </div>
            <button 
                @click="() => refetch()" 
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
                Coba Lagi
            </button>
        </div>

        <!-- STATE 3: DATA KOSONG (Kosong dari API atau karena kata kunci pencarian) -->
        <div v-else-if="filteredProject.length === 0" class="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <div class="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <FolderX class="w-6 h-6" />
            </div>
            <div>
                <h3 class="text-base font-bold text-slate-900">Proyek Tidak Ditemukan</h3>
                <p class="text-xs text-slate-400 mt-1">
                    {{ searchQuery ? `Tidak ada hasil pencarian untuk "${searchQuery}"` : 'Belum ada data proyek yang tersedia.' }}
                </p>
            </div>
        </div>

        <!-- STATE 4: MENAMPILKAN DATA (Card Grid) -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
                v-for="project in filteredProject" 
                :key="project.id" 
                class="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
                <!-- Content Section -->
                <div class="p-5 space-y-4">
                    <div class="flex items-center justify-between text-xs font-semibold">
                        <span class="text-slate-900">{{ project.status }}</span>
                        <span class="text-slate-400 uppercase tracking-wider">{{ project.code }}</span>
                    </div>
                    <div class="space-y-1.5">
                        <h3 class="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                            {{ project.name }}
                        </h3>
                        <div class="flex items-center gap-1.5 text-xs text-slate-500">
                            <User class="w-3.5 h-3.5 shrink-0" />
                            <span class="truncate">{{ project.customer?.name }}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 pt-1 text-xs">
                        <div>
                            <span class="text-slate-400 block mb-1">Nilai Kontrak</span>
                            <span class="font-bold text-slate-900 text-sm">
                                {{ formatCurrency(project.contract_value) }}
                            </span>
                        </div>
                        <div>
                            <span class="text-slate-400 block mb-1">Estimasi Laba</span>
                            <span class="font-bold text-emerald-500 text-sm">
                                {{ formatCurrency(calculateProfit(project.contract_value, project.estimated_cost)) }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Footer Section -->
                <div class="bg-slate-100 px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div class="flex items-center gap-1.5 text-slate-400">
                        <Calendar class="w-3.5 h-3.5" />
                        <span>{{ formatDate(project.start_date) }}</span>
                    </div>
                    <router-link
                        :to="`/projects/show/${project.id}`"
                        class="inline-flex items-center gap-1 font-semibold text-[#E65100] hover:text-[#c64400] transition-colors"
                    >
                        <span>Kelola</span>
                        <ArrowRight class="w-3.5 h-3.5" />
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>