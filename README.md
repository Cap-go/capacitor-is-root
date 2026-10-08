# @capgo/capacitor-is-root

Detect rooted Android devices and jailbroken iPhones from your Capacitor app, so you can protect payments, content and accounts on compromised devices.

<a href="https://capgo.app/?ref=plugin_is_root"><img src="https://capgo.app/readme-banner.svg?repo=Cap-go/capacitor-is-root" alt="Capgo - Instant updates for Capacitor" /></a>

<div align="center">
  <p><b>Capgo</b>: push fixes to your Capacitor users in minutes, build signed iOS and Android apps without a Mac, and roll back in one click.</p>
  <h2><a href="https://capgo.app/register/?ref=plugin_is_root">➡️ Get started for free</a></h2>
  <p>14-day unlimited free trial. No credit card required</p>
  <p><a href="https://capgo.app/consulting/?ref=plugin_is_root">Missing a feature? We'll build the plugin for you 💪</a></p>
</div>

<p align="center">
  <img src="https://raw.githubusercontent.com/Cap-go/capacitor-is-root/main/assets/github-social-preview.png" alt="@capgo/capacitor-is-root for Capacitor apps" width="300" />
</p>

## Key features

- **One check**: `isRooted()` runs the default root or jailbreak checks on both platforms.
- **iOS jailbreak checks**: looks for jailbreak files and tests writing outside the app sandbox.
- **Android RootBeer checks**: `checkForSuBinary()`, `checkForDangerousProps()`, `checkForRWPaths()`, `detectTestKeys()` and more.
- **App detection on Android**: `detectRootManagementApps()`, `detectPotentiallyDangerousApps()` and `detectRootCloakingApps()`.
- **BusyBox aware**: `isRootedWithBusyBox()` adds BusyBox checks on Android.
- **Platforms**: iOS and Android. Android uses RootBeer. Not meaningful on web.

## Documentation

The most complete doc is available here: https://capgo.app/docs/plugins/is-root/

## Compatibility

| Plugin version | Capacitor compatibility | Maintained |
| -------------- | ----------------------- | ---------- |
| v8.\*.\*       | v8.\*.\*                | ✅          |
| v7.\*.\*       | v7.\*.\*                | On demand   |
| v6.\*.\*       | v6.\*.\*                | ❌          |
| v5.\*.\*       | v5.\*.\*                | ❌          |

> **Note:** The major version of this plugin follows the major version of Capacitor. Use the version that matches your Capacitor installation (e.g., plugin v8 for Capacitor 8). Only the latest major version is actively maintained.

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/cap-go/capacitor-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `cap-go/capacitor-skills` to install the `@capgo/capacitor-is-root` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

```bash
npm install @capgo/capacitor-is-root
npx cap sync
```

### Android package visibility (API 30+)

When your app targets Android 11 (API 30) or higher, package filtering limits which other apps `PackageManager` can see unless they are declared in a `<queries>` element or are automatically visible (for example your own package, apps that share your UID, and certain pre-installed system packages). This plugin ships the `<queries>` entries needed for its RootBeer and internal installed-package checks, and the manifest merger adds them to your app. You do not need to duplicate those declarations unless you extend detection with your own package lookups.

`detectPotentiallyDangerousApps()` does not add `<queries>` entries for the RootBeer dangerous-apps packages that this plugin omits (ROM managers and piracy apps). Those installs are not visible to that check unless the host app declares them. The plugin manifest already declares selected packages from that list where we want detection (for example `com.ramdroid.appquarantine` and the EdXposed managers).

The internal installed-package check also leaves `org.adblockplus.android` undeclared, even though it is listed in `ROOT_ONLY_APPLICATIONS`. Adblock Plus is an ordinary app today, so making it visible would count it toward the root threshold on unrooted devices.

## API

<docgen-index>

* [`isRooted()`](#isrooted)
* [`isRootedWithBusyBox()`](#isrootedwithbusybox)
* [`detectRootManagementApps()`](#detectrootmanagementapps)
* [`detectPotentiallyDangerousApps()`](#detectpotentiallydangerousapps)
* [`detectTestKeys()`](#detecttestkeys)
* [`checkForBusyBoxBinary()`](#checkforbusyboxbinary)
* [`checkForSuBinary()`](#checkforsubinary)
* [`checkSuExists()`](#checksuexists)
* [`checkForRWPaths()`](#checkforrwpaths)
* [`checkForDangerousProps()`](#checkfordangerousprops)
* [`checkForRootNative()`](#checkforrootnative)
* [`detectRootCloakingApps()`](#detectrootcloakingapps)
* [`isSelinuxFlagInEnabled()`](#isselinuxflaginenabled)
* [`isExistBuildTags()`](#isexistbuildtags)
* [`doesSuperuserApkExist()`](#doessuperuserapkexist)
* [`isExistSUPath()`](#isexistsupath)
* [`checkDirPermissions()`](#checkdirpermissions)
* [`checkExecutingCommands()`](#checkexecutingcommands)
* [`checkInstalledPackages()`](#checkinstalledpackages)
* [`checkforOverTheAirCertificates()`](#checkforovertheaircertificates)
* [`isRunningOnEmulator()`](#isrunningonemulator)
* [`simpleCheckEmulator()`](#simplecheckemulator)
* [`simpleCheckSDKBF86()`](#simplechecksdkbf86)
* [`simpleCheckQRREFPH()`](#simplecheckqrrefph)
* [`simpleCheckBuild()`](#simplecheckbuild)
* [`checkGenymotion()`](#checkgenymotion)
* [`checkGeneric()`](#checkgeneric)
* [`checkGoogleSDK()`](#checkgooglesdk)
* [`togetDeviceInfo()`](#togetdeviceinfo)
* [`isRootedWithEmulator()`](#isrootedwithemulator)
* [`isRootedWithBusyBoxWithEmulator()`](#isrootedwithbusyboxwithemulator)
* [`getPluginVersion()`](#getpluginversion)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

Capacitor Is Root Plugin for detecting rooted (Android) or jailbroken (iOS) devices.

This plugin provides comprehensive detection methods to identify if a device has been
rooted or jailbroken, which can be important for security-sensitive applications.

Most methods are Android-only and use various heuristics to detect root access.
The basic `isRooted()` method works on both Android and iOS.

### isRooted()

```typescript
isRooted() => Promise<DetectionResult>
```

Performs the default root/jailbreak detection checks.

This is the recommended method for basic root/jailbreak detection.
It runs a combination of the most reliable detection heuristics for the platform.
Works on both Android and iOS.

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### isRootedWithBusyBox()

```typescript
isRootedWithBusyBox() => Promise<DetectionResult>
```

Extends the default detection with BusyBox specific checks (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### detectRootManagementApps()

```typescript
detectRootManagementApps() => Promise<DetectionResult>
```

Detects if known root management applications are present (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### detectPotentiallyDangerousApps()

```typescript
detectPotentiallyDangerousApps() => Promise<DetectionResult>
```

Detects potentially dangerous applications commonly found on rooted devices (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### detectTestKeys()

```typescript
detectTestKeys() => Promise<DetectionResult>
```

Detects debug/test build tags (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkForBusyBoxBinary()

```typescript
checkForBusyBoxBinary() => Promise<DetectionResult>
```

Checks whether a BusyBox binary exists on the device (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkForSuBinary()

```typescript
checkForSuBinary() => Promise<DetectionResult>
```

Checks whether a `su` binary is present (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkSuExists()

```typescript
checkSuExists() => Promise<DetectionResult>
```

Detects if the `su` binary can be executed (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkForRWPaths()

```typescript
checkForRWPaths() => Promise<DetectionResult>
```

Detects world writable system paths (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkForDangerousProps()

```typescript
checkForDangerousProps() => Promise<DetectionResult>
```

Detects dangerous system properties (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkForRootNative()

```typescript
checkForRootNative() => Promise<DetectionResult>
```

Executes RootBeer native checks (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### detectRootCloakingApps()

```typescript
detectRootCloakingApps() => Promise<DetectionResult>
```

Detects applications that can hide root (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### isSelinuxFlagInEnabled()

```typescript
isSelinuxFlagInEnabled() => Promise<DetectionResult>
```

Checks the SELinux enforcement state (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### isExistBuildTags()

```typescript
isExistBuildTags() => Promise<DetectionResult>
```

Detects test build tags on the OS image (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### doesSuperuserApkExist()

```typescript
doesSuperuserApkExist() => Promise<DetectionResult>
```

Detects if superuser APKs are installed (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### isExistSUPath()

```typescript
isExistSUPath() => Promise<DetectionResult>
```

Checks for known `su` binary locations (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkDirPermissions()

```typescript
checkDirPermissions() => Promise<DetectionResult>
```

Detects writable directories that should be protected (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkExecutingCommands()

```typescript
checkExecutingCommands() => Promise<DetectionResult>
```

Executes `which su` style commands to detect root (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkInstalledPackages()

```typescript
checkInstalledPackages() => Promise<DetectionResult>
```

Detects suspicious installed packages (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkforOverTheAirCertificates()

```typescript
checkforOverTheAirCertificates() => Promise<DetectionResult>
```

Detects tampered OTA certificates (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### isRunningOnEmulator()

```typescript
isRunningOnEmulator() => Promise<DetectionResult>
```

Detects common emulator fingerprints (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### simpleCheckEmulator()

```typescript
simpleCheckEmulator() => Promise<DetectionResult>
```

Performs a lightweight emulator check (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### simpleCheckSDKBF86()

```typescript
simpleCheckSDKBF86() => Promise<DetectionResult>
```

Detects x86 emulator fingerprints (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### simpleCheckQRREFPH()

```typescript
simpleCheckQRREFPH() => Promise<DetectionResult>
```

Detects QC reference phone builds (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### simpleCheckBuild()

```typescript
simpleCheckBuild() => Promise<DetectionResult>
```

Detects build host anomalies (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkGenymotion()

```typescript
checkGenymotion() => Promise<DetectionResult>
```

Detects Genymotion emulator fingerprints (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkGeneric()

```typescript
checkGeneric() => Promise<DetectionResult>
```

Detects generic emulator fingerprints (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### checkGoogleSDK()

```typescript
checkGoogleSDK() => Promise<DetectionResult>
```

Detects Google SDK emulator fingerprints (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### togetDeviceInfo()

```typescript
togetDeviceInfo() => Promise<DeviceInfo>
```

Returns device information collected during detection.

Provides additional context and metadata about the device that was
gathered during the root detection process. Useful for debugging
and logging purposes.

**Returns:** <code>Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;</code>

**Since:** 1.0.0

--------------------


### isRootedWithEmulator()

```typescript
isRootedWithEmulator() => Promise<DetectionResult>
```

Extends the default detection with emulator heuristics (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### isRootedWithBusyBoxWithEmulator()

```typescript
isRootedWithBusyBoxWithEmulator() => Promise<DetectionResult>
```

Extends the BusyBox detection with emulator heuristics (Android only).

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

--------------------


### getPluginVersion()

```typescript
getPluginVersion() => Promise<{ version: string; }>
```

Get the native Capacitor plugin version.

**Returns:** <code>Promise&lt;{ version: string; }&gt;</code>

**Since:** 1.0.0

--------------------


### Interfaces


#### DetectionResult

Result returned by root/jailbreak detection methods.

| Prop         | Type                 | Description                                                                                                                 | Since |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`result`** | <code>boolean</code> | `true` when the associated heuristic detects root/jailbreak artifacts. `false` when no root/jailbreak indicators are found. | 1.0.0 |


#### DeviceInfo

Device information collected during detection.

</docgen-api>

### Credits 

This plugin was inspired by the work in https://github.com/WuglyakBolgoink/cordova-plugin-iroot
