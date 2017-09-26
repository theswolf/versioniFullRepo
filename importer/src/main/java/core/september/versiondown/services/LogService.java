package core.september.versiondown.services;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.springframework.stereotype.Service;

import core.september.versiondown.data.models.IdedEntity;
import lombok.extern.java.Log;

@Log
@Service
public class LogService {
	public void handleHerror(Throwable t) {
		log.warning(t.getMessage());
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		t.printStackTrace(pw);
		log.warning(sw.toString());
	}
	
	public void logEntity(IdedEntity entity) {
		log.warning(entity.toString());
	}
	
	
}
