import { IsRoot } from '@capgo/capacitor-is-root';

const checks = [
  { id: 'isRooted', label: 'Default root detection', method: 'isRooted', description: 'Runs the default RootBeer checks to identify rooted or jailbroken devices.' },
  { id: 'isRootedWithBusyBox', label: 'Root detection + BusyBox', method: 'isRootedWithBusyBox', description: 'Extends the default checks by scanning for BusyBox binaries.' },
  { id: 'detectRootManagementApps', label: 'Root management apps', method: 'detectRootManagementApps', description: 'Looks for installed applications known to manage root access.' },
  { id: 'detectPotentiallyDangerousApps', label: 'Dangerous apps', method: 'detectPotentiallyDangerousApps', description: 'Detects apps commonly present on compromised devices.' },
  { id: 'detectTestKeys', label: 'Test keys', method: 'detectTestKeys', description: 'Checks for test keys in the system build tags.' },
  { id: 'checkForBusyBoxBinary', label: 'BusyBox binary', method: 'checkForBusyBoxBinary', description: 'Checks if BusyBox binaries are present on the filesystem.' },
  { id: 'checkForSuBinary', label: '`su` binary presence', method: 'checkForSuBinary', description: 'Detects the presence of the superuser binary.' },
  { id: 'checkSuExists', label: '`su` executable', method: 'checkSuExists', description: 'Attempts to execute the `su` binary.' },
  { id: 'checkForRWPaths', label: 'RW system paths', method: 'checkForRWPaths', description: 'Scans for world-writable system paths.' },
  { id: 'checkForDangerousProps', label: 'Dangerous system props', method: 'checkForDangerousProps', description: 'Reads system properties indicative of root.' },
  { id: 'checkForRootNative', label: 'RootBeer native', method: 'checkForRootNative', description: 'Runs the native RootBeer detector suite.' },
  { id: 'detectRootCloakingApps', label: 'Root cloaking apps', method: 'detectRootCloakingApps', description: 'Detects apps that attempt to hide root access.' },
  { id: 'isSelinuxFlagInEnabled', label: 'SELinux flag enabled', method: 'isSelinuxFlagInEnabled', description: 'Checks whether SELinux is running in enforcing mode.' },
  { id: 'isExistBuildTags', label: 'Build tags', method: 'isExistBuildTags', description: 'Examines build tags for signs of tampering.' },
  { id: 'doesSuperuserApkExist', label: 'Superuser APK', method: 'doesSuperuserApkExist', description: 'Detects installations of known superuser APKs.' },
  { id: 'isExistSUPath', label: 'Known SU paths', method: 'isExistSUPath', description: 'Checks common filesystem locations for the su binary.' },
  { id: 'checkDirPermissions', label: 'Directory permissions', method: 'checkDirPermissions', description: 'Inspects directory permissions for unsafe configurations.' },
  { id: 'checkExecutingCommands', label: 'Execute detection commands', method: 'checkExecutingCommands', description: 'Executes shell commands to surface root access.' },
  { id: 'checkInstalledPackages', label: 'Installed packages', method: 'checkInstalledPackages', description: 'Scans installed packages for root indicators.' },
  { id: 'checkforOverTheAirCertificates', label: 'OTA certificates', method: 'checkforOverTheAirCertificates', description: 'Looks for modified over-the-air update certificates.' },
  { id: 'isRunningOnEmulator', label: 'Emulator detection', method: 'isRunningOnEmulator', description: 'Determines whether the device is likely an emulator.' },
  { id: 'simpleCheckEmulator', label: 'Simple emulator check', method: 'simpleCheckEmulator', description: 'Performs lightweight emulator heuristics.' },
  { id: 'simpleCheckSDKBF86', label: 'x86 emulator check', method: 'simpleCheckSDKBF86', description: 'Detects x86 emulator traits.' },
  { id: 'simpleCheckQRREFPH', label: 'QC reference check', method: 'simpleCheckQRREFPH', description: 'Looks for Qualcomm reference handset signatures.' },
  { id: 'simpleCheckBuild', label: 'Build fingerprint check', method: 'simpleCheckBuild', description: 'Examines build fingerprints for anomalies.' },
  { id: 'checkGenymotion', label: 'Genymotion detection', method: 'checkGenymotion', description: 'Detects Genymotion emulator artifacts.' },
  { id: 'checkGeneric', label: 'Generic emulator detection', method: 'checkGeneric', description: 'Runs generic emulator detection heuristics.' },
  { id: 'checkGoogleSDK', label: 'Google SDK emulator detection', method: 'checkGoogleSDK', description: 'Detects Google SDK emulator traits.' },
  { id: 'togetDeviceInfo', label: 'Device info snapshot', method: 'togetDeviceInfo', description: 'Returns debug information captured during detection.', isInfo: true },
  { id: 'isRootedWithEmulator', label: 'Root + emulator heuristics', method: 'isRootedWithEmulator', description: 'Combines root and emulator detection strategies.' },
  { id: 'isRootedWithBusyBoxWithEmulator', label: 'Root + BusyBox + emulator', method: 'isRootedWithBusyBoxWithEmulator', description: 'Runs BusyBox, root, and emulator checks together.' },
];

const checkSelect = document.getElementById('checkSelect');
const checkDescription = document.getElementById('checkDescription');
const runCheckButton = document.getElementById('runCheckButton');
const runAllButton = document.getElementById('runAllButton');
const resultsList = document.getElementById('resultsList');
const resultDetail = document.getElementById('resultDetail');

const formatResultSummary = (payload, isInfo) => {
  if (payload == null) {
    return 'No payload returned.';
  }
  if (!isInfo && typeof payload === 'object' && 'result' in payload) {
    return `Result: ${payload.result ? 'Positive' : 'Negative'}`;
  }
  if (typeof payload === 'object') {
    return `Keys: ${Object.keys(payload).join(', ') || 'none'}`;
  }
  return String(payload);
};

const addResultCard = (check, payload, error) => {
  if (!resultsList) return;
  const card = document.createElement('div');
  card.className = 'result-card';

  const heading = document.createElement('h3');
  heading.textContent = check.label;

  const desc = document.createElement('p');
  desc.className = 'result-summary';
  if (error) {
    desc.textContent = `Error: ${error}`;
    card.classList.add('result-error');
  } else {
    desc.textContent = formatResultSummary(payload, check.isInfo);
  }

  card.appendChild(heading);
  card.appendChild(desc);

  resultsList.insertAdjacentElement('afterbegin', card);
};

const updateDetail = (content) => {
  if (resultDetail) {
    resultDetail.textContent = JSON.stringify(content, null, 2);
  }
};

const runCheck = async (check) => {
  try {
    const fn = IsRoot[check.method];
    if (typeof fn !== 'function') {
      throw new Error('Method not available on this platform.');
    }
    const response = await fn.call(IsRoot);
    addResultCard(check, response);
    updateDetail({ check: check.id, response });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    addResultCard(check, null, message);
    updateDetail({ check: check.id, error: message });
  }
};

const populateSelect = () => {
  if (!checkSelect) return;
  checkSelect.innerHTML = '';
  checks.forEach((check) => {
    const option = document.createElement('option');
    option.value = check.id;
    option.textContent = check.label;
    checkSelect.appendChild(option);
  });
  if (checks.length > 0) {
    checkSelect.value = checks[0].id;
    checkDescription.textContent = checks[0].description;
  }
};

checkSelect?.addEventListener('change', () => {
  const check = checks.find((item) => item.id === checkSelect.value);
  checkDescription.textContent = check?.description ?? 'Select a check to see details.';
});

runCheckButton?.addEventListener('click', async () => {
  const check = checks.find((item) => item.id === checkSelect?.value);
  if (!check) {
    return;
  }
  await runCheck(check);
});

runAllButton?.addEventListener('click', async () => {
  for (const check of checks) {
    // eslint-disable-next-line no-await-in-loop
    await runCheck(check);
  }
});

populateSelect();
