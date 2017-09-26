package core.september.versiondown.data.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import lombok.Data;

@Data
@MappedSuperclass
public class IdedEntity {

	 @Id
	 @GeneratedValue(strategy=GenerationType.AUTO)
     protected Long id;
}
