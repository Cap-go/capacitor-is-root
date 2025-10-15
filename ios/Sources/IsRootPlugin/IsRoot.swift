import Darwin
import Foundation
#if canImport(UIKit)
import UIKit
#endif
import MachO

@objc public class IsRoot: NSObject {
    private let fileManager = FileManager.default

    private let suspiciousPaths: [String] = [
        "/Applications/Cydia.app",
        "/Library/MobileSubstrate/MobileSubstrate.dylib",
        "/bin/bash",
        "/usr/sbin/sshd",
        "/etc/apt",
        "/private/var/stash",
        "/private/var/lib/apt",
        "/private/var/tmp/cydia.log",
        "/private/var/lib/cydia",
        "/Library/MobileSubstrate/DynamicLibraries/Veency.plist",
        "/Library/MobileSubstrate/DynamicLibraries/LiveClock.plist",
        "/System/Library/LaunchDaemons/com.ikey.bbot.plist",
        "/System/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist",
        "/var/cache/apt",
        "/var/lib/apt",
        "/var/lib/cydia",
        "/var/log/syslog",
        "/var/tmp/cydia.log",
        "/bin/sh",
        "/usr/libexec/ssh-keysign",
        "/usr/bin/sshd",
        "/usr/libexec/sftp-server",
        "/etc/ssh/sshd_config",
        "/Applications/RockApp.app",
        "/Applications/Icy.app",
        "/Applications/WinterBoard.app",
        "/Applications/SBSettings.app",
        "/Applications/MxTube.app",
        "/Applications/IntelliScreen.app",
        "/Applications/FakeCarrier.app",
        "/Applications/blackra1n.app",
        "/usr/bin/frida-server",
        "/usr/local/bin/cycript",
        "/usr/lib/libcycript.dylib"
    ]

    private let hiddenFiles: [String] = [
        "/Applications/RockApp.app",
        "/Applications/Icy.app",
        "/usr/sbin/sshd",
        "/usr/bin/sshd",
        "/usr/libexec/sftp-server",
        "/Applications/WinterBoard.app",
        "/Applications/SBSettings.app",
        "/Applications/MxTube.app",
        "/Applications/IntelliScreen.app",
        "/Library/MobileSubstrate/DynamicLibraries/Veency.plist",
        "/Library/MobileSubstrate/DynamicLibraries/LiveClock.plist",
        "/private/var/lib/apt",
        "/private/var/stash",
        "/System/Library/LaunchDaemons/com.ikey.bbot.plist",
        "/System/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist",
        "/private/var/tmp/cydia.log",
        "/private/var/lib/cydia",
        "/etc/clutch.conf",
        "/var/cache/clutch.plist",
        "/etc/clutch_cracked.plist",
        "/var/cache/clutch_cracked.plist",
        "/var/lib/clutch/overdrive.dylib",
        "/var/root/Documents/Cracked/"
    ]

    private let processIndicators: [String] = [
        "MobileCydia",
        "Cydia",
        "afpd"
    ]

    private let symbolicLinkCandidates: [String] = [
        "/Applications",
        "/var/stash/Library/Ringtones",
        "/var/stash/Library/Wallpaper",
        "/var/stash/usr/include",
        "/var/stash/usr/libexec",
        "/var/stash/usr/share",
        "/var/stash/usr/arm-apple-darwin9"
    ]

    @objc public func isRooted() -> Bool {
        #if targetEnvironment(simulator)
        return false
        #endif

        if hasSuspiciousFiles() {
            return true
        }

        if canReadRestrictedFiles() {
            return true
        }

        if canWriteOutsideSandbox(paths: ["/private/jailbreaktest.txt", "/private/test_jb.txt"]) {
            return true
        }

        if canOpenCydiaURL() {
            return true
        }

        if hasSuspiciousSymbolicLinks() {
            return true
        }

        if aggregatedDetectionScore() >= 3 {
            return true
        }

        return false
    }

    private func hasSuspiciousFiles() -> Bool {
        for path in suspiciousPaths {
            if fileManager.fileExists(atPath: path) {
                return true
            }
        }
        return false
    }

    private func canReadRestrictedFiles() -> Bool {
        for path in suspiciousPaths {
            if let file = fopen(path, "r") {
                fclose(file)
                return true
            }
        }
        return false
    }

    private func canWriteOutsideSandbox(paths: [String]) -> Bool {
        for path in paths {
            do {
                try "Jailbreak test".write(toFile: path, atomically: true, encoding: .utf8)
                try? fileManager.removeItem(atPath: path)
                return true
            } catch {
                try? fileManager.removeItem(atPath: path)
            }
        }
        return false
    }

    private func canOpenCydiaURL() -> Bool {
        #if canImport(UIKit)
        var result = false
        let block = {
            if let url = URL(string: "cydia://package/com.example.package"), UIApplication.shared.canOpenURL(url) {
                result = true
            }
        }
        if Thread.isMainThread {
            block()
        } else {
            DispatchQueue.main.sync(execute: block)
        }
        return result
        #else
        return false
        #endif
    }

    private func hasSuspiciousSymbolicLinks() -> Bool {
        for path in symbolicLinkCandidates {
            var statInfo = stat()
            if lstat(path, &statInfo) == 0 && (statInfo.st_mode & S_IFMT) == S_IFLNK {
                return true
            }
        }
        return false
    }

    private func aggregatedDetectionScore() -> Int {
        var score = 0

        if urlCheck() { score += 3 }
        if cydiaCheck() { score += 3 }
        if inaccessibleFilesCheck() { score += 2 }
        if plistCheck() { score += 2 }
        if processesCheck() { score += 2 }
        if fstabCheck() { score += 1 }
        if symbolicLinkCheck() { score += 2 }
        if filesExistCheck() { score += 2 }
        if checkFork() { score += 2 }
        if isFridaRunning() { score += 2 }
        if isFridaInjected() { score += 2 }
        if isDebugged() { score += 2 }

        return score
    }

    private func urlCheck() -> Bool {
        return canOpenCydiaURL()
    }

    private func cydiaCheck() -> Bool {
        return fileManager.fileExists(atPath: "/Applications/Cydia.app")
    }

    private func inaccessibleFilesCheck() -> Bool {
        for path in hiddenFiles {
            if fileManager.fileExists(atPath: path) {
                return true
            }
        }
        return false
    }

    private func plistCheck() -> Bool {
        guard let executablePath = Bundle.main.executablePath else {
            return true
        }
        let exists = fileManager.fileExists(atPath: executablePath)
        let info = Bundle.main.infoDictionary
        return !exists || info == nil || info?.isEmpty == true
    }

    private func processesCheck() -> Bool {
        guard let processes = runningProcesses() else {
            return false
        }
        for process in processes {
            if let name = process["ProcessName"] as? String, processIndicators.contains(name) {
                return true
            }
        }
        return false
    }

    private func fstabCheck() -> Bool {
        var fileStat = stat()
        if stat("/etc/fstab", &fileStat) == 0 {
            return fileStat.st_size != 80
        }
        return false
    }

    private func symbolicLinkCheck() -> Bool {
        return hasSuspiciousSymbolicLinks()
    }

    private func filesExistCheck() -> Bool {
        guard let executablePath = Bundle.main.executablePath else {
            return true
        }
        return !fileManager.fileExists(atPath: executablePath)
    }

    private func checkFork() -> Bool {
        return false
    }

    private func isFridaRunning() -> Bool {
        var address = sockaddr_in()
        address.sin_family = sa_family_t(AF_INET)
        address.sin_port = UInt16(27042).bigEndian
        address.sin_addr.s_addr = inet_addr("127.0.0.1")

        let socketDescriptor = socket(AF_INET, SOCK_STREAM, 0)
        if socketDescriptor < 0 {
            return false
        }
        defer { close(socketDescriptor) }

        var mutableAddress = address
        let result = withUnsafePointer(to: &mutableAddress) { pointer -> Bool in
            pointer.withMemoryRebound(to: sockaddr.self, capacity: 1) {
                connect(socketDescriptor, $0, socklen_t(MemoryLayout<sockaddr_in>.stride)) == 0
            }
        }
        return result
    }

    private func isFridaInjected() -> Bool {
        let imageCount = _dyld_image_count()
        for index in 0..<imageCount {
            if let namePointer = _dyld_get_image_name(index) {
                let name = String(cString: namePointer)
                if name.contains("FridaGadget") {
                    return true
                }
            }
        }
        return false
    }

    private func isDebugged() -> Bool {
        var info = kinfo_proc()
        var mib: [Int32] = [CTL_KERN, KERN_PROC, KERN_PROC_PID, getpid()]
        var size = MemoryLayout<kinfo_proc>.stride
        let result = sysctl(&mib, u_int(mib.count), &info, &size, nil, 0)
        if result != 0 {
            return false
        }
        return (info.kp_proc.p_flag & P_TRACED) != 0
    }

    private func runningProcesses() -> [[String: Any]]? {
        var mib: [Int32] = [CTL_KERN, KERN_PROC, KERN_PROC_ALL, 0]
        var size: size_t = 0
        var status = sysctl(&mib, u_int(mib.count), nil, &size, nil, 0)
        if status != 0 {
            return nil
        }

        let processCount = Int(size / MemoryLayout<kinfo_proc>.stride)
        var processList = [kinfo_proc](repeating: kinfo_proc(), count: processCount)
        status = sysctl(&mib, u_int(mib.count), &processList, &size, nil, 0)
        if status != 0 {
            return nil
        }

        var processes: [[String: Any]] = []
        for index in 0..<processCount {
            let process = processList[index]
            let processID = Int(process.kp_proc.p_pid)
            let priority = Int(process.kp_proc.p_priority)
            let startTime = TimeInterval(process.kp_proc.p_un.__p_starttime.tv_sec)

            let processName: String = withUnsafePointer(to: process.kp_proc.p_comm) { pointer in
                pointer.withMemoryRebound(to: CChar.self, capacity: Int(MAXCOMLEN)) {
                    String(cString: $0)
                }
            }

            let entry: [String: Any] = [
                "ProcessID": processID,
                "ProcessPriority": priority,
                "ProcessName": processName,
                "ProcessStartDate": Date(timeIntervalSince1970: startTime)
            ]
            processes.append(entry)
        }
        return processes
    }
}
