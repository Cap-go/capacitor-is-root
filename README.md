# @capgo/capacitor-is-root
<a href="https://capgo.app/"><img src="https://capgo.app/readme-banner.svg?repo=Cap-go/capacitor-is-root" alt="Capgo - Instant updates for Capacitor" /></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_is_root"> ➡️ Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_is_root"> Missing a feature? We’ll build the plugin for you 💪</a></h2>
</div>

Detect **Android root**, **iOS jailbreak**, and **emulator environments** (when you opt in) from your Capacitor app. `@capgo/capacitor-is-root` exposes one cross-platform entry point plus granular Android checks so you can tune risk for banking, fintech, enterprise, and other security-sensitive products.

## What it detects

| Signal | Platforms | How to check |
| ------ | --------- | ------------ |
| Root / jailbreak | Android and iOS | `isRooted()` (recommended default) |
| Emulator | Android only | `isRunningOnEmulator()`, `isRootedWithEmulator()`, `isRootedWithBusyBoxWithEmulator()`, or individual `simpleCheck*` / `check*` emulator helpers |
| Deeper root signals | Android only | RootBeer-backed helpers and internal checks (see below) |

On **iOS**, `isRooted()` is the supported cross-platform API. Simulator builds always report not jailbroken (`false`).

On **Android**, most methods are Android-only. `isRooted()` combines [RootBeer](https://github.com/scottyab/rootbeer) heuristics with Capgo internal checks. Emulator detection is **not** part of default `isRooted()`; use `isRootedWithEmulator()` or `isRunningOnEmulator()` when you want that signal.

## Why apps use it

- **Reduce fraud and abuse** on compromised devices where attackers can hook APIs or bypass local controls.
- **Support compliance and risk policies** that require knowing when a device is rooted, jailbroken, or running in an emulator.
- **Gate sensitive flows** (payments, PII, high-value actions) with an explicit device-trust decision instead of assuming the OS sandbox is intact.

Pair this plugin with server-side validation, certificate pinning, and your own threat model. It is a client-side signal, not a standalone security boundary.

## What runs under the hood

### iOS `isRooted()`

Runs on physical devices only (simulator returns `false`). Checks run in order; any positive result returns jailbroken:

1. Known jailbreak **paths and apps** (Cydia, MobileSubstrate, SSH, Frida, Cycript, and related paths).
2. **Restricted file reads** (can open suspicious paths with `fopen`).
3. **Writes outside the sandbox** (test writes under `/private/`).
4. **`cydia://` URL** handling via `canOpenURL`.
5. **Suspicious symbolic links** under `/Applications` and `/var/stash/...`.

If none of the above trigger, an **aggregated score** runs (threshold **3**). Points come from URL/Cydia checks, hidden jailbreak files, bundle plist anomalies, suspicious processes (for example MobileCydia, Cydia, afpd), `/etc/fstab` size, symlink checks, missing executable path, Frida on port 27042, FridaGadget in loaded images, and debugger attachment (`P_TRACED`). A fork-based check is present but currently always returns false.

### Android `isRooted()`

Returns `true` if **either** RootBeer `isRooted()` **or** Capgo `InternalRootDetection.isRooted()` reports indicators:

| Internal check | What it looks for |
| -------------- | ----------------- |
| `isExistBuildTags` | `ro.build.tags` contains `test-keys` |
| `doesSuperuserApkExist` | Known superuser APK paths on disk |
| `isExistSUPath` | `su` binary under common locations |
| `checkDirPermissions` | Writable system dirs or readable `/data` |
| `checkExecutingCommands` | `which su` style command execution |
| `checkInstalledPackages` | Blacklisted packages, root-only apps, Cydia Substrate |
| `checkforOverTheAirCertificates` | Missing `/etc/security/otacerts.zip` |

**Emulator is not included** in default `isRooted()`. `isRootedWithEmulator()` adds `isRunningOnEmulator()` (model, board, manufacturer, fingerprint, and product heuristics for common emulators including Genymotion and Google SDK images).

### Optional Android-only APIs

Call these when you need finer-grained telemetry or custom policies (each returns `{ result: boolean }`):

- **Combined:** `isRootedWithBusyBox()`, `isRootedWithBusyBoxWithEmulator()`
- **RootBeer:** `detectRootManagementApps()`, `detectPotentiallyDangerousApps()`, `detectTestKeys()`, `checkForBusyBoxBinary()`, `checkForSuBinary()`, `checkSuExists()`, `checkForRWPaths()`, `checkForDangerousProps()`, `checkForRootNative()`, `detectRootCloakingApps()`, `isSelinuxFlagInEnabled()`
- **Internal (exposed individually):** `isExistBuildTags()`, `doesSuperuserApkExist()`, `isExistSUPath()`, `checkDirPermissions()`, `checkExecutingCommands()`, `checkInstalledPackages()`, `checkforOverTheAirCertificates()`
- **Emulator helpers:** `isRunningOnEmulator()`, `simpleCheckEmulator()`, `simpleCheckSDKBF86()`, `simpleCheckQRREFPH()`, `simpleCheckBuild()`, `checkGenymotion()`, `checkGeneric()`, `checkGoogleSDK()`
- **Debug metadata:** `togetDeviceInfo()` returns build and OS fields collected on Android

## Limits (read this)

All detection is **heuristic**. Determined attackers on rooted or jailbroken devices can hide binaries, hook native code, or spoof results. **False positives and false negatives are possible.** Treat `result: true` as a risk signal for your app policy, not as proof of compromise, and never as a substitute for server-side authentication and authorization.

## Quick usage

```typescript
import { IsRoot } from '@capgo/capacitor-is-root';

// Cross-platform root / jailbreak check
const { result } = await IsRoot.isRooted();
if (result) {
  console.warn('Device may be rooted or jailbroken');
}

// Android: include emulator in the same pass as root checks
const emulatorAware = await IsRoot.isRootedWithEmulator();

// Android: emulator only
const { result: onEmulator } = await IsRoot.isRunningOnEmulator();
```

Full API reference is generated below from `src/definitions.ts`.

## Documentation

The most complete doc is available here: [capgo.app/docs/plugins/is-root/](https://capgo.app/docs/plugins/is-root/)

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
