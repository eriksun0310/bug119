// 地理編碼相關工具函數

/**
 * 使用瀏覽器的地理位置API獲取當前位置
 */
export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('瀏覽器不支援地理位置功能'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      }
    )
  })
}

/**
 * 反向地理編碼：將經緯度轉換為地址
 * 這裡使用開放的地理編碼服務 (OpenStreetMap Nominatim)
 */
export const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=zh-TW`
    )
    
    if (!response.ok) {
      throw new Error('地理編碼服務無回應')
    }
    
    const data = await response.json()
    
    // 組合地址信息
    const address = data.address || {}
    const addressParts = [
      address.city || address.town || address.village,
      address.suburb || address.neighbourhood || address.residential,
      address.road || address.pedestrian,
      address.house_number
    ].filter(Boolean)
    
    return addressParts.join('') || data.display_name || '無法獲取地址信息'
  } catch (error) {
    console.error('反向地理編碼失敗:', error)
    throw new Error('無法獲取地址信息')
  }
}

/**
 * 獲取當前位置並轉換為地址
 */
export const getCurrentLocationAddress = async (): Promise<string> => {
  try {
    const position = await getCurrentPosition()
    const { latitude, longitude } = position.coords
    const address = await reverseGeocode(latitude, longitude)
    return address
  } catch (error) {
    console.error('獲取位置地址失敗:', error)
    throw error
  }
}