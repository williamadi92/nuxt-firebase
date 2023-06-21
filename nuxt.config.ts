// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [["nuxt-vuefire", {
    auth: true,
    config: {
      apiKey: "AIzaSyCqArMa1bl73iGzAU5MtRAcNTL0F6DMnEE",
      authDomain: "privy-aksel-fe-2.firebaseapp.com",
      databaseURL: "https://privy-aksel-fe-2-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "privy-aksel-fe-2",
      storageBucket: "privy-aksel-fe-2.appspot.com",
      messagingSenderId: "961043557287",
      appId: "1:961043557287:web:eb7e5351202c021db22482",
      measurementId: "G-GEHC9EYN30"
    },
    admin: {
      serviceAccount: new URL('./service-account.json', import.meta.url)
        .pathname,
    },
  }]],
})
