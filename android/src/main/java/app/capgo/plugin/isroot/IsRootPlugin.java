package app.capgo.plugin.isroot;

import android.content.Context;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import org.json.JSONException;
import org.json.JSONObject;

@CapacitorPlugin(name = "IsRoot")
public class IsRootPlugin extends Plugin {

    private final String pluginVersion = "8.1.9";

    private final IsRoot implementation = new IsRoot();

    @PluginMethod
    public void isRooted(PluginCall call) {
        handleBoolean(call, () -> implementation.isRooted(requireContext()));
    }

    @PluginMethod
    public void isRootedWithBusyBox(PluginCall call) {
        handleBoolean(call, () -> implementation.isRootedWithBusyBox(requireContext()));
    }

    @PluginMethod
    public void detectRootManagementApps(PluginCall call) {
        handleBoolean(call, () -> implementation.detectRootManagementApps(requireContext()));
    }

    @PluginMethod
    public void detectPotentiallyDangerousApps(PluginCall call) {
        handleBoolean(call, () -> implementation.detectPotentiallyDangerousApps(requireContext()));
    }

    @PluginMethod
    public void detectTestKeys(PluginCall call) {
        handleBoolean(call, () -> implementation.detectTestKeys(requireContext()));
    }

    @PluginMethod
    public void checkForBusyBoxBinary(PluginCall call) {
        handleBoolean(call, () -> implementation.checkForBusyBoxBinary(requireContext()));
    }

    @PluginMethod
    public void checkForSuBinary(PluginCall call) {
        handleBoolean(call, () -> implementation.checkForSuBinary(requireContext()));
    }

    @PluginMethod
    public void checkSuExists(PluginCall call) {
        handleBoolean(call, () -> implementation.checkSuExists(requireContext()));
    }

    @PluginMethod
    public void checkForRWPaths(PluginCall call) {
        handleBoolean(call, () -> implementation.checkForRWPaths(requireContext()));
    }

    @PluginMethod
    public void checkForDangerousProps(PluginCall call) {
        handleBoolean(call, () -> implementation.checkForDangerousProps(requireContext()));
    }

    @PluginMethod
    public void checkForRootNative(PluginCall call) {
        handleBoolean(call, () -> implementation.checkForRootNative(requireContext()));
    }

    @PluginMethod
    public void detectRootCloakingApps(PluginCall call) {
        handleBoolean(call, () -> implementation.detectRootCloakingApps(requireContext()));
    }

    @PluginMethod
    public void isSelinuxFlagInEnabled(PluginCall call) {
        handleBoolean(call, implementation::isSelinuxFlagInEnabled);
    }

    @PluginMethod
    public void isExistBuildTags(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("isExistBuildTags", requireContext()));
    }

    @PluginMethod
    public void doesSuperuserApkExist(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("doesSuperuserApkExist", requireContext()));
    }

    @PluginMethod
    public void isExistSUPath(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("isExistSUPath", requireContext()));
    }

    @PluginMethod
    public void checkDirPermissions(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("checkDirPermissions", requireContext()));
    }

    @PluginMethod
    public void checkExecutingCommands(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("checkExecutingCommands", requireContext()));
    }

    @PluginMethod
    public void checkInstalledPackages(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("checkInstalledPackages", requireContext()));
    }

    @PluginMethod
    public void checkforOverTheAirCertificates(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("checkforOverTheAirCertificates", requireContext()));
    }

    @PluginMethod
    public void isRunningOnEmulator(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("isRunningOnEmulator", requireContext()));
    }

    @PluginMethod
    public void simpleCheckEmulator(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("simpleCheckEmulator", requireContext()));
    }

    @PluginMethod
    public void simpleCheckSDKBF86(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("simpleCheckSDKBF86", requireContext()));
    }

    @PluginMethod
    public void simpleCheckQRREFPH(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("simpleCheckQRREFPH", requireContext()));
    }

    @PluginMethod
    public void simpleCheckBuild(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("simpleCheckBuild", requireContext()));
    }

    @PluginMethod
    public void checkGenymotion(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("checkGenymotion", requireContext()));
    }

    @PluginMethod
    public void checkGeneric(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("checkGeneric", requireContext()));
    }

    @PluginMethod
    public void checkGoogleSDK(PluginCall call) {
        handleBoolean(call, () -> implementation.runInternalCheck("checkGoogleSDK", requireContext()));
    }

    @PluginMethod
    public void togetDeviceInfo(PluginCall call) {
        handleObject(call, () -> implementation.getDeviceInfo());
    }

    @PluginMethod
    public void isRootedWithEmulator(PluginCall call) {
        handleBoolean(call, () -> implementation.isRootedWithEmulator(requireContext()));
    }

    @PluginMethod
    public void isRootedWithBusyBoxWithEmulator(PluginCall call) {
        handleBoolean(call, () -> implementation.isRootedWithBusyBoxWithEmulator(requireContext()));
    }

    private Context requireContext() {
        Context context = getContext();
        if (context == null) {
            throw new IllegalStateException("Context is not available");
        }
        return context;
    }

    private void handleBoolean(PluginCall call, BooleanSupplierWithException task) {
        execute(() -> {
            try {
                boolean result = task.get();
                JSObject ret = new JSObject();
                ret.put("result", result);
                call.resolve(ret);
            } catch (JSONException ex) {
                call.reject("Unable to encode result", ex);
            } catch (Exception ex) {
                call.reject(ex.getMessage(), ex);
            }
        });
    }

    private void handleObject(PluginCall call, ObjectSupplierWithException task) {
        execute(() -> {
            try {
                Object result = task.get();
                if (result instanceof JSONObject) {
                    JSObject ret = JSObject.fromJSONObject((JSONObject) result);
                    call.resolve(ret);
                } else if (result instanceof JSObject) {
                    call.resolve((JSObject) result);
                } else {
                    JSObject ret = new JSObject();
                    ret.put("value", result);
                    call.resolve(ret);
                }
            } catch (JSONException ex) {
                call.reject("Unable to encode JSON", ex);
            } catch (Exception ex) {
                call.reject(ex.getMessage(), ex);
            }
        });
    }

    @FunctionalInterface
    private interface BooleanSupplierWithException {
        boolean get() throws Exception;
    }

    @FunctionalInterface
    private interface ObjectSupplierWithException {
        Object get() throws Exception;
    }

    @PluginMethod
    public void getPluginVersion(final PluginCall call) {
        try {
            final JSObject ret = new JSObject();
            ret.put("version", this.pluginVersion);
            call.resolve(ret);
        } catch (final Exception e) {
            call.reject("Could not get plugin version", e);
        }
    }
}
