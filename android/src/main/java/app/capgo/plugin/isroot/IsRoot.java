package app.capgo.plugin.isroot;

import android.content.Context;
import com.getcapacitor.Logger;
import com.scottyab.rootbeer.RootBeer;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Core root/jailbreak detection utilities.
 */
public class IsRoot {

    private static final String TAG = "IsRoot";

    private final InternalRootDetection internalRootDetection = new InternalRootDetection();

    public boolean isRooted(Context context) {
        RootBeer rootBeer = new RootBeer(context);

        boolean checkRootBeer = rootBeer.isRooted();
        boolean checkInternal = internalRootDetection.isRooted(context);

        Logger.debug(TAG, "isRooted - rootBeer: " + checkRootBeer + ", internal: " + checkInternal);

        return checkRootBeer || checkInternal;
    }

    public boolean isRootedWithBusyBox(Context context) {
        RootBeer rootBeer = new RootBeer(context);

        boolean checkRootBeer = rootBeer.isRootedWithBusyBoxCheck();
        boolean checkInternal = internalRootDetection.isRooted(context);

        Logger.debug(TAG, "isRootedWithBusyBox - rootBeer: " + checkRootBeer + ", internal: " + checkInternal);

        return checkRootBeer || checkInternal;
    }

    public boolean isRootedWithEmulator(Context context) {
        RootBeer rootBeer = new RootBeer(context);

        boolean checkRootBeer = rootBeer.isRooted();
        boolean checkInternal = internalRootDetection.isRootedWithEmulator(context);

        Logger.debug(TAG, "isRootedWithEmulator - rootBeer: " + checkRootBeer + ", internal: " + checkInternal);

        return checkRootBeer || checkInternal;
    }

    public boolean isRootedWithBusyBoxWithEmulator(Context context) {
        RootBeer rootBeer = new RootBeer(context);

        boolean checkRootBeer = rootBeer.isRootedWithBusyBoxCheck();
        boolean checkInternal = internalRootDetection.isRootedWithEmulator(context);

        Logger.debug(TAG, "isRootedWithBusyBoxWithEmulator - rootBeer: " + checkRootBeer + ", internal: " + checkInternal);

        return checkRootBeer || checkInternal;
    }

    public boolean detectRootManagementApps(Context context) {
        return new RootBeer(context).detectRootManagementApps();
    }

    public boolean detectPotentiallyDangerousApps(Context context) {
        return new RootBeer(context).detectPotentiallyDangerousApps();
    }

    public boolean detectTestKeys(Context context) {
        return new RootBeer(context).detectTestKeys();
    }

    public boolean checkForBusyBoxBinary(Context context) {
        return new RootBeer(context).checkForBusyBoxBinary();
    }

    public boolean checkForSuBinary(Context context) {
        return new RootBeer(context).checkForSuBinary();
    }

    public boolean checkSuExists(Context context) {
        return new RootBeer(context).checkSuExists();
    }

    public boolean checkForRWPaths(Context context) {
        return new RootBeer(context).checkForRWPaths();
    }

    public boolean checkForDangerousProps(Context context) {
        return new RootBeer(context).checkForDangerousProps();
    }

    public boolean checkForRootNative(Context context) {
        return new RootBeer(context).checkForRootNative();
    }

    public boolean detectRootCloakingApps(Context context) {
        return new RootBeer(context).detectRootCloakingApps();
    }

    public boolean isSelinuxFlagInEnabled() {
        return Utils.isSelinuxFlagInEnabled();
    }

    public boolean runInternalCheck(String action, Context context) {
        return internalRootDetection.WhatisRooted(action, context);
    }

    public JSONObject getDeviceInfo() throws JSONException {
        return internalRootDetection.togetDeviceInfo();
    }
}
