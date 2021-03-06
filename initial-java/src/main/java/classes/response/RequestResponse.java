package classes.response;


public class RequestResponse {

    private Boolean success;

    private String message;

    public RequestResponse(Boolean success, String message) {
        this.message = message;
        this.success = success;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
