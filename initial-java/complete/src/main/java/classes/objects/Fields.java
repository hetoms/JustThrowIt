package classes.objects;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Fields {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private long fieldID;

    private String county;

    private String fieldName;

    private int numberOfTracks ;

    @OneToMany(cascade = {CascadeType.ALL})

    @ElementCollection(targetClass=Track.class)

    private List<Track> tracks = new ArrayList<>();

    private double latitude;

    private double longitude;

    private int pars;

    private String text = "";

    public Fields() {}

    public Fields(String fieldName, int numberOfTracks, double latitude, double longitude, int pars) {
        this.fieldName = fieldName;
        this.numberOfTracks = numberOfTracks;
        this.latitude = latitude;
        this.longitude = longitude;
        this.pars = pars;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public int getNumberOfTracks() {
        return this.numberOfTracks;
    }

    public void setNumberOfTracks(int numberOfTracks) {
        this.numberOfTracks = numberOfTracks;
    }

    public long getFieldID() {
        return this.fieldID;
    }

    public List<Track> getTracks() {
        return this.tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }

    public void addTrack(Track track) {
        this.getTracks().add(track);
    }

    public double getLatitude() {
        return this.latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return this.longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public int getPars() {
        return pars;
    }

    public void setPars(int pars) {
        this.pars = pars;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }
}
