import Foundation
import Capacitor
#if canImport(UIKit)
import UIKit
#endif

@objc(IsRootPlugin)
public class IsRootPlugin: CAPPlugin, CAPBridgedPlugin {
    private let pluginVersion: String = "8.1.4"
    public let identifier = "IsRootPlugin"
    public let jsName = "IsRoot"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isRooted", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isRootedWithBusyBox", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "detectRootManagementApps", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "detectPotentiallyDangerousApps", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "detectTestKeys", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkForBusyBoxBinary", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkForSuBinary", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkSuExists", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkForRWPaths", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkForDangerousProps", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkForRootNative", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "detectRootCloakingApps", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isSelinuxFlagInEnabled", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isExistBuildTags", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "doesSuperuserApkExist", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isExistSUPath", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkDirPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkExecutingCommands", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkInstalledPackages", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkforOverTheAirCertificates", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isRunningOnEmulator", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "simpleCheckEmulator", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "simpleCheckSDKBF86", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "simpleCheckQRREFPH", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "simpleCheckBuild", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkGenymotion", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkGeneric", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkGoogleSDK", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "togetDeviceInfo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isRootedWithEmulator", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isRootedWithBusyBoxWithEmulator", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPluginVersion", returnType: CAPPluginReturnPromise)
    ]

    private let detector = IsRoot()

    @objc func isRooted(_ call: CAPPluginCall) {
        resolve(call, value: detector.isRooted())
    }

    @objc func isRootedWithBusyBox(_ call: CAPPluginCall) {
        resolve(call, value: detector.isRooted())
    }

    @objc func detectRootManagementApps(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func detectPotentiallyDangerousApps(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func detectTestKeys(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkForBusyBoxBinary(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkForSuBinary(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkSuExists(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkForRWPaths(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkForDangerousProps(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkForRootNative(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func detectRootCloakingApps(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func isSelinuxFlagInEnabled(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func isExistBuildTags(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func doesSuperuserApkExist(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func isExistSUPath(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkDirPermissions(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkExecutingCommands(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkInstalledPackages(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkforOverTheAirCertificates(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func isRunningOnEmulator(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func simpleCheckEmulator(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func simpleCheckSDKBF86(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func simpleCheckQRREFPH(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func simpleCheckBuild(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkGenymotion(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkGeneric(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func checkGoogleSDK(_ call: CAPPluginCall) {
        resolve(call, value: false)
    }

    @objc func togetDeviceInfo(_ call: CAPPluginCall) {
        #if canImport(UIKit)
        let device = UIDevice.current
        let info: [String: Any] = [
            "name": device.name,
            "model": device.model,
            "systemName": device.systemName,
            "systemVersion": device.systemVersion,
            "identifierForVendor": device.identifierForVendor?.uuidString ?? ""
        ]
        call.resolve(info)
        #else
        let processInfo = ProcessInfo.processInfo
        let info: [String: Any] = [
            "name": processInfo.hostName,
            "model": "",
            "systemName": processInfo.operatingSystemVersionString,
            "systemVersion": processInfo.operatingSystemVersionString,
            "identifierForVendor": ""
        ]
        call.resolve(info)
        #endif
    }

    @objc func isRootedWithEmulator(_ call: CAPPluginCall) {
        resolve(call, value: detector.isRooted())
    }

    @objc func isRootedWithBusyBoxWithEmulator(_ call: CAPPluginCall) {
        resolve(call, value: detector.isRooted())
    }

    private func resolve(_ call: CAPPluginCall, value: Bool) {
        call.resolve(["result": value])
    }

    @objc func getPluginVersion(_ call: CAPPluginCall) {
        call.resolve(["version": self.pluginVersion])
    }

}
