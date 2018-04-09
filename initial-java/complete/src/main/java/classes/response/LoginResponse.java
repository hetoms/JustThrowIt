package classes.response;

public class LoginResponse {
    private Boolean loginBoolean;

    private String hashedPassword;

    public LoginResponse(Boolean loginBoolean) {
        this.loginBoolean = loginBoolean;
    }

    public Boolean getLoginBoolean() {
        return loginBoolean;
    }

    public void setLoginBoolean(Boolean loginBoolean) {
        this.loginBoolean = loginBoolean;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }
}
