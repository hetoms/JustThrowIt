package classes.database;

import classes.objects.Lobby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@Repository("lobbyRepository")
public interface LobbyRepository extends JpaRepository<Lobby, Long> {
    @Query("SELECT l FROM Lobby l WHERE l.id = :id")
    public List<Lobby> find(@Param("id") int id);
}