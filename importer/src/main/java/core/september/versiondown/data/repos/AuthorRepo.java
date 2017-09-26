package core.september.versiondown.data.repos;

import org.springframework.data.repository.CrudRepository;

import core.september.versiondown.data.models.Author;

public interface AuthorRepo extends CrudRepository<Author, Long>{
	
	public Author findByName(String name);

}
