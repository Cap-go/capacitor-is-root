package app.capgo.plugin.isroot;

import android.os.Build;
import com.getcapacitor.Logger;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.lang.reflect.Method;

public final class Utils {

    private Utils() {
        throw new IllegalStateException("Utility class");
    }

    public static boolean isSelinuxFlagInEnabled() {
        try {
            Class<?> c = Class.forName("android.os.SystemProperties");
            Method get = c.getMethod("get", String.class);
            String selinux = (String) get.invoke(c, "ro.build.selinux");
            return "1".equals(selinux);
        } catch (Exception ignored) {
            return false;
        }
    }

    public static boolean canExecuteCommand(String command) {
        Process process = null;

        try {
            process = Runtime.getRuntime().exec(command);
            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
            return in.readLine() != null;
        } catch (Exception e) {
            Logger.error(Constants.LOG_TAG, "canExecuteCommand error: " + e.getMessage(), e);
            return false;
        } finally {
            if (process != null) {
                process.destroy();
            }
        }
    }

    public static void logDeviceInfo() {
        Logger.debug(Constants.LOG_TAG, String.format("Device: %s", Build.DEVICE));
        Logger.debug(Constants.LOG_TAG, String.format("Model: %s", Build.MODEL));
        Logger.debug(Constants.LOG_TAG, String.format("Manufacturer: %s", Build.MANUFACTURER));
        Logger.debug(Constants.LOG_TAG, String.format("Brand: %s", Build.BRAND));
        Logger.debug(Constants.LOG_TAG, String.format("Hardware: %s", Build.HARDWARE));
        Logger.debug(Constants.LOG_TAG, String.format("Product: %s", Build.PRODUCT));
        Logger.debug(Constants.LOG_TAG, String.format("Fingerprint: %s", Build.FINGERPRINT));
        Logger.debug(Constants.LOG_TAG, String.format("Host: %s", Build.HOST));
    }
}
