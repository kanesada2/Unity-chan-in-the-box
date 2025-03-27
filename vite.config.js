// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // .gz ファイルをアセットとして扱うよう設定
  assetsInclude: ['**/*.gz'],
  
  // 必要に応じて追加の設定
  server: {
    // 特定の警告やエラーを無視する設定
    fs: {
      allow: ['.']
    },
    allowedHosts: [".trycloudflare.com"]
  },
  
  // 必要に応じてプラグインを追加
  plugins: [
    {
      name: 'gzip-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // gzip圧縮されたファイルに対してヘッダーを追加
          if (req.url && req.url.endsWith('.gz')) {
            res.setHeader('Content-Encoding', 'gzip');
          }
          next();
        });
      }
    }
  ]
});