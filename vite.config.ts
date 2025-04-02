import {defineConfig, Plugin} from 'vite';
import react from '@vitejs/plugin-react-swc';
import laravel from 'laravel-vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import replace from '@rollup/plugin-replace';
import * as path from 'path';

// override laravel plugin base option (from absolute to relative to html base tag)
function basePath(): Plugin {
  return {
    name: 'test',
    enforce: 'post',
    config: () => {
      return {
        base: '',
      };
    },
  };
}

export default defineConfig({
  server: {
    host: '0.0.0.0',
    hmr: {
      host: 'localhost',
    },
  },
  base: '',
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@ui': path.resolve(__dirname, './common/foundation/resources/client/ui/library'),
      '@common': path.resolve(__dirname, './common/foundation/resources/client'),
      '@app': path.resolve(__dirname, './resources/client'),
    },

  },
  optimizeDeps: {
    force: true
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ['puppeteer'],
    },
  },
  plugins: [
    tsconfigPaths(),
    react(),
    laravel({
      input: ['resources/client/main.tsx'],
      refresh: false,
    }),
    basePath(),
    replace({
      preventAssignment: true,
      __SENTRY_DEBUG__: false,
      "import { URL } from 'url'": false,
    }),
  ],
});
