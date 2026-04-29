package com.imagegalleryapp

import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableNativeMap

class DeviceDetailsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "DeviceDetails"

    @ReactMethod
    fun getDeviceInfo(promise: Promise) {
        try {
            val map = WritableNativeMap()
            map.putString("model", Build.MODEL)
            map.putString("manufacturer", Build.MANUFACTURER.replaceFirstChar { it.uppercase() })
            map.putString("systemName", "Android")
            map.putString("systemVersion", Build.VERSION.RELEASE)
            map.putString("sdkVersion", Build.VERSION.SDK_INT.toString())
            promise.resolve(map)
        } catch (e: Exception) {
            promise.reject("DEVICE_INFO_ERROR", e.message ?: "Failed to retrieve device info")
        }
    }
}
