<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useProjectById } from '../../../composables/project/useProjectById';
import { ArrowLeft, Pencil, Wallet, Receipt, TrendingUp, Calendar, MapPin, FileText } from 'lucide-vue-next';

const router = useRouter()
const route = useRoute()

const id = Number(route.params.id)

const { data: project, isLoading, isError } = useProjectById(id)

const goBack = () => {
    router.back()
}

const formatRupiah = (value: number | undefined) => {
    if (!value) return 'Rp 0'
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(value)
}
</script>

<template>
    <div v-if="isLoading" class="p-4">
        <p class="text-slate-500">Memuat data proyek...</p>
    </div>

    <div v-else-if="isError || !project" class="p-4">
        <p class="text-red-500">Gagal memuat data proyek.</p>
    </div>

    <div v-else class="space-y-4">
        <!-- Header & Action Buttons -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>{{ project.name }}</span>
                    <span class="text-slate-300 font-normal">/</span>
                    <span class="text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent uppercase tracking-wider">
                        {{ project.status }}
                    </span>
                </h1>
                <div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <div class="flex items-center gap-1.5">
                        <span>Kode:</span>
                        <span class="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 uppercase tracking-wider text-xs">
                            {{ project.code }}
                        </span>
                    </div>

                    <span class="text-slate-300">•</span>

                    <div class="flex items-center gap-1.5">
                        <span>Pelanggan:</span>
                        <span class="font-semibold text-slate-800">{{ project.customer?.name || '-' }}</span>
                    </div>

                    <span class="text-slate-300">•</span>

                    <div class="flex items-center gap-1.5">
                        <span>Manager Proyek:</span>
                        <span class="font-semibold text-slate-800">{{ project.employee?.name || '-' }}</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2.5 self-start sm:self-center">
                <button
                    @click="goBack"
                    type="button"
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold shadow-sm transition duration-150"
                >
                    <ArrowLeft class="w-4 h-4 text-slate-500" />
                    <span>Kembali</span>
                </button>

                <button
                    type="button"
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FBB03B] hover:bg-[#f0a328] active:bg-[#e0941f] text-[#0B1C33] text-sm font-bold shadow-md shadow-amber-500/10 transition duration-150"
                >
                    <Pencil class="w-4 h-4" />
                    <span>Edit Proyek</span>
                </button>
            </div>
        </div>

        <!-- Grid Stat Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Card Nilai Kontrak -->
            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nilai Kontrak (RAB)</span>
                    <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                        <Wallet class="w-5 h-5" />
                    </div>
                </div>
                <div class="mt-4">
                    <h3 class="text-2xl font-bold text-slate-900 tracking-tight">
                        {{ formatRupiah(project.contract_value) }}
                    </h3>
                    <p class="text-xs text-slate-500 mt-1">Total nilai kesepakatan</p>
                </div>
            </div>

            <!-- Card Estimasi Biaya -->
            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimasi Biaya</span>
                    <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <Receipt class="w-5 h-5" />
                    </div>
                </div>
                <div class="mt-4">
                    <h3 class="text-2xl font-bold text-slate-900 tracking-tight">
                        {{ formatRupiah(project.estimated_cost) }}
                    </h3>
                    <p class="text-xs text-slate-500 mt-1">Target alokasi pengeluaran</p>
                </div>
            </div>

            <!-- Card Laba Kotor -->
            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimasi Laba Kotor</span>
                    <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                        <TrendingUp class="w-5 h-5" />
                    </div>
                </div>
                <div class="mt-4">
                    <h3 class="text-2xl font-bold text-emerald-600 tracking-tight">
                        {{ formatRupiah((project.contract_value || 0) - (project.estimated_cost || 0)) }}
                    </h3>
                    <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <span>Margin:</span>
                        <span class="font-semibold text-emerald-600">
                            {{ project.contract_value ? Math.round((((project.contract_value - project.estimated_cost) / project.contract_value) * 100)) : 0 }}%
                        </span>
                    </p>
                </div>
            </div>

            <!-- Card Durasi Proyek -->
            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Durasi Proyek</span>
                    <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
                        <Calendar class="w-5 h-5" />
                    </div>
                </div>
                <div class="mt-4">
                    <h3 class="text-sm font-semibold text-slate-800 tracking-tight">
                        {{ project.start_date || '-' }}
                    </h3>
                    <p class="text-xs text-slate-500 mt-0.5">s/d {{ project.end_date || '-' }}</p>
                </div>
            </div>
        </div>

        <!-- Section Detail Lokasi & Catatan (Address & Note) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!-- Card Alamat Proyek -->
            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                <div class="flex items-center gap-2.5 text-slate-800 font-bold">
                    <div class="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
                        <MapPin class="w-4 h-4" />
                    </div>
                    <span>Lokasi / Alamat Proyek</span>
                </div>
                <div class="text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 min-h-[70px]">
                    {{ project.address || 'Belum ada alamat lokasi proyek yang dicatat.' }}
                </div>
            </div>

            <!-- Card Catatan / Deskripsi -->
            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                <div class="flex items-center gap-2.5 text-slate-800 font-bold">
                    <div class="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                        <FileText class="w-4 h-4" />
                    </div>
                    <span>Catatan & Deskripsi Proyek</span>
                </div>
                <div class="text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 min-h-[70px] whitespace-pre-line">
                    {{ project.description || 'Belum ada deskripsi atau catatan khusus untuk proyek ini.' }}
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

            <!-- Tabel 1: Progres Pekerjaan / Tagihan -->
            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                <div class="flex items-center justify-between">
                    <h3 class="font-bold text-slate-800 text-base">Termin & Tagihan</h3>
                    <span class="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">3 Termin</span>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-100">
                            <tr>
                                <th class="py-3 px-3">Termin</th>
                                <th class="py-3 px-3">Nominal</th>
                                <th class="py-3 px-3">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-slate-700">
                            <tr class="hover:bg-slate-50/50 transition">
                                <td class="py-3 px-3 font-medium">DP (30%)</td>
                                <td class="py-3 px-3">Rp 30.000.000</td>
                                <td class="py-3 px-3">
                                    <span class="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-50 text-emerald-600 border border-emerald-200/60">Lunas</span>
                                </td>
                            </tr>
                            <tr class="hover:bg-slate-50/50 transition">
                                <td class="py-3 px-3 font-medium">Termin 1 (40%)</td>
                                <td class="py-3 px-3">Rp 40.000.000</td>
                                <td class="py-3 px-3">
                                    <span class="px-2 py-0.5 text-xs font-semibold rounded bg-amber-50 text-amber-600 border border-amber-200/60">Pending</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Tabel 2: Rincian Tim / Material -->
            <div class="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                <div class="flex items-center justify-between">
                    <h3 class="font-bold text-slate-800 text-base">Tim Proyek</h3>
                    <span class="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">2 Personel</span>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-100">
                            <tr>
                                <th class="py-3 px-3">Nama</th>
                                <th class="py-3 px-3">Peran</th>
                                <th class="py-3 px-3">Kontak</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-slate-700">
                            <tr class="hover:bg-slate-50/50 transition">
                                <td class="py-3 px-3 font-medium">Budi Santoso</td>
                                <td class="py-3 px-3">Site Engineer</td>
                                <td class="py-3 px-3 text-slate-500">0812-3456-7890</td>
                            </tr>
                            <tr class="hover:bg-slate-50/50 transition">
                                <td class="py-3 px-3 font-medium">Siti Aminah</td>
                                <td class="py-3 px-3">Drafter</td>
                                <td class="py-3 px-3 text-slate-500">0819-8765-4321</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>