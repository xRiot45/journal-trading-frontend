# RULES.md

Dokumen ini berisi aturan yang wajib diikuti oleh AI assistant (seperti Claude) saat membantu pengembangan project **Next.js** ini.

AI harus selalu mengikuti struktur, convention, dan style yang telah ditetapkan di project ini. Jangan membuat struktur baru, naming baru, atau arsitektur baru di luar aturan ini kecuali diminta secara eksplisit.

---

# 1. Core Principles

- Selalu prioritaskan:
  - readability
  - maintainability
  - consistency
  - modularity
  - scalability
- Selalu ikuti struktur project yang sudah ada.
- Jangan membuat code yang terlalu kompleks jika ada solusi yang lebih sederhana dan tetap rapi.
- Jangan melakukan over-engineering.
- Jangan mengubah arsitektur project tanpa instruksi eksplisit.
- Selalu buat code yang production-minded dan mudah dikembangkan ke depannya.
- Jika diminta refactor, pertahankan behavior existing kecuali diminta mengubah behavior.

---

# 2. Project Architecture

Project ini menggunakan **feature-based architecture**.

Semua logic fitur wajib diletakkan di dalam folder:

```txt
/features
```

Setiap fitur harus berdiri secara modular dan terpisah berdasarkan domain.

Contoh:

```txt
/features
  /auth
  /sessions
  /pairs
```

Di dalam setiap folder fitur, gunakan struktur berikut:

```txt
/features/{feature-name}
  /application
  /components
  /interfaces
  /schemas
  /services
  /views
```

---

# 3. Responsibility of Each Feature Folder

## 3.1 `/application`

Digunakan untuk logic **TanStack Query**.

Isi folder ini meliputi:

- custom query hooks
- custom mutation hooks
- query key factory bila dibutuhkan
- cache invalidation logic
- integration logic antara service dan UI state untuk server state

Contoh isi:

- `queries.ts`
- `mutations.ts`

Rules:

- Semua logic React Query / TanStack Query harus ada di sini.
- Jangan letakkan direct API call di `application`; direct API call harus tetap berada di `services`.
- `application` hanya mengorkestrasi pemanggilan `services` untuk kebutuhan query/mutation.
- Query key harus konsisten, deskriptif, dan mudah dirawat.

---

## 3.2 `/components`

Digunakan untuk menyimpan **component yang spesifik terhadap fitur tersebut**.

Isi folder ini meliputi:

- form component
- filter component
- table section
- dialog section
- header section
- card section
- feature widgets

Rules:

- Hanya untuk component yang memang milik fitur tersebut.
- Jangan simpan reusable global UI component di sini.
- Reusable UI generic tetap berada di `/components/ui` atau folder global lain yang sudah ada.
- Component di folder ini harus fokus pada tampilan atau bagian UI dari fitur terkait.

---

## 3.3 `/interfaces`

Digunakan untuk menyimpan **TypeScript interface/type** untuk fitur tersebut.

Isi folder ini meliputi:

- request types
- response types
- entity types
- filter types
- form types
- payload types

Rules:

- Semua type/interface yang spesifik ke fitur harus disimpan di sini.
- Jangan campur interface fitur lain dalam folder fitur yang tidak relevan.
- Nama type harus deskriptif, jelas, dan konsisten.
- Hindari `any`.

---

## 3.4 `/schemas`

Digunakan untuk menyimpan **validation schema menggunakan Zod**.

Isi folder ini meliputi:

- form schema
- filter schema
- payload validation schema
- transform schema jika dibutuhkan

Rules:

- Semua validasi berbasis Zod untuk fitur harus disimpan di sini.
- Jangan menaruh schema inline di file page/view jika schema tersebut cukup kompleks atau reusable.
- Export type turunan dari schema bila dibutuhkan, misalnya menggunakan `z.infer`.

---

## 3.5 `/services`

Digunakan untuk menyimpan **logic call API menggunakan axios**.

Isi folder ini meliputi:

- function request API
- endpoint integration
- payload mapping jika diperlukan
- response normalization ringan jika diperlukan

Rules:

- Semua direct API call harus berada di folder ini.
- Gunakan axios sesuai pola project yang sudah ada.
- Jangan melakukan logic UI di `services`.
- Jangan meletakkan logic React Query di `services`.
- Service harus fokus pada komunikasi dengan API.
- Service function harus typed dengan jelas untuk request dan response.

---

## 3.6 `/views`

Digunakan untuk menyimpan **view utama dari fitur**.

Isi folder ini meliputi:

- halaman login
- halaman list
- halaman detail
- halaman create/edit
- wrapper view untuk page tertentu

Rules:

- View menjadi entry UI untuk fitur.
- View boleh menggabungkan component fitur, hooks application, schema, dan interface yang dibutuhkan.
- View harus tetap rapi, tidak terlalu gemuk, dan tidak dipenuhi logic yang seharusnya dipindahkan ke folder lain.
- Nama file view harus jelas, misalnya:
  - `login.view.tsx`
  - `session-list.view.tsx`
  - `pair-detail.view.tsx`

---

# 4. Rule for `/app`

Folder `/app` hanya digunakan sebagai **routing layer** dan **layout layer**.

Tujuan utamanya adalah agar file di `/app` tetap clean dan tipis.

## Aturan utama:

- File `page.tsx` di dalam `/app` **tidak boleh berisi logic fitur yang tebal**.
- File `page.tsx` hanya boleh:
  - import view dari `/features/.../views`
  - render view tersebut

- Jangan menaruh:
  - schema
  - service
  - mutation/query logic
  - feature component besar
  - business logic yang kompleks
    langsung di `/app/page.tsx`

## Contoh yang benar:

```tsx
import { LoginView } from '@/features/auth/views/login.view';

export default function LoginPage() {
  return <LoginView />;
}
```

## Gunakan `/app` hanya untuk:

- route definition
- layout
- route grouping
- metadata page sederhana
- loading/error boundary bila diperlukan
- wrapper server-side route concern bila memang dibutuhkan

---

# 5. Global Folder Usage

## `/components/ui`

Digunakan untuk reusable UI components global.

Contoh:

- button
- input
- dialog
- card
- table
- select
- tabs

Rules:

- Komponen di sini harus reusable lintas fitur.
- Jangan letakkan component business/domain-specific di sini.

## `/components`

Selain `/components/ui`, folder global components boleh digunakan untuk komponen global lintas fitur, misalnya:

- provider
- theme provider
- app shell global
- layout shared global

Namun jika component hanya relevan untuk satu fitur, simpan di `/features/{feature}/components`.

## `/hooks`

Digunakan untuk shared custom hooks global, bukan hook spesifik fitur.
Jika hook hanya dipakai satu fitur dan sangat domain-specific, lebih baik letakkan dekat fitur tersebut sesuai kebutuhan arsitektur project.

## `/lib`

Digunakan untuk helper, utility, dan shared function global.
Contoh:

- `cn`
- formatter
- shared utility function
- config helper kecil

---

# 6. Implementation Flow Rule

AI harus mengikuti flow implementasi berikut saat membuat fitur baru:

1. Tentukan fitur target di dalam `/features/{feature-name}`
2. Buat/update `interfaces` jika butuh type
3. Buat/update `schemas` jika butuh validasi
4. Buat/update `services` untuk API call
5. Buat/update `application` untuk TanStack Query logic
6. Buat/update `components` untuk pecahan UI fitur
7. Buat/update `views` sebagai entry view fitur
8. Hubungkan route di `/app` hanya dengan memanggil view dari fitur

AI harus menjaga agar `page.tsx` tetap tipis dan bersih.

---

# 7. Next.js Rules

- Project menggunakan **Next.js App Router**.
- Gunakan `app/` convention.
- Gunakan Server Component sebagai default.
- Gunakan `'use client'` hanya jika memang dibutuhkan, seperti:
  - state
  - effect
  - event handler
  - browser API
  - React Hook Form
  - TanStack Query hooks

- Jangan menjadikan semua file sebagai client component tanpa alasan.

---

# 8. TypeScript Rules

- Semua code harus strict-friendly.
- Hindari `any`.
- Gunakan interface/type yang jelas.
- Jangan gunakan non-null assertion (`!`) sembarangan.
- Gunakan naming yang deskriptif.
- Export type hanya jika memang dibutuhkan.
- Buat request/response typing yang jelas untuk API integration.

---

# 9. React and Component Rules

- Gunakan functional component.
- Satu component harus memiliki satu tanggung jawab utama.
- Jika component terlalu besar, pecah ke component kecil.
- Pisahkan:
  - UI
  - validation
  - API call
  - server state logic

- Jangan campur semua concern dalam satu file besar.
- Gunakan props type/interface yang jelas.

---

# 10. TanStack Query Rules

Semua logic TanStack Query wajib ada di:

```txt
/features/{feature}/application
```

Rules:

- Query dan mutation harus memanggil function dari `services`.
- Jangan fetch langsung di component jika sudah bisa ditaruh di `application`.
- Query key harus konsisten.
- Lakukan invalidation dengan jelas setelah mutation sukses.
- Handle loading, error, success state dengan baik.

Contoh:

- `queries.ts` untuk `useLoginQuery`, `useSessionsQuery`, dsb
- `mutations.ts` untuk `useLoginMutation`, `useCreateSessionMutation`, dsb

---

# 11. API Service Rules

Semua logic API call harus berada di:

```txt
/features/{feature}/services
```

Rules:

- Gunakan axios.
- Jangan tempatkan request langsung di view/component.
- Buat function service yang kecil, fokus, dan typed.
- Pisahkan endpoint per fitur.
- Jangan campur logic presentational/UI dengan API logic.

Contoh:

- `auth.service.ts`
- `session.service.ts`
- `pair.service.ts`

---

# 12. Zod Schema Rules

Semua validasi Zod harus berada di:

```txt
/features/{feature}/schemas
```

Rules:

- Schema harus menjadi source of truth validasi form/payload.
- Gunakan `z.infer` untuk menghasilkan type bila perlu.
- Error message validasi harus jelas.
- Jangan duplikasi schema yang sama di banyak tempat.

---

# 13. View Rules

Semua entry UI fitur harus berada di:

```txt
/features/{feature}/views
```

Rules:

- View adalah layer yang dirender oleh `page.tsx`.
- View dapat menggunakan component fitur, query/mutation, schema, dan interface.
- View tidak boleh terlalu gemuk.
- Jika UI di dalam view mulai besar, pecah ke `/components`.

---

# 14. Naming Convention Rules

Gunakan naming yang konsisten.

## File naming

Gunakan `kebab-case` untuk file non-component bila memungkinkan, dan sesuaikan dengan pola existing project.

Contoh:

- `login.view.tsx`
- `auth.service.ts`
- `login.schema.ts`
- `auth.interface.ts`
- `queries.ts`
- `mutations.ts`

## Component naming

Gunakan `PascalCase`.

Contoh:

- `LoginView`
- `LoginForm`
- `SessionTable`

## Variable and function naming

Gunakan `camelCase`.

Contoh:

- `loginSchema`
- `useLoginMutation`
- `getSessionList`

---

# 15. Form Rules

- Gunakan **React Hook Form** untuk form.
- Gunakan **Zod** untuk validation schema.
- Integrasi validasi harus rapi dan typed.
- Error message harus tampil dengan jelas.
- Submit state harus jelas:
  - idle
  - loading
  - disabled bila perlu

Schema tetap diletakkan di `/schemas`, bukan di view jika reusable atau cukup kompleks.

---

# 16. Styling Rules

- Gunakan Tailwind CSS.
- Gunakan komponen dari `/components/ui` untuk kebutuhan UI reusable.
- Jaga konsistensi spacing, typography, radius, dan layout.
- Jangan membuat UI yang bertabrakan dengan design pattern existing.
- Jika class terlalu panjang dan berulang, pertimbangkan helper atau ekstraksi component.

---

# 17. Clean Code Rules

AI wajib:

- membuat code yang rapi
- menghindari duplikasi
- menggunakan early return bila membantu
- memecah logic kompleks ke layer yang sesuai
- menjaga file tetap fokus pada satu tanggung jawab
- menghindari file monster

---

# 18. Forbidden Practices

AI tidak boleh:

- menaruh semua logic fitur di `/app/page.tsx`
- menaruh API call langsung di component/view
- menaruh TanStack Query logic di `services`
- menaruh schema Zod di sembarang file jika seharusnya ada di `/schemas`
- menaruh type/interface fitur di file acak
- mencampur terlalu banyak concern dalam satu file
- menggunakan `any` sembarangan
- menggunakan non-null assertion sembarangan
- membuat abstraction berlebihan tanpa kebutuhan nyata
- membuat struktur folder baru yang melanggar arsitektur ini

---

# 19. Expected Output Pattern

Setiap kali AI diminta membuat atau mengupdate fitur, hasil akhirnya harus mengikuti pola ini:

- `features/.../interfaces` untuk typing
- `features/.../schemas` untuk validation
- `features/.../services` untuk axios API logic
- `features/.../application` untuk TanStack Query logic
- `features/.../components` untuk feature-specific UI parts
- `features/.../views` untuk entry view
- `app/.../page.tsx` hanya memanggil view

---

# 20. Priority Order

Jika ada konflik, gunakan urutan prioritas berikut:

1. instruksi user terbaru
2. struktur dan convention project existing
3. isi `RULES.md` ini
4. best practice Next.js / TypeScript yang relevan

---

# 21. Final Reminder

AI harus berpikir seperti engineer yang:

- pragmatis
- rapi
- konsisten
- tidak over-engineer
- menjaga folder `/app` tetap clean
- menempatkan semua logic fitur di `/features`
- mengikuti pembagian responsibility folder dengan disiplin

````

Agar lebih cocok untuk Claude, saya juga sarankan isi `RULES.md` ini dijadikan lebih “operasional”, misalnya ditambah section khusus seperti:
- `DO`
- `DON'T`
- contoh struktur file per fitur
- contoh implementasi alur login
- contoh page di `/app` yang benar dan salah

Berikut versi tambahan yang lebih tegas untuk Claude, bisa kamu tempel di bagian bawah file:

```md
---

# 22. DO and DON'T

## DO
- Letakkan semua logic fitur di `/features`
- Gunakan `/app` hanya untuk routing dan layout
- Simpan API call di `/services`
- Simpan TanStack Query logic di `/application`
- Simpan Zod schema di `/schemas`
- Simpan type/interface di `/interfaces`
- Simpan UI spesifik fitur di `/components`
- Simpan entry view fitur di `/views`

## DON'T
- Jangan taruh logic bisnis besar di `page.tsx`
- Jangan taruh axios call langsung di component
- Jangan taruh query/mutation logic di view jika seharusnya di `/application`
- Jangan taruh schema inline di file besar bila reusable
- Jangan campur service, schema, dan UI dalam satu file

---

# 23. Example Feature Structure

```txt
/features/auth
  /application
    mutations.ts
    queries.ts
  /components
    login-form.tsx
  /interfaces
    auth.interface.ts
  /schemas
    login.schema.ts
  /services
    auth.service.ts
  /views
    login.view.tsx
````

---

# 24. Example App Usage

```tsx
import { LoginView } from '@/features/auth/views/login.view';

export default function LoginPage() {
  return <LoginView />;
}
```

Rule:

- Keep page files minimal
- Do not move feature logic into app routes
