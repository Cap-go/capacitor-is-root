package app.capgo.plugin.isroot;

import android.os.Build;

import java.util.Arrays;
import java.util.List;

public final class Constants {

    public static final String LOG_TAG = "IsRoot";

    public static final String ANDROID_OS_BUILD_TAGS = Build.TAGS;

    public static final String OTA_CERTIFICATES_PATH = "/etc/security/otacerts.zip";
    public static final String CYDIA_SUBSTRATE_PACKAGE = "com.saurik.substrate";

    public static final List<String> SUPER_USER_APK_FILES = Arrays.asList(
        "/system/app/Superuser.apk",
        "/system/app/superuser.apk",
        "/system/app/Superuser/Superuser.apk",
        "/system/app/Superuser/superuser.apk",
        "/system/app/superuser/Superuser.apk",
        "/system/app/superuser/superuser.apk"
    );

    public static final List<String> BLACKLISTED_PACKAGES = Arrays.asList(
        "com.noshufou.android.su",
        "com.thirdparty.superuser",
        "eu.chainfire.supersu",
        "com.koushikdutta.superuser",
        "com.zachspong.temprootremovejb",
        "com.ramdroid.appquarantine"
    );

    public static final List<String> ROOT_ONLY_APPLICATIONS = Arrays.asList(
        "eu.chainfire.stickmount",
        "eu.chainfire.mobileodin.pro",
        "eu.chainfire.liveboot",
        "eu.chainfire.pryfi",
        "eu.chainfire.adbd",
        "eu.chainfire.recently",
        "eu.chainfire.flash",
        "eu.chainfire.stickmount.pro",
        "eu.chainfire.triangleaway",
        "org.adblockplus.android"
    );

    public static final List<String> PATHS_THAT_SHOULD_NOT_BE_WRITABLE = Arrays.asList(
        "/data",
        "/",
        "/system",
        "/system/bin",
        "/system/sbin",
        "/system/xbin",
        "/vendor/bin",
        "/sbin",
        "/etc"
    );

    public static final List<String> SU_PATHES = Arrays.asList(
        "/data/local/",
        "/data/local/xbin/",
        "/data/local/bin/",
        "/sbin/",
        "/system/",
        "/system/bin/",
        "/system/bin/.ext/",
        "/system/bin/.ext/.su/",
        "/system/bin/failsafe/",
        "/system/sd/xbin/",
        "/system/xbin/",
        "/su/bin/",
        "/su/xbin/",
        "/ipcData/local/",
        "/ipcData/local/xbin/",
        "/system/usr/we-need-root/",
        "/system/usr/we-need-root/su-backup/",
        "/system/xbin/mu/",
        "/magisk/.core/bin/"
    );

    private Constants() {
        throw new IllegalStateException("Utility class");
    }
}

