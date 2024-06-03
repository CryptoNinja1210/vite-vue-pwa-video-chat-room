import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'
import { VitePWA } from 'vite-plugin-pwa'

const pwaAssets = true
const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    theme_color: '#f69435',
    background_color: '#f69435',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    name: 'Portfolio | Jerome Pangilinan',
    short_name: 'Jerome',
    description: "Jerome Pangilinan's portfolio website",
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  devOptions: {
    enabled: true,
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
    suppressWarnings: true
  }
}

if (pwaAssets) {
  pwaOptions.pwaAssets = {
    preset: 'minimal-2023',
    overrideManifestIcons: true
  }
}

const claims = true
const selfDestroying = true

function virtualMessagePlugin() {
  const virtual = 'virtual:message'
  const resolvedVirtual = `\0${virtual}`
  return {
    name: 'vite-plugin-test',
    resolveId(id) {
      return id === virtual ? resolvedVirtual : null
    },
    load(id) {
      if (id === resolvedVirtual)
        return `export const message = 'Message from Virtual Module Plugin'`
    }
  } satisfies Plugin
}

// eslint-disable-next-line no-constant-condition
if (true) {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.js' : 'prompt-sw.js'
  pwaOptions.strategies = 'injectManifest'
  // ;(pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest'
  // ;(pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
  pwaOptions.injectManifest = {
    minify: false,
    enableWorkboxModulesLogs: true,
    buildPlugins: {
      vite: [virtualMessagePlugin()]
    }
  }
}

if (claims) pwaOptions.registerType = 'autoUpdate'

if (selfDestroying) pwaOptions.selfDestroying = selfDestroying

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true
  },
  plugins: [vue(), vueJsx(), VueDevTools(), virtualMessagePlugin(), VitePWA(pwaOptions)],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
