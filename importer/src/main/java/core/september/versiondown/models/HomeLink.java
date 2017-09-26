package core.september.versiondown.models;

import lombok.Data;

@Data
public class HomeLink extends LinkModel{	
	private String author;
	private String desc;
	private String text;
	private HomeLink parent;

}
