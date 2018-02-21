package hello;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Track {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long iD;

    public Track() {}

    public Track(int trackNumber, int trackPar) {
        this.trackNumber = trackNumber;
        this.trackPar = trackPar;
    }

    private int trackNumber;
    private int trackPar;

    public int getTrackPar() {
        return trackPar;
    }

    public void setTrackPar(int trackPar) {
        this.trackPar = trackPar;
    }

    public int getTrackNumber() {
        return trackNumber;
    }

    public void setTrackNumber(int trackNumber) {
        this.trackNumber = trackNumber;
    }
}
