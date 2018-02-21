package hello;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Fields {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long fieldID;

    private String fieldName;
    private int numberOfTracks ;
    @OneToMany(cascade = {CascadeType.ALL})
    @ElementCollection(targetClass=Track.class)
    private List<Track> tracks = new ArrayList<>();
    private double latitude;
    private double longitude;

    public Fields() {}

    public Fields(String fieldName, int numberOfTracks, double latitude, double longitude) {
        this.fieldName = fieldName;
        this.numberOfTracks = numberOfTracks;
        this.latitude = latitude;
        this.longitude = longitude;
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
}
