package app.capgo.plugin.isroot;

import com.getcapacitor.Logger;

public class IsRoot {

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }
}
