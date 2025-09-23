export interface DetectionResult {
  /**
   * `true` when the associated heuristic detects root/jailbreak artifacts.
   */
  result: boolean;
}

export interface DeviceInfo {
  /**
   * Arbitrary key/value device metadata populated by the native implementation.
   */
  [key: string]: any;
}

export interface IsRootPlugin {
  /**
   * Performs the default root/jailbreak detection checks.
   *
   * @returns DetectionResult
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
}
