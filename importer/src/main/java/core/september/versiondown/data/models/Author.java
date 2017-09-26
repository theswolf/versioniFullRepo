package core.september.versiondown.data.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.transaction.Transactional;

import lombok.Data;

@Data
@Entity
@Transactional
public class Author extends IdedEntity{
	
	@Column(unique=true)
	private String name;
	
	@Lob
	@Column( length = 100000 )
	private String description;
	
	  @OneToMany
	  @JoinTable
	  (
	      name="authorVer",
	      joinColumns={ @JoinColumn(name="aid", referencedColumnName="id") },
	      inverseJoinColumns={ @JoinColumn(name="vid", referencedColumnName="id", unique=true) }
	  )
	// While Update this will also insert collection row another insert
	  private List<Version> version;
}
