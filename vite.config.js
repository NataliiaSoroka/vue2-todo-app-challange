import vue from '@vitejs/plugin-vue2'
import path from 'path'

export default {
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/vue2-todo-app-challange/' : '/',
  resolve: {
    extensions: ['.js', '.json', '.vue', '.scss'],
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      components: `${path.resolve(__dirname, 'src/components')}`,
      styles: `${path.resolve(__dirname, 'src/assets/styles')}`,
      utils: `${path.resolve(__dirname, 'src/utils')}`,
      pages: `${path.resolve(__dirname, 'src/pages')}`,
      constants: `${path.resolve(__dirname, 'src/constants')}`,
      layouts: `${path.resolve(__dirname, 'src/layouts')}`
    }
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: '@import "styles/styles.scss";' }
    }
  }
}
