import { WebPlugin } from '@capacitor/core';

import type { DeviceInfo, DetectionResult, IsRootPlugin } from './definitions';

export class IsRootWeb extends WebPlugin implements IsRootPlugin {
  private resolved(result: boolean): Promise<DetectionResult> {
    return Promise.resolve({ result });
  }

  async isRooted(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async isRootedWithBusyBox(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async detectRootManagementApps(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async detectPotentiallyDangerousApps(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async detectTestKeys(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkForBusyBoxBinary(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkForSuBinary(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkSuExists(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkForRWPaths(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkForDangerousProps(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkForRootNative(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async detectRootCloakingApps(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async isSelinuxFlagInEnabled(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async isExistBuildTags(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async doesSuperuserApkExist(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async isExistSUPath(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkDirPermissions(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkExecutingCommands(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkInstalledPackages(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkforOverTheAirCertificates(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async isRunningOnEmulator(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async simpleCheckEmulator(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async simpleCheckSDKBF86(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async simpleCheckQRREFPH(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async simpleCheckBuild(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkGenymotion(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkGeneric(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async checkGoogleSDK(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async togetDeviceInfo(): Promise<DeviceInfo> {
    return {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      platform: typeof navigator !== 'undefined' ? navigator.platform : '',
      language: typeof navigator !== 'undefined' ? navigator.language : '',
    };
  }

  async isRootedWithEmulator(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async isRootedWithBusyBoxWithEmulator(): Promise<DetectionResult> {
    return this.resolved(false);
  }

  async getPluginVersion(): Promise<{ version: string }> {
    return { version: 'web' };
  }
}
