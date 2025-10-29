# @capgo/capacitor-is-root
 <a href="https://capgo.app/"><img src='https://raw.githubusercontent.com/Cap-go/capgo/main/assets/capgo_banner.png' alt='Capgo - Instant updates for capacitor'/></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_is_root"> ➡️ Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_is_root"> Missing a feature? We’ll build the plugin for you 💪</a></h2>
</div>

Jailbreak/Root Detection Plugin for Capacitor

## Documentation

The most complete doc is available here: https://capgo.app/docs/plugins/is-root/

## Install

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

### isRooted()

```typescript
isRooted() => Promise<DetectionResult>
```

Performs the default root/jailbreak detection checks.

**Returns:** <code>Promise&lt;<a href="#detectionresult">DetectionResult</a>&gt;</code>

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

**Returns:** <code>Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;</code>

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

Get the native Capacitor plugin version

**Returns:** <code>Promise&lt;{ version: string; }&gt;</code>

--------------------


### Interfaces


#### DetectionResult

| Prop         | Type                 | Description                                                            |
| ------------ | -------------------- | ---------------------------------------------------------------------- |
| **`result`** | <code>boolean</code> | `true` when the associated heuristic detects root/jailbreak artifacts. |


#### DeviceInfo

</docgen-api>

### Credits 

This plugin was inspired by the work in https://github.com/WuglyakBolgoink/cordova-plugin-iroot
