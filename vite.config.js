//import { defineConfig } from "vite";
import path from 'path';
//import Config from "vite";
import { defineConfig, loadEnv } from "vite";



import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

//const __dirname = dirname(fileURLToPath(import.meta.url))

//console.log(import.meta.url)

// https://vitejs.dev/config/

/*
export default defineConfig({
  define: {
    'process.env': process.env
  },
  //root: 'src',
  //publicDir: "../public",
base: "./",

  build: {
    //outDir: "../dist",

    emptyOutDir: true,
    
    rollupOptions: {
      output: {
        assetFileNames: ({ names = [] }) => {
          //let extType = assetInfo.names[0].split('.').at(1);
          //let extType = 
          let [extType = ''] = names;
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          if (/\.(png|jpe?g|gif|svg|webp|webm|mp3)$/.test(extType)) {
            extType = 'img';
          }
          if (/\.(css)$/.test(extType)) {
            extType = 'css';
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
      
    },
  },
});
*/


export default ({ mode }) => {
  //process.env = { ...process.env, ...loadEnv(mode, process.cwd(), 'VITE_') };
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  console.log(env)
  return defineConfig({
    base: "./",
    define: {
      'process.env': env, //{}, // prevent errors in case something tries to access it directly
      __APP_ENV__: JSON.stringify(env.NODE_ENV),
    },
    build: {
    //outDir: "../dist",

    emptyOutDir: true,
    
    rollupOptions: {
      output: {
        assetFileNames: ({ names = [] }) => {
          //let extType = assetInfo.names[0].split('.').at(1);
          //let extType = 
          let [extType = ''] = names;
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          if (/\.(png|jpe?g|gif|svg|webp|webm|mp3)$/.test(extType)) {
            extType = 'img';
          }
          if (/\.(css)$/.test(extType)) {
            extType = 'css';
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
      
    },
  },
  });
};


/*
  resolve: {
    alias: {
      //'@': path.resolve(__dirname, './src'),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  */

/*
export default defineConfig({
    base: '/', 
})
*/
/*
export default defineConfig({
    base: '/vite-vanilla/', 
})
*/

/*
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
    console.log(command, mode, isSsrBuild, isPreview)
    
  if (mode === 'development') {
    return {
        base: '/vite-vanilla/'
      // dev specific config
    }
  } else {
    // command === 'build'
    return {
        base: '/vite/'
      // build specific config
    }
  }
})
  */

/*
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  console.log(env)
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})
  
  */

/*
export default defineConfig({ 
    clearScreen: false,
    server: {
        port: 3000,
    },
    preview: {
        port: 8080,
    }
})
    */