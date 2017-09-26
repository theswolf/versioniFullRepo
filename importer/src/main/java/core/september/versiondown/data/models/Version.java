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
public class Version extends IdedEntity{

	//@Column(unique=true)
	private String titolo;
	
	@Lob
	@Column( length = 100000 )
	private String descrizione;
	
	@OneToMany
	  @JoinTable
	  (
	      name="verTrans",
	      joinColumns={ @JoinColumn(name="vid", referencedColumnName="id") },
	      inverseJoinColumns={ @JoinColumn(name="tid", referencedColumnName="id", unique=true) }
	  )
	// While Update this will also insert collection row another insert
	  private List<Translation> translations;
}
