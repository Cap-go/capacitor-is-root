/**
 * Result returned by root/jailbreak detection methods.
 *
 * @since 1.0.0
 */
export interface DetectionResult {
  /**
   * `true` when the associated heuristic detects root/jailbreak artifacts.
   * `false` when no root/jailbreak indicators are found.
   *
   * @since 1.0.0
   */
  result: boolean;
}

/**
 * Device information collected during detection.
 *
 * @since 1.0.0
 */
export interface DeviceInfo {
  /**
   * Arbitrary key/value device metadata populated by the native implementation.
   * Contents vary by platform and detection methods used.
   *
   * @since 1.0.0
   */
  [key: string]: any;
}

/**
 * Capacitor Is Root Plugin for detecting rooted (Android) or jailbroken (iOS) devices.
 *
 * This plugin provides comprehensive detection methods to identify if a device has been
 * rooted or jailbroken, which can be important for security-sensitive applications.
 *
 * Most methods are Android-only and use various heuristics to detect root access.
 * The basic `isRooted()` method works on both Android and iOS.
 *
 * @since 1.0.0
 */
export interface IsRootPlugin {
  /**
   * Performs the default root/jailbreak detection checks.
   *
   * This is the recommended method for basic root/jailbreak detection.
   * It runs a combination of the most reliable detection heuristics for the platform.
   * Works on both Android and iOS.
   *
   * @returns Promise that resolves with the detection result
   * @throws Error if the detection check fails
   * @since 1.0.0
   * @example
   * ```typescript
   * const { result } = await IsRoot.isRooted();
   * if (result) {
   *   console.log('Device is rooted/jailbroken');
   * } else {
   *   console.log('Device is not rooted/jailbroken');
   * }
   * ```
   */
  isRooted(): Promise<DetectionResult>;

  /**
   * Extends the default detection with BusyBox specific checks (Android only).
   *
   * @returns DetectionResult
   */
  isRootedWithBusyBox(): Promise<DetectionResult>;

  /**
   * Detects if known root management applications are present (Android only).
   *
   * @returns DetectionResult
   */
  detectRootManagementApps(): Promise<DetectionResult>;

  /**
   * Detects potentially dangerous applications commonly found on rooted devices (Android only).
   *
   * @returns DetectionResult
   */
  detectPotentiallyDangerousApps(): Promise<DetectionResult>;

  /**
   * Detects debug/test build tags (Android only).
   *
   * @returns DetectionResult
   */
  detectTestKeys(): Promise<DetectionResult>;

  /**
   * Checks whether a BusyBox binary exists on the device (Android only).
   *
   * @returns DetectionResult
   */
  checkForBusyBoxBinary(): Promise<DetectionResult>;

  /**
   * Checks whether a `su` binary is present (Android only).
   *
   * @returns DetectionResult
   */
  checkForSuBinary(): Promise<DetectionResult>;

  /**
   * Detects if the `su` binary can be executed (Android only).
   *
   * @returns DetectionResult
   */
  checkSuExists(): Promise<DetectionResult>;

  /**
   * Detects world writable system paths (Android only).
   *
   * @returns DetectionResult
   */
  checkForRWPaths(): Promise<DetectionResult>;

  /**
   * Detects dangerous system properties (Android only).
   *
   * @returns DetectionResult
   */
  checkForDangerousProps(): Promise<DetectionResult>;

  /**
   * Executes RootBeer native checks (Android only).
   *
   * @returns DetectionResult
   */
  checkForRootNative(): Promise<DetectionResult>;

  /**
   * Detects applications that can hide root (Android only).
   *
   * @returns DetectionResult
   */
  detectRootCloakingApps(): Promise<DetectionResult>;

  /**
   * Checks the SELinux enforcement state (Android only).
   *
   * @returns DetectionResult
   */
  isSelinuxFlagInEnabled(): Promise<DetectionResult>;

  /**
   * Detects test build tags on the OS image (Android only).
   *
   * @returns DetectionResult
   */
  isExistBuildTags(): Promise<DetectionResult>;

  /**
   * Detects if superuser APKs are installed (Android only).
   *
   * @returns DetectionResult
   */
  doesSuperuserApkExist(): Promise<DetectionResult>;

  /**
   * Checks for known `su` binary locations (Android only).
   *
   * @returns DetectionResult
   */
  isExistSUPath(): Promise<DetectionResult>;

  /**
   * Detects writable directories that should be protected (Android only).
   *
   * @returns DetectionResult
   */
  checkDirPermissions(): Promise<DetectionResult>;

  /**
   * Executes `which su` style commands to detect root (Android only).
   *
   * @returns DetectionResult
   */
  checkExecutingCommands(): Promise<DetectionResult>;

  /**
   * Detects suspicious installed packages (Android only).
   *
   * @returns DetectionResult
   */
  checkInstalledPackages(): Promise<DetectionResult>;

  /**
   * Detects tampered OTA certificates (Android only).
   *
   * @returns DetectionResult
   */
  checkforOverTheAirCertificates(): Promise<DetectionResult>;

  /**
   * Detects common emulator fingerprints (Android only).
   *
   * @returns DetectionResult
   */
  isRunningOnEmulator(): Promise<DetectionResult>;

  /**
   * Performs a lightweight emulator check (Android only).
   *
   * @returns DetectionResult
   */
  simpleCheckEmulator(): Promise<DetectionResult>;

  /**
   * Detects x86 emulator fingerprints (Android only).
   *
   * @returns DetectionResult
   */
  simpleCheckSDKBF86(): Promise<DetectionResult>;

  /**
   * Detects QC reference phone builds (Android only).
   *
   * @returns DetectionResult
   */
  simpleCheckQRREFPH(): Promise<DetectionResult>;

  /**
   * Detects build host anomalies (Android only).
   *
   * @returns DetectionResult
   */
  simpleCheckBuild(): Promise<DetectionResult>;

  /**
   * Detects Genymotion emulator fingerprints (Android only).
   *
   * @returns DetectionResult
   */
  checkGenymotion(): Promise<DetectionResult>;

  /**
   * Detects generic emulator fingerprints (Android only).
   *
   * @returns DetectionResult
   */
  checkGeneric(): Promise<DetectionResult>;

  /**
   * Detects Google SDK emulator fingerprints (Android only).
   *
   * @returns DetectionResult
   */
  checkGoogleSDK(): Promise<DetectionResult>;

  /**
   * Returns device information collected during detection.
   *
   * Provides additional context and metadata about the device that was
   * gathered during the root detection process. Useful for debugging
   * and logging purposes.
   *
   * @returns Promise that resolves with device information
   * @throws Error if getting device info fails
   * @since 1.0.0
   * @example
   * ```typescript
   * const deviceInfo = await IsRoot.togetDeviceInfo();
   * console.log('Device info:', deviceInfo);
   * ```
   */
  togetDeviceInfo(): Promise<DeviceInfo>;

  /**
   * Extends the default detection with emulator heuristics (Android only).
   *
   * @returns DetectionResult
   */
  isRootedWithEmulator(): Promise<DetectionResult>;

  /**
   * Extends the BusyBox detection with emulator heuristics (Android only).
   *
   * @returns DetectionResult
   */
  isRootedWithBusyBoxWithEmulator(): Promise<DetectionResult>;

  /**
   * Get the native Capacitor plugin version.
   *
   * @returns Promise that resolves with the plugin version
   * @throws Error if getting the version fails
   * @since 1.0.0
   * @example
   * ```typescript
   * const { version } = await IsRoot.getPluginVersion();
   * console.log('Plugin version:', version);
   * ```
   */
  getPluginVersion(): Promise<{ version: string }>;
}
