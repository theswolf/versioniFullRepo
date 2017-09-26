package core.september.versiondown.data.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.transaction.Transactional;

import lombok.Data;

@Data
@Entity
@Transactional
public class Translation extends IdedEntity{

	private String titolo;
	
	@Lob
	@Column( length = 100000 )
	private String originale;
	
	@Lob
	@Column( length = 100000 )
	private String traduzione;
}
