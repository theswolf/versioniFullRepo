package core.september.versiondown.data.service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.base.Optional;

import core.september.versiondown.data.models.Author;
import core.september.versiondown.data.models.Translation;
import core.september.versiondown.data.models.Version;
import core.september.versiondown.data.repos.AuthorRepo;
import core.september.versiondown.data.repos.TranslationRepo;
import core.september.versiondown.data.repos.VersionRepo;
import core.september.versiondown.models.HomeLink;


@Service
public class DataService {
	
	@Autowired 
	private AuthorRepo authorRepo;
	
	@Autowired 
	private VersionRepo versionRepo;
	
	@Autowired
	private TranslationRepo translationRepo;
	
	public Author insertAuthorIfMissing(HomeLink hl) {
		Author author = new Author();
		author.setName(hl.getText());
		author.setDescription(hl.getDesc());
		
		Author authoret = null; 
		if((authoret = authorRepo.findByName(author.getName()) ) == null) {
			return authorRepo.save(author);
		}
		
		return authoret;
	}
	
	public Version insertVersionIfMissing(HomeLink hl) {
		Version data = new Version();
		data.setTitolo(hl.getText());
		data.setDescrizione(hl.getDesc());
		
		Version dataret = null; 
		if((dataret = versionRepo.findByTitoloAndDescrizione(data.getTitolo(),data.getDescrizione()) ) == null) {
			return versionRepo.save(data);
		}
		
		return dataret;
	}
	
	public Translation insertTranslation(HomeLink hl) {
		Translation data = new Translation();
		data.setTitolo(hl.getText());
		return translationRepo.save(data);
	}
	
	public void addVersionToAuthor(Author a,Version v) {
		Optional<List<Version>> versionForAuthor = Optional.fromNullable(a.getVersion());
		boolean isEmpty = true;
		if(versionForAuthor.isPresent()) {
			isEmpty = versionForAuthor.get().stream().filter(version -> version.getId().equals(v.getId())).collect(Collectors.toList()).isEmpty();
		}
		
		if(isEmpty) {
			if(!versionForAuthor.isPresent()) { 
				a.setVersion(new LinkedList<>());
			}
			a.getVersion().add(v);
			authorRepo.save(a);
		}
	}

	public void addTranslationToVersion(Version v, Translation t) {
		Optional<List<Translation>> trans = Optional.fromNullable(v.getTranslations());
		boolean isEmpty = true;
		if(trans.isPresent()) {
			isEmpty = trans.get().stream().filter(version -> version.getId().equals(v.getId())).collect(Collectors.toList()).isEmpty();
		}
		
		if(isEmpty) {
			if(!trans.isPresent()) { 
				v.setTranslations(new LinkedList<>());
			}
			v.getTranslations().add(t);
			versionRepo.save(v);
		}
		
	}
	
	public Translation saveTranslation( Translation t) {
		return translationRepo.save(t);
	}

}
