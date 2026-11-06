# Consumer rules for apps that minify with R8 (Capacitor 9+). Applied via consumerProguardFiles in build.gradle.

# Capacitor loads plugin classes with Class.forName and indexes @PluginMethod entry points at runtime (PluginHandle).
-keep class app.capgo.plugin.isroot.IsRootPlugin extends com.getcapacitor.Plugin {
    public <init>();
}
-keepclassmembers class app.capgo.plugin.isroot.IsRootPlugin {
    @com.getcapacitor.PluginMethod <methods>;
}

# isSelinuxFlagInEnabled uses Class.forName and Method.invoke on android.os.SystemProperties (hidden API); keep this method so the call is not inlined away.
-keepclassmembers class app.capgo.plugin.isroot.Utils {
    public static boolean isSelinuxFlagInEnabled();
}
