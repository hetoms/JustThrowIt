package classes.database;

import classes.objects.Fields;
import classes.objects.Person;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "fields", path = "fields")
public interface FieldRepository extends PagingAndSortingRepository<Fields, Long> {
    @Query("SELECT f FROM Fields f WHERE f.fieldID = :fieldID")
    public List<Fields> find(@Param("fieldID") long fieldId);
}
