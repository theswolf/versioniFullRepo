package core.september.versiondown.data.repos;

import org.springframework.data.repository.CrudRepository;

import core.september.versiondown.data.models.Author;
import core.september.versiondown.data.models.Version;

public interface VersionRepo extends CrudRepository<Version, Long>{
	
	//public Version findByTitolo(String name);

	public Version findByTitoloAndDescrizione(String titolo, String descrizione);

}
