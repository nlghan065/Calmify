/**
 * useFullpage Hook
 * ----------------
 * Mô tả: custom hook để khởi tạo và quản lý fullpage.js cho các trang scroll toàn màn hình.
 * Ghi chú: hook này chỉ nên gọi một lần ở cấp cao nhất (ví dụ trong App.jsx hoặc Layout.jsx).
 */

import { useEffect, useRef } from 'react'
import fullpage from 'fullpage.js'
import 'fullpage.js/dist/fullpage.css'

export default function useFullpage(customOptions = {}) {
  const fullpageRef = useRef(null)

  useEffect(() => {
    // Kiểm tra phần tử #fullpage đã tồn tại chưa
    const container = document.querySelector('#fullpage')
    if (!container) {
      console.warn(' Không tìm thấy phần tử #fullpage trong DOM.')
      return
    }

    // Tránh khởi tạo nhiều lần
    if (fullpageRef.current) return

    try {
      fullpageRef.current = new fullpage('#fullpage', {
        licenseKey: 'gplv3-license',
        scrollingSpeed: 700,
        autoScrolling: true,
        scrollHorizontally: false,
        navigation: true,
        showActiveTooltip: true,
        ...customOptions
      })
    } catch (error) {
      console.error('Lỗi khi khởi tạo fullpage.js:', error)
    }

    // Cleanup khi component unmount
    return () => {
      if (fullpageRef.current) {
        fullpageRef.current.destroy('all')
        fullpageRef.current = null
      }
    }
  }, [customOptions])

  return fullpageRef
}
