package classes.objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class SavedGame {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long iD;

    @NotNull
    private long fieldId;

    @NotNull
    private String date;

    @NotNull
    private String data;

    @NotNull
    private String username;

    public SavedGame() {}

    public SavedGame(long fieldId, String data, String date, String username) {
        this.fieldId = fieldId;
        this.data = data;
        this.username = username;
        this.date = date;
    }

    public long getFieldId() {
        return fieldId;
    }

    public void setFieldId(long fieldId) {
        this.fieldId = fieldId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
