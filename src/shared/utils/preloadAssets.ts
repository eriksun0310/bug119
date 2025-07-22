import { Image, Platform } from 'react-native'
import { Asset } from 'expo-asset'

// 定義需要預載的圖片
const imageAssets = [
  require('../../../assets/images/logo.png'),
  require('../../../assets/icon.png'),
  require('../../../assets/splash-icon.png'),
]

/**
 * 預載所有重要的圖片資源
 * 在 App 啟動時呼叫，確保圖片能快速顯示
 */
export const preloadImages = async (): Promise<void> => {
  try {
    // 使用 expo-asset 預載本地圖片
    const cacheImages = imageAssets.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })
    
    await Promise.all(cacheImages)
    
    // 只在原生平台上使用 resolveAssetSource
    // 網頁版不支援此 API
    if (Platform.OS !== 'web' && Image.resolveAssetSource) {
      imageAssets.forEach(image => {
        Image.resolveAssetSource(image)
      })
    }
    
    console.log('圖片預載完成')
  } catch (error) {
    console.warn('圖片預載失敗:', error)
  }
}

/**
 * 預載網路圖片
 * @param urls 圖片 URL 陣列
 */
export const preloadNetworkImages = async (urls: string[]): Promise<void> => {
  try {
    const cacheImages = urls.map(url => Image.prefetch(url))
    await Promise.all(cacheImages)
    console.log('網路圖片預載完成')
  } catch (error) {
    console.warn('網路圖片預載失敗:', error)
  }
}