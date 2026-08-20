<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '../../../components/Sidebar.vue';


// Data Dummy Statistik
const stats = ref([
  {
    title: 'Total Proyek',
    value: '24',
    change: '+12%',
    isPositive: true,
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4'
  },
  {
    title: 'Proyek Berjalan',
    value: '8',
    change: 'On Track',
    isPositive: true,
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: 'Total Anggaran',
    value: 'Rp 4,2 M',
    change: '+8.5%',
    isPositive: true,
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Tugas Selesai',
    value: '86%',
    change: '-2.1%',
    isPositive: false,
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  }
]);

// Data Dummy Proyek Aktif
const recentProjects = ref([
  {
    id: 1,
    name: 'Pembangunan Gedung Kantor A',
    client: 'PT Mulia Perkasa',
    deadline: '15 Sep 2026',
    progress: 75,
    status: 'Berjalan',
    budget: 'Rp 1.200.000.000'
  },
  {
    id: 2,
    name: 'Renovasi Gudang Logistik',
    client: 'CV Mandiri Jaya',
    deadline: '28 Agu 2026',
    progress: 40,
    status: 'Pending',
    budget: 'Rp 450.000.000'
  },
  {
    id: 3,
    name: 'Proyek Perumahan Griya Asri',
    client: 'PT Asri Land',
    deadline: '10 Des 2026',
    progress: 90,
    status: 'Hampir Selesai',
    budget: 'Rp 2.500.000.000'
  }
]);

// Data Dummy Aktivitas Terbaru
const activities = ref([
  { id: 1, user: 'Budi Santoso', action: 'memperbarui progress', target: 'Gedung Kantor A ke 75%', time: '10 menit lalu' },
  { id: 2, user: 'Siti Rahma', action: 'mengunggah dokumen RAB', target: 'Renovasi Gudang', time: '1 jam lalu' },
  { id: 3, user: 'Andi Wijaya', action: 'menambahkan tugas baru', target: 'Pengecoran Lantai 2', time: '3 jam lalu' }
]);
</script>

<template>
  <Sidebar>
    <div class="space-y-6">
      
      <!-- 1. HEADER DASHBOARD -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p class="text-sm text-slate-500 mt-1">Ringkasan aktivitas proyek dan performa operasional saat ini.</p>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex items-center space-x-3">
          <button class="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition shadow-sm">
            Export Data
          </button>
          <button class="px-4 py-2.5 bg-[#FBB03B] hover:bg-[#f0a328] text-[#0B1C33] text-sm font-bold rounded-xl transition shadow-md shadow-amber-500/10 flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Proyek Baru</span>
          </button>
        </div>
      </div>

      <!-- 2. STATS CARDS -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">{{ stat.title }}</span>
            <div class="p-2.5 rounded-xl bg-slate-50 text-[#0B1C33] border border-slate-100">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="stat.icon" />
              </svg>
            </div>
          </div>
          
          <div class="mt-4 flex items-baseline justify-between">
            <span class="text-2xl font-extrabold text-slate-900">{{ stat.value }}</span>
            <span 
              :class="[
                'text-xs font-bold px-2 py-0.5 rounded-md',
                stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              ]"
            >
              {{ stat.change }}
            </span>
          </div>
        </div>
      </div>

      <!-- 3. MAIN SECTION (TABLE & ACTIVITIES) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left Side: Table Proyek Aktif (2 Cols) -->
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-base font-bold text-slate-900">Proyek Aktif</h2>
              <p class="text-xs text-slate-400">Pantau progress lapangan secara real-time</p>
            </div>
            <router-link to="/admin/projects" class="text-xs font-bold text-[#0B1C33] hover:text-[#FBB03B] transition">
              Lihat Semua →
            </router-link>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th class="pb-3 px-2">Nama Proyek</th>
                  <th class="pb-3 px-2">Anggaran</th>
                  <th class="pb-3 px-2">Progress</th>
                  <th class="pb-3 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-xs">
                <tr v-for="project in recentProjects" :key="project.id" class="hover:bg-slate-50/80 transition">
                  <td class="py-4 px-2">
                    <div class="font-bold text-slate-800">{{ project.name }}</div>
                    <div class="text-[11px] text-slate-400">{{ project.client }}</div>
                  </td>
                  <td class="py-4 px-2 font-semibold text-slate-700">
                    {{ project.budget }}
                  </td>
                  <td class="py-4 px-2 w-36">
                    <div class="flex items-center space-x-2">
                      <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          class="bg-[#FBB03B] h-2 rounded-full transition-all duration-500"
                          :style="{ width: `${project.progress}%` }"
                        ></div>
                      </div>
                      <span class="font-bold text-slate-600 text-[11px]">{{ project.progress }}%</span>
                    </div>
                  </td>
                  <td class="py-4 px-2 text-right">
                    <span 
                      :class="[
                        'px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider',
                        project.status === 'Berjalan' ? 'bg-amber-50 text-amber-700 border border-amber-200/60' :
                        project.status === 'Hampir Selesai' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' :
                        'bg-slate-100 text-slate-600'
                      ]"
                    >
                      {{ project.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right Side: Recent Activity (1 Col) -->
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h2 class="text-base font-bold text-slate-900 mb-1">Aktivitas Terkini</h2>
            <p class="text-xs text-slate-400 mb-6">Pembaruan tim kerja dalam 24 jam terakhir</p>

            <div class="space-y-5">
              <div v-for="act in activities" :key="act.id" class="flex items-start space-x-3">
                <div class="w-2 h-2 mt-1.5 rounded-full bg-[#FBB03B] shrink-0"></div>
                <div class="text-xs leading-relaxed">
                  <span class="font-bold text-slate-800">{{ act.user }}</span>
                  <span class="text-slate-500"> {{ act.action }} </span>
                  <span class="font-semibold text-slate-700">{{ act.target }}</span>
                  <div class="text-[10px] text-slate-400 mt-0.5">{{ act.time }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Tip Card -->
          <div class="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <div class="flex items-center space-x-2 text-[#0B1C33] font-bold text-xs mb-1">
              <svg class="w-4 h-4 text-[#FBB03B]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <span>Pengingat Sistem</span>
            </div>
            <p class="text-[11px] text-slate-500 leading-normal">
              Pastikan melakukan rekap RAB tiap akhir pekan untuk menjaga konsistensi laporan keuangan.
            </p>
          </div>
        </div>

      </div>

    </div>
  </Sidebar>
</template>